import psycopg2
import bcrypt
from db import get_db_connection



def authenticate_user(username, password):
    conn = get_db_connection()
    try:
        
        with conn.cursor() as cursor:
            query = "SELECT password FROM users WHERE username = %s"
            cursor.execute(query, (username,))
            result = cursor.fetchone()
        
        if not result:
            return False
        
        password_hash = result[0]
        
        if bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
            return True
        else:
            return False
    except Exception as e:
        print(f"An error occurred during authentication: {e}")
        return False
    finally:
        conn.close()

def register_user(username, password):
    conn = get_db_connection()
    try:
        # Hash the password using bcrypt
        password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        #PASSWORD HAS TO BE DECODED AGAIN, ELSE IT IS ENCODED TWICE
        password_hash = password_hash.decode('utf-8')
        
        # Insert the new user into the database
        with conn.cursor() as cursor:
            query = "INSERT INTO users (username, password) VALUES (%s, %s)"
            cursor.execute(query, (username, password_hash))
        
        # Commit the transaction to save changes
        conn.commit()
        print(f"User '{username}' registered successfully.")
        
    except Exception as e:
        # Rollback in case of error
        conn.rollback()
        print(f"An error occurred while registering user '{username}': {e}")
    
    finally:
        # Close the connection
        conn.close()

