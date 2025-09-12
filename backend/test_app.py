from flask import Flask, jsonify

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "Backend is working!", "status": "success"})

if __name__ == "__main__":
    print("Starting test Flask app...")
    app.run(debug=True, host='0.0.0.0', port=5000)
