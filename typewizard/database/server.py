from flask import Flask, request, redirect, jsonify, session
from auth import register_user, authenticate_user  
from flask_cors import CORS
from db import get_db_connection
import psycopg2

app = Flask(__name__)
app.secret_key = 'snapeLover123'

CORS(app, resources={r"/register": {"origins": "http://localhost:3000"}, r"/login": {"origins": "http://localhost:3000"}})

@app.route('/register', methods=['POST'])
def register():
    #API_FETCHING_JSON
    data = request.get_json()
    username = data['username']
    password = data['password']

    #CALLING FUNCTIONS IN AUTH.PY
    try:
        register_user(username, password)
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


@app.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
    username = data['username']
    password = data['password']

    if authenticate_user(username, password):
        
        session['username'] = username
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(port=5000)