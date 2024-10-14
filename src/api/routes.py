"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from urllib.parse import quote
from api.models import db, Users, Teams, Players, Stats, Seasons
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"]= "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/teams', methods=['GET'])
def teams():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Teams)).scalars()
    result = [row.serialize() for row in rows]
    print(len(result))
    # Pregunto si no traje nada, en ese caso voy a api de SWAPI y traigo todo.
    if not result:
        api_key = os.getenv("API_KEY_BALLDONTLIE")
        for id in range(1, 52):
            url = f"https://api.balldontlie.io/v1/teams/{id}?Authorization={api_key}"
            payload = {}
            headers = {'Authorization': api_key}
            response = requests.request("GET", url, headers=headers, data=payload)
            if response.status_code == 200:
                print('*********')
                data = response.json()
                row = Teams(id=data["data"]["id"],
                                conference=data["data"]["conference"],
                                division=data["data"]["division"],
                                city=data["data"]["city"],
                                name=data["data"]["name"],
                                full_name=data["data"]["full_name"],
                                abbreviation=data["data"]["abbreviation"])
                db.session.add(row)
                db.session.commit()
        # Cuando termina el ciclo, vuelvo a hacer el select
        rows = db.session.execute(db.select(Teams)).scalars()
    # Muestro todos los registros que tengo en la base
    result = [row.serialize() for row in rows]
    response_body['results'] = result
    return response_body, 200


@api.route('/players', methods=['GET'])
def players():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Players)).scalars()
    result = [row.serialize() for row in rows]
    print("PRIMERO")
    # Pregunto si no traje nada, en ese caso voy a la API y traigo todo.
    if not result:
        print("SEGUNDO")
        response = requests.get('http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/2024/')
        
        if response.status_code == 200:
            data = response.json()
            for player in data:
                player_name = player["playerName"]
                print(f"Consultando datos para el jugador: {player_name}")

                # Aquí eliminamos el manejo de birth_date
                row = Players(
                    id=player["id"],
                    playerName=player["playerName"],
                    position=player["position"],
                    team_id=player["team"]
                    # El campo birth_date ya no se incluye
                )

                db.session.add(row)

            # Realiza el commit después de agregar todos los jugadores
            db.session.commit()

            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Players)).scalars()
        else:
            print(f"Error al obtener datos de la API: {response.status_code}")

    # Muestro todos los registros que tengo en la base
    result = [row.serialize() for row in rows]
    response_body['results'] = result
    return response_body, 200

# PLAYER STATS API http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/2024
# TEAMS API https://api.balldontlie.io/v1/teams?Authorization=d51f0c54-d27d-4844-a944-92f1e747c09d