from flask import Flask, jsonify, request
import os

app = Flask(__name__)

# CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Test route
@app.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Backend is working!", "status": "success"})

# Execution log route
@app.route("/execution_log", methods=["GET"])
def execution_log():
    return jsonify([
        "Backend started successfully",
        "CORS headers configured",
        "Ready to receive requests"
    ])

# Pending quizzes route
@app.route("/pending_quizzes", methods=["GET"])
def pending_quizzes():
    return jsonify({})

# Published quizzes route
@app.route("/published_quizzes", methods=["GET"])
def published_quizzes():
    return jsonify({})

# Upload PPT route (simplified)
@app.route("/upload_ppt", methods=["POST"])
def upload_ppt():
    try:
        if 'ppt' not in request.files:
            return jsonify({"error": "No file uploaded"}), 400
        
        file = request.files["ppt"]
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Create uploads directory
        os.makedirs("uploads", exist_ok=True)
        
        # Save file
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)
        
        # Return mock response
        return jsonify({
            "quiz_id": file.filename,
            "summary": "Mock summary for testing",
            "quiz": [
                {
                    "question": "What is the main topic of this presentation?",
                    "type": "short_answer",
                    "marks": 2,
                    "options": []
                },
                {
                    "question": "Which of the following is correct?",
                    "type": "mcq",
                    "marks": 1,
                    "options": ["Option A", "Option B", "Option C", "Option D"]
                }
            ]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Publish quiz route
@app.route("/publish_quiz", methods=["POST"])
def publish_quiz():
    data = request.json
    return jsonify({
        "quiz_id": data.get("quiz_id", "unknown"),
        "message": "Quiz published successfully!"
    })

# Schedule class route
@app.route("/schedule_class", methods=["POST"])
def schedule_class():
    data = request.json
    return jsonify({
        "slot": 14,
        "meeting_link": "https://meet.google.com/test-link"
    })

if __name__ == "__main__":
    print("Starting simple Flask server on port 5001...")
    app.run(debug=True, host='0.0.0.0', port=5001)
