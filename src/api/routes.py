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
                data = response.json()
                print(data["data"]["abbreviation"])
                row = Teams(conference=data["data"]["conference"],
                                division=data["data"]["division"],
                                city=data["data"]["city"],
                                name=data["data"]["name"],
                                full_name=data["data"]["full_name"],
                                abbreviation=data["data"]["abbreviation"])
                db.session.add(row)
                db.session.commit()
        # Cuando termina el ciclo, vuelvo a hacer el select
        row = Teams(conference='TOTAL',
                                division='TOTAL',
                                city='TOTAL',
                                name='TOTAL',
                                full_name='TOTAL',
                                abbreviation='TOT')
        db.session.add(row)
        db.session.commit()
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
                    # team_id=player["team"]
                    # El campo birth_date ya no se incluye
                )

                db.session.add(row)

            # Realiza el commit después de agregar todos los jugadores
            db.session.commit()

            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Players)).scalars()
            result = [row.serialize() for row in rows]
        else:
            print(f"Error al obtener datos de la API: {response.status_code}")

    # Muestro todos los registros que tengo en la base
    response_body['results'] = result
    return response_body, 200

# @api.route('/seasons', methods=['GET'])
# def seasons():
#     response_body = {}
#     url=f'http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/2024/'
#     response = requests.get(url)
#     if response.status_code == 200:
#         data = response.json()
#         row = Characters(id=data["id"],
#                          season=data["result"]["properties"]["name"])
#         db.session.add(row)
#         db.session.commit()
#         response_body['results'] = data
#     return response_body, 200


@api.route('/stats', methods=['GET'])
def stats():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Stats)).scalars()
    result = [row.serialize() for row in rows]
    print("PRIMERO")
    # Pregunto si no traje nada, en ese caso voy a la API y traigo todo.
    if not result:
        print(f"Error al obtener datos de la API: {response.status_code}")
        response_body['message'] = f"Error al obtener datos de la API: {response.status_code}"

    # Muestro todos los registros que tengo en la base
    response_body['results'] = result
    return response_body, 200


@api.route('/loaddata', methods=['GET'])
def loaddata():
    response_body = {}
    current_season = '2024'
    response = requests.get(f'http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/{current_season}/')
    if response.status_code == 200:
            season = Seasons(year=current_season)
            db.session.add(season)
            data = response.json()
            for player in data:
                print(player['team'])
                team_abr = player['team'] if player['team'] != 'PHO' else 'PHX'
                team = db.session.execute(db.select(Teams).where(Teams.abbreviation == team_abr)).scalar()
                if not team:
                    response_body['message'] = 'Error no se encontro el team'
                    return response_body, 404
                player_name = player["playerName"]
                print(f"Consultando datos para el jugador: {player_name}")
                row = Players(playerName=player["playerName"],
                                 position=player["position"],
                                 team_id=team.id)
                                 # El campo birth_date ya no se incluye
                db.session.add(row)
                db.session.commit()
                # Aquí eliminamos el manejo de birth_date
                stat = Stats(games=player["games"],
                            assists=player["assists"],
                            points=player["points"],
                            games_started=player["gamesStarted"],
                            minutes_pg=player["minutesPg"],
                            field_goals=player["fieldGoals"],
                            field_attempts=player["fieldAttempts"],
                            field_percent=player["fieldPercent"],
                            three_fg=player["threeFg"],
                            three_attempts=player["threeAttempts"],
                            three_percent=player["threePercent"],
                            two_fg=player["twoFg"],
                            two_attempts=player["twoAttempts"],
                            two_percent=player["twoPercent"],
                            effect_fg_percent=player["effectFgPercent"],
                            ft=player["ft"],
                            ft_attempts=player["ftAttempts"],
                            ft_percent=player["ftPercent"],
                            offensive_rb=player["offensiveRb"],
                            defensive_rb=player["defensiveRb"],
                            total_rb=player["totalRb"],
                            steals=player["steals"],
                            blocks=player["blocks"],
                            turnovers=player["turnovers"],
                            personal_fouls=player["personalFouls"],
                            player_id=row.id,
                            season_id=season.id,
                            team_id=team.id)
                db.session.add(stat)
            # Realiza el commit después de agregar todos los jugadores
            db.session.commit()
            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Stats)).scalars()
            result = [row.serialize() for row in rows]
            response_body['results'] = result
            return response_body, 200


# PLAYER STATS API http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/2024
# TEAMS API https://api.balldontlie.io/v1/teams?Authorization=d51f0c54-d27d-4844-a944-92f1e747c09d