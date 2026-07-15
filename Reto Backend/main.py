from flask import Flask, jsonify, request
import json
import math

app = Flask(__name__)


@app.route('/')
def IndexError():
    return "<h1>Reto Backend</h1>"

# Función auxiliar: determina si un número es primo probando divisores
# desde 2 hasta n-1 (si alguno divide exacto, no es primo).
def es_primo(n):
    n = abs(n)
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True


# Ejercicio 1: leer un número de dos dígitos y sumar sus dígitos.
@app.route('/1', methods=['POST'])
def ejercicio1():
    data = request.get_json()
    numero = data.get('numero')
    decena = numero // 10   # dígito de las decenas
    unidad = numero % 10    # dígito de las unidades
    suma = decena + unidad
    return jsonify({'suma_digitos': suma})


# Ejercicio 2: leer un número de dos dígitos y determinar si es primo y si es negativo.
@app.route('/2', methods=['POST'])
def ejercicio2():
    data = request.get_json()
    numero = data.get('numero')
    primo = es_primo(numero)
    negativo = numero < 0
    return jsonify({'primo': primo, 'negativo': negativo})


# Ejercicio 3: leer un número de dos dígitos y determinar si ambos dígitos son primos.
@app.route('/3', methods=['POST'])
def ejercicio3():
    data = request.get_json()
    numero = data.get('numero')
    decena = numero // 10
    unidad = numero % 10
    return jsonify({'decena_primo': es_primo(decena), 'unidad_primo': es_primo(unidad)})


# Ejercicio 4: leer dos números de dos dígitos y determinar si su suma es par.
@app.route('/4', methods=['POST'])
def ejercicio4():
    data = request.get_json()
    numero1 = data.get('numero1')
    numero2 = data.get('numero2')
    suma = numero1 + numero2
    return jsonify({'suma': suma, 'es_par': suma % 2 == 0})


# Ejercicio 5: leer un número de tres dígitos y determinar en qué posición
# (centena, decena o unidad) está el dígito de mayor valor.
@app.route('/5', methods=['POST'])
def ejercicio5():
    data = request.get_json()
    numero = data.get('numero')
    centena = numero // 100
    decena = (numero // 10) % 10
    unidad = numero % 10
    mayor = max(centena, decena, unidad)
    if mayor == centena:
        posicion = 'centena'
    elif mayor == decena:
        posicion = 'decena'
    else:
        posicion = 'unidad'
    return jsonify({'posicion_mayor_digito': posicion})


# Ejercicio 6: leer un número de tres dígitos y determinar si algún dígito
# es múltiplo de otro (comparando cada par de dígitos entre sí).
@app.route('/6', methods=['POST'])
def ejercicio6():
    data = request.get_json()
    numero = data.get('numero')
    centena = numero // 100
    decena = (numero // 10) % 10
    unidad = numero % 10
    digitos = [centena, decena, unidad]
    algun_multiplo = False
    for a in digitos:
        for b in digitos:
            if a != b and b != 0 and a % b == 0:  # b != 0 evita división entre cero
                algun_multiplo = True
    return jsonify({'algun_digito_multiplo': algun_multiplo})


# Ejercicio 7: leer tres números y determinar el mayor usando solo dos
# variables ("mayor" y "actual"), reutilizándolas en vez de crear una por número.
@app.route('/7', methods=['POST'])
def ejercicio7():
    data = request.get_json()
    mayor = data.get('numero1')
    actual = data.get('numero2')
    if actual > mayor:
        mayor = actual
    actual = data.get('numero3')
    if actual > mayor:
        mayor = actual
    return jsonify({'mayor': mayor})


# Ejercicio 8: leer un número de cinco dígitos y determinar si es capicúa
# (se lee igual de izquierda a derecha que de derecha a izquierda).
@app.route('/8', methods=['POST'])
def ejercicio8():
    data = request.get_json()
    numero = data.get('numero')
    texto = str(numero)
    capicua = texto == texto[::-1]  # compara el texto con su reverso
    return jsonify({'capicua': capicua})


# Ejercicio 9: leer un número de cuatro dígitos y determinar si el segundo
# dígito es igual al penúltimo.
@app.route('/9', methods=['POST'])
def ejercicio9():
    data = request.get_json()
    numero = data.get('numero')
    texto = str(numero)
    segundo = texto[1]
    penultimo = texto[-2]
    return jsonify({'segundo_igual_penultimo': segundo == penultimo})


# Ejercicio 10: leer dos números y, si la diferencia entre ellos es menor
# o igual a 10, mostrar todos los enteros comprendidos entre el menor y el mayor.
@app.route('/10', methods=['POST'])
def ejercicio10():
    data = request.get_json()
    numero1 = data.get('numero1')
    numero2 = data.get('numero2')
    diferencia = abs(numero1 - numero2)
    if diferencia <= 10:
        menor = min(numero1, numero2)
        mayor = max(numero1, numero2)
        rango = list(range(menor, mayor + 1))
        return jsonify({'rango': rango})
    return jsonify({'mensaje': 'La diferencia es mayor a 10'})



if __name__ == '__main__':
    app.run(debug=True)


