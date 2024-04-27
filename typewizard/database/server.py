from flask import Flask, request, redirect, jsonify, session
from auth import register_user, authenticate_user
from utils import get_avgWPM, check_if_username_exists_in_db, get_user_info
from flask_cors import CORS
from db import get_db_connection
import psycopg2

app = Flask(__name__)
app.secret_key = 'snapeLover123'

CORS(app)

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



@app.route('/get_avgWPM', methods=['GET', 'OPTIONS'])
def get_avgWPM_route():
    # Handle the OPTIONS request
    if request.method == 'OPTIONS':
        # Handle preflight request properly by returning headers
        response = app.response_class(
            status=204,
            headers={
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        )
        return response
    
    # Extract the username from the query parameters
    username = request.args.get('username')

    # Check if the username was provided
    if username is None:
        return jsonify({'status': 'error', 'message': 'Username not provided'}), 400

    # Check if the user is authenticated
    if check_if_username_exists_in_db(username):
        # Retrieve the average WPM of the user using the function from utils
        avg_wpm = get_avgWPM(username)

        # Return the average WPM as a JSON response
        return jsonify({'avg_wpm': avg_wpm}), 200
    else:
        # If the user is not authenticated, return an error message
        return jsonify({'status': 'error', 'message': 'User not authenticated'}), 401

@app.route('/get_user_info', methods=['GET', 'OPTIONS'])
def get_user_info_route():
    # Handle the OPTIONS request
    if request.method == 'OPTIONS':
        # Handle preflight request properly by returning headers
        response = app.response_class(
            status=204,
            headers={
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization"
            }
        )
        return response

    # Extract the username from the query parameters
    username = request.args.get('username')

    # Check if the username was provided
    if username is None:
        return jsonify({'status': 'error', 'message': 'Username not provided'}), 400

    # Check if the user exists in the database
    if check_if_username_exists_in_db(username):
        # Retrieve the user info using the function from utils
        user_info = get_user_info(username)

        # Check if user info was successfully retrieved
        if user_info is None:
            return jsonify({'status': 'error', 'message': 'Failed to retrieve user info'}), 500

        # Return the user information as a JSON response
        return jsonify(user_info), 200
    else:
        # If the user does not exist, return an error message
        return jsonify({'status': 'error', 'message': 'User not found'}), 404

if __name__ == '__main__':
    app.run(port=5000)

