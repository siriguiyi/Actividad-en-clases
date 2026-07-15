# Libreria en carpeta virtual: python -m venv venv 
# Activar la carpeta virtual: .\venv\Scripts\Activate.ps1
import os
import json
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
from datetime import datetime, timedelta
from functools import wraps
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

# Carga variables de entorno desde el archivo .env
load_dotenv()

# Inicializa la aplicación Flask
app = Flask(__name__)

# Habilita CORS para permitir peticiones desde el frontend en localhost:3000
CORS(app, origins=["http://localhost:3000"])

# Clave secreta usada para firmar y verificar tokens JWT
secret_key = "secret"

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

# Ruta raíz que lista todos los usuarios registrados en la tabla 'usuarios'
@app.route('/')
def index():
    response = supabase.table('usuarios').select("*").execute()
    todos = response.data

    # Construye una respuesta HTML sencilla con los nombres de los usuarios
    html = '<h1>usuarios</h1><ul>'
    for todo in todos:
        html += f'<li>{todo["nombre"]} {todo["apellido"]}</li>'
    html += '</ul>'
    return html


@app.route("/lusuarios", methods=["GET"])
def listar_usuarios():
    try:
        response = (
            supabase
            .table("usuarios")
            .select("id,nombre,apellido,correo,telefono,edad")
            .execute()
        )
        return jsonify(response.data), 200
    except Exception as e:
        return jsonify({
            "message": "Error retrieving users",
            "error": str(e)
        }), 500


# Ruta para crear un nuevo usuario en la tabla 'usuarios'
@app.route('/usuarios', methods=['POST'])
def crear_usuario():

    datos = request.json
    response = (
        supabase
        .table("usuarios")
        .insert({
            "nombre": datos["nombre"],
            "apellido": datos["apellido"],
            "correo": datos["correo"],
            "clave": datos["clave"],
            "telefono": datos["telefono"],
            "edad": datos["edad"]
        })
        .execute()
    )

    # Devuelve el usuario creado y el código HTTP 201 Created
    return jsonify(response.data), 201


# Ruta de login que valida las credenciales y genera un token JWT
@app.route('/login', methods=['POST'])
def login():
    try:
        correo = request.json.get('correo')
        clave = request.json.get('clave')
        if correo is None or clave is None:
            return jsonify({'message': 'Both username and password are required'}), 400
        
        response=(
            supabase.table("usuarios") 
            .select("*") 
            .eq("correo", correo) 
            .eq("clave", clave) 
            .limit(1)
            .execute()
        )

        # Si el usuario existe, genera un token JWT con el correo
        if response.data and len(response.data) > 0:
            usuario = response.data[0]
            token = jwt.encode({'correo': correo}, secret_key, algorithm='HS256')
            return jsonify({'token': token}), 200
        else:
            return jsonify({'message': 'Authentication failed'}), 401

    except Exception as e:
        print(f"Error in login: {e}")
        return jsonify({'message': 'Internal server error'}), 500


# Decorador para verificar el token JWT en endpoints protegidos
def verify_token(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', '')
        if not token:
            return jsonify({'message': 'Token not provided'}), 401
        token_parts = token.split(" ")
        if len(token_parts) != 2 or token_parts[0].lower() != 'bearer':
            return jsonify({'message': 'Invalid token format'}), 401
        token = token_parts[1]
        try:
            # Decodifica el JWT usando la clave secreta
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            request.correo = payload['correo']
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 403

    return wrapper


# Ruta protegida que solo permite acceso si el token JWT es válido
@app.route('/protected', methods=['GET'])
@verify_token
def protected():
    return jsonify({'message': 'You have access'}), 200



if __name__ == '__main__':
    app.run(debug=True)