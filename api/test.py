from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        response = {
            "message": "Vercel API is working!",
            "status": "success",
            "note": "This is a test endpoint. For full functionality, deploy the Flask backend separately."
        }
        
        self.wfile.write(json.dumps(response).encode())
        return
