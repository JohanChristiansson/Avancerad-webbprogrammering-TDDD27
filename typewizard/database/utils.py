import psycopg2
import bcrypt
from db import get_db_connection

def get_avgWPM(username):
    conn = get_db_connection()
    try:
        # Query the average WPM of the user from the users table
        with conn.cursor() as cursor:
            query = "SELECT avg_wpm FROM users WHERE username = %s"
            cursor.execute(query, (username,))
            result = cursor.fetchone()
        
        # Check if a result was found
        if not result:
            return 0  # Return 0 if the user does not exist or has no average WPM recorded
        
        # Return the average WPM of the user
        avg_wpm = result[0]
        return avg_wpm
    
    except Exception as e:
        print(f"An error occurred while fetching the average WPM for user '{username}': {e}")
        return 0
    
    finally:
        # Close the connection
        conn.close()
        
def check_if_username_exists_in_db(username):
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            query = "SELECT COUNT(*) FROM users WHERE username = %s"
            cursor.execute(query, (username,))
            count = cursor.fetchone()[0]
        return count > 0
    finally:
        conn.close()

def get_user_info(username):
    conn = get_db_connection()
    try:
        # Query all columns of the user from the users table
        with conn.cursor() as cursor:
            query = "SELECT * FROM users WHERE username = %s"
            cursor.execute(query, (username,))
            result = cursor.fetchone()
        
        # Check if a result was found
        if not result:
            return None  # Return None if the user does not exist
        
        # Convert the result to a dictionary or a named tuple for easy access
        columns = [desc[0] for desc in cursor.description]
        user_info = dict(zip(columns, result))
        
        # Return the user information as a dictionary
        return user_info
    
    except Exception as e:
        print(f"An error occurred while fetching user info for user '{username}': {e}")
        return None
    
    finally:
        # Close the connection
        conn.close()