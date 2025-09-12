import json
import os

from flask import Flask, jsonify, request
from google.generativeai import Client
from pptx import Presentation

# -------------------- CONFIG --------------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY"

client = Client(api_key=GOOGLE_API_KEY)

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -------------------- IN-MEMORY STORAGE --------------------
execution_log = []
timetable = []
pending_quizzes = {}  # quiz_id -> quiz questions waiting for teacher edit
published_quizzes = {}  # quiz_id -> final published quiz


# -------------------- UTILITIES --------------------
def log_action(action):
    execution_log.append(action)


def ppt_to_text(file_path):
    prs = Presentation(file_path)
    text = []
    for slide in prs.slides:
        for shape in slide.shapes:
            if hasattr(shape, "text"):
                text.append(shape.text)
    return "\n".join(text)


def summarize_text(text):
    prompt = f"Summarize the following lecture into 5-7 bullet points:\n{text}"
    response = client.chat(prompt=prompt)
    return response.text


def generate_quiz(summary_text, n_questions, marks_per_question):
    prompt = f"""
    Create a quiz from this lecture summary:
    {summary_text}

    Number of questions: {n_questions}
    Marks per question: {marks_per_question}

    Return JSON with keys: question, type (short_answer/mcq), marks, options (if MCQ)
    """
    response = client.chat(prompt=prompt)
    try:
        quiz = json.loads(response.text)
    except:
        quiz = [
            {
                "question": "Sample question",
                "type": "short_answer",
                "marks": marks_per_question,
            }
        ]
    return quiz


# -------------------- ROUTES --------------------
@app.route("/upload_ppt", methods=["POST"])
def upload_ppt():
    file = request.files["ppt"]
    n_questions = int(request.form.get("n_questions", 5))
    marks = int(request.form.get("marks", 1))

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    text = ppt_to_text(file_path)
    summary = summarize_text(text)
    quiz = generate_quiz(summary, n_questions, marks)

    # Save quiz in pending_quizzes for teacher edit
    quiz_id = file.filename  # simple unique id
    pending_quizzes[quiz_id] = quiz

    log_action(f"Generated quiz for {file.filename} (pending teacher review)")
    return jsonify({"quiz_id": quiz_id, "summary": summary, "quiz": quiz})


@app.route("/edit_quiz", methods=["POST"])
def edit_quiz():
    """
    Expects JSON:
    {
        "quiz_id": "filename.pptx",
        "edits": [
            {"index": 0, "new_question": "Updated question text"},
            {"index": 2, "new_question": "Another updated question"}
        ]
    }
    """
    data = request.json
    quiz_id = data["quiz_id"]
    edits = data.get("edits", [])

    if quiz_id not in pending_quizzes:
        return jsonify({"error": "Quiz not found"}), 404

    quiz = pending_quizzes[quiz_id]
    for edit in edits:
        idx = edit["index"]
        new_q = edit["new_question"]
        if 0 <= idx < len(quiz):
            quiz[idx]["question"] = new_q

    # Save edited quiz
    pending_quizzes[quiz_id] = quiz
    log_action(f"Teacher edited quiz {quiz_id}")
    return jsonify({"quiz_id": quiz_id, "quiz": quiz})


@app.route("/publish_quiz", methods=["POST"])
def publish_quiz():
    """
    Expects JSON:
    {
        "quiz_id": "filename.pptx"
    }
    """
    data = request.json
    quiz_id = data["quiz_id"]

    if quiz_id not in pending_quizzes:
        return jsonify({"error": "Quiz not found"}), 404

    published_quizzes[quiz_id] = pending_quizzes.pop(quiz_id)
    log_action(f"Published quiz {quiz_id}")
    return jsonify(
        {"quiz_id": quiz_id, "message": f"Quiz {quiz_id} published successfully!"}
    )


@app.route("/schedule_class", methods=["POST"])
def schedule_class():
    data = request.json
    year = data["year"]
    branch = data["branch"]
    section = data["section"]
    day = data.get("day")
    mode = data.get("mode", "offline")

    hour = find_free_slot(year, branch, section, day)
    if hour is None:
        return jsonify({"error": "No free slot available"}), 400

    entry = {
        "year": year,
        "branch": branch,
        "section": section,
        "hour": hour,
        "mode": mode,
    }
    timetable.append(entry)

    meeting_link = ""
    if mode.lower() == "online":
        meeting_link = create_fake_meeting_link()
        entry["meeting_link"] = meeting_link

    log_action(f"Scheduled class for {year}-{branch}-{section} at {hour}:00 ({mode})")
    return jsonify({"slot": hour, "meeting_link": meeting_link})


@app.route("/execution_log", methods=["GET"])
def get_log():
    return jsonify(execution_log)


@app.route("/timetable", methods=["GET"])
def get_timetable():
    return jsonify(timetable)


@app.route("/pending_quizzes", methods=["GET"])
def get_pending_quizzes():
    return jsonify(pending_quizzes)


@app.route("/published_quizzes", methods=["GET"])
def get_published_quizzes():
    return jsonify(published_quizzes)


# -------------------- SLOT UTILITIES --------------------
def find_free_slot(year, branch, section, day=None):
    for hour in range(9, 18):
        slot_taken = any(
            c["year"] == year
            and c["branch"] == branch
            and c["section"] == section
            and c["hour"] == hour
            for c in timetable
        )
        if not slot_taken:
            return hour
    return None


def create_fake_meeting_link():
    return "https://meet.google.com/link-demo"


# -------------------- RUN --------------------
if __name__ == "__main__":
    app.run(debug=True)
