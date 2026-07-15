from flask import Flask, jsonify, request
import json
import jwt

app = Flask(__name__)
secret_key = "secret"

@app.route('/')
def IndexError():
    return "<h1>Bienvenido a la API de prueba</h1>"

@app.route('/suma')
def suma():
    r=9+9    
    return r.__str__()

@app.route('/resta', methods=['POST'])
def resta():
    data = request.get_json()
    num1=data.get('num1')
    num2=data.get('num2')
    result=num1-num2
    return jsonify({'result': result})


#{
#   "num1": 9,
#   "num2": 9
#}
@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json.get('username')
        password = request.json.get('password')
        if username is None or password is None:
            return jsonify({'message': 'Both username and password are required'}), 400
        if username == "admin" and password == "123":
            token = jwt.encode({'username': username}, secret_key, algorithm='HS256')
            return jsonify({'token': token}), 200
       
        return jsonify({'message': 'Authentication failed'}), 401
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

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
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            request.username = payload['username']
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 403
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 403
    return wrapper

@app.route('/protected', methods=['GET'])
@verify_token
def protected():
    return jsonify({'message': 'You have access'}), 200



@app.route('/area', methods=['POST'])
def area():
    data = request.get_json()
    base = data.get('base')
    altura = data.get('altura')
    area = (base * altura)/2
    return area.__str__()

@app.route('/areacirculo', methods=['POST'])
def areacirculo():
    data = request.get_json()
    radio = data.get('radio')
    area = 3.1416 * radio**2
    return area.__str__()


@app.route('/densidad', methods=['POST'])
def densidad():
    data = request.get_json()
    masa = data.get('masa')
    volumen = data.get('volumen')
    densidad = masa / volumen 
    return jsonify({'densidad': densidad})



if __name__ == '__main__':
    app.run(debug=True)


