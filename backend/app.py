#libreria en carpeta virtual: python -m venv venv 
#activar la carpeta virtual: .\venv\Scripts\Activate.ps1
import os
import json
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)

@app.route('/')
def index():
    response = supabase.table('usuarios').select("*").execute()
    todos = response.data

    html = '<h1>usuarios</h1><ul>'
    for todo in todos:
        html += f'<li>{todo["nombre"]}</li>'
    html += '</ul>'

    return html
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
    return jsonify(response.data), 201

if __name__ == '__main__':
    app.run(debug=True)