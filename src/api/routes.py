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
    # if not result:
    api_key = os.getenv("API_KEY_BALLDONTLIE")
    for id in range(1, 31):
        url = f"https://api.balldontlie.io/v1/teams/{id}?Authorization={api_key}"
        payload = {}
        headers = {'Authorization': api_key}
        response = requests.request("GET", url, headers=headers, data=payload)
        if response.status_code == 200:
            data = response.json()
            print(data["data"]["abbreviation"])
            team = db.session.execute(db.select(Teams).where(Teams.abbreviation == data["data"]["abbreviation"])).scalar()
            if team:
                continue
            row = Teams(conference=data["data"]["conference"],
                            division=data["data"]["division"],
                            city=data["data"]["city"],
                            name=data["data"]["name"],
                            full_name=data["data"]["full_name"],
                            abbreviation=data["data"]["abbreviation"])
            db.session.add(row)
            db.session.commit()
    # Cuando termina el ciclo, vuelvo a hacer el select
    team = db.session.execute(db.select(Teams).where(Teams.abbreviation == 'TOT')).scalar()
    if not team:
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
    print(len(result))
    return response_body, 200


@api.route('/players', methods=['GET'])
def players():
    response_body = {}
    # Traer todos los registros de mi base de datos
    rows = db.session.execute(db.select(Players)).scalars()
    result = [row.serialize() for row in rows]
    print("PRIMERO")
    # Pregunto si no traje nada, en ese caso voy a la API y traigo todo.
    # if not result:
    print("SEGUNDO")
    response = requests.get('http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/2024/')
    if response.status_code == 200:
        data = response.json()
        for player in data:
            player_name = player["playerName"]
            row = db.session.execute(db.select(Players).where(Players.api_player_id == player["playerId"])).scalar()
            if row:
                continue
            print(f"Consultando datos para el jugador: {player_name}")
            # Aquí eliminamos el manejo de birth_date
            row = Players(api_player_id=player["playerId"],
                          playerName=player["playerName"])
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
                if player['team'] == 'PHO':
                    team_abr = 'PHX'
                elif player['team'] == 'CHO':
                    team_abr = 'CHA'
                elif player['team'] == 'BRK':
                    team_abr = 'BKN'
                else:
                    team_abr = player['team']
                team = db.session.execute(db.select(Teams).where(Teams.abbreviation == team_abr)).scalar()
                if not team:
                    pass
                    # response_body['message'] = 'Error no se encontro el team'
                    # return response_body, 404
                # player_name = player["playerName"]
                # rows = db.session.execute(db.select(Stats)).scalars()
                # result = [row.serialize() for row in rows]
                # print(f"Consultando datos para el jugador: {player_name}")
                # # Aquí eliminamos el manejo de birth_date
                # row = Players(api_player_id=player["playerId"],
                #               playerName=player["playerName"])
                # db.session.add(row)
                # db.session.commit()
                print(player["playerId"])
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
                             player_id=player["playerId"],
                             season_id=season.id,
                             team_id=team.abbreviation)
                db.session.add(stat)
                db.session.commit()
            # Realiza el commit después de agregar todos los jugadores
            
            # Cuando termina el ciclo, vuelvo a hacer el select
            rows = db.session.execute(db.select(Stats)).scalars()
            result = [row.serialize() for row in rows]
            response_body['results'] = result
            return response_body, 200

@api.route('/top-players-points', methods=['GET'])
def get_top_players():
    players = (
        db.session.query(Stats, Players)
        .join(Players, Stats.player_id == Players.api_player_id)
        .filter(Stats.team_id == 'TOT')
        .order_by(db.cast(Stats.points, db.Integer).desc())  # Convertir points a Integer
        .limit(5)
        .all()
    )

    response_data = [{
        'id': stat.id,
        'player_to': player.playerName,
        'team_id': stat.team_id,
        'points': stat.points
    } for stat, player in players]

    return jsonify(response_data)


@api.route('/top-players-assists', methods=['GET'])
def get_top_assists():
    players = (
        db.session.query(Stats, Players)
        .join(Players, Stats.player_id == Players.api_player_id)
        .filter(Stats.team_id == 'TOT')
        .order_by(db.cast(Stats.assists, db.Integer).desc())  # Convertir points a Integer
        .limit(5)
        .all()
    )

    response_data = [{
        'id': stat.id,
        'player_to': player.playerName,
        'team_id': stat.team_id,
        'assists': stat.assists
    } for stat, player in players]

    return jsonify(response_data)


@api.route('/top-players-games', methods=['GET'])
def get_top_games():
    players = (
        db.session.query(Stats, Players)
        .join(Players, Stats.player_id == Players.api_player_id)
        .filter(Stats.team_id == 'TOT')
        .order_by(db.cast(Stats.games, db.Integer).desc())  # Convertir points a Integer
        .limit(5)
        .all()
    )

    response_data = [{
        'id': stat.id,
        'player_to': player.playerName,
        'team_id': stat.team_id,
        'games': stat.games
    } for stat, player in players]

    return jsonify(response_data)


@api.route('/top-players-blocks', methods=['GET'])
def get_top_blocks():
    players = (
        db.session.query(Stats, Players)
        .join(Players, Stats.player_id == Players.api_player_id)
        .filter(Stats.team_id == 'TOT')
        .order_by(db.cast(Stats.blocks, db.Integer).desc())  # Convertir points a Integer
        .limit(5)
        .all()
    )

    response_data = [{
        'id': stat.id,
        'player_to': player.playerName,
        'team_id': stat.team_id,
        'blocks': stat.blocks
    } for stat, player in players]

    return jsonify(response_data)


@api.route('/top-players-turnovers', methods=['GET'])
def get_top_turnovers():
    players = (
        db.session.query(Stats, Players)
        .join(Players, Stats.player_id == Players.api_player_id)
        .filter(Stats.team_id == 'TOT')
        .order_by(db.cast(Stats.turnovers, db.Integer).desc())  # Convertir points a Integer
        .limit(5)
        .all()
    )

    response_data = [{
        'id': stat.id,
        'player_to': player.playerName,
        'team_id': stat.team_id,
        'turnovers': stat.turnovers
    } for stat, player in players]

    return jsonify(response_data)


@api.route('/top-players-steals', methods=['GET'])
def get_top_steals():
    players = (
        db.session.query(Stats, Players)
        .join(Players, Stats.player_id == Players.api_player_id)
        .filter(Stats.team_id == 'TOT')
        .order_by(db.cast(Stats.steals, db.Integer).desc())  # Convertir points a Integer
        .limit(5)
        .all()
    )

    response_data = [{
        'id': stat.id,
        'player_to': player.playerName,
        'team_id': stat.team_id,
        'steals': stat.steals
    } for stat, player in players]

    return jsonify(response_data)


@api.route('/teams_list', methods=['GET'])
def get_teams():
    teams = Teams.query.all()  # Obtenemos todos los equipos de la base de datos
    teams_list = [team.serialize() for team in teams]  # Serializamos cada equipo en una lista
    return jsonify(teams_list)  # Devolvemos la lista en formato JSON

if __name__ == '__main__':
    api.run(debug=True)

@api.route('/player_list', methods=['GET'])
def get_players():
    players = Players.query.all()  # Obtenemos todos los equipos de la base de datos
    players_list = [player.serialize() for player in players]  # Serializamos cada equipo en una lista
    return jsonify(players_list)  # Devolvemos la lista en formato JSON

if __name__ == '__main__':
    api.run(debug=True)


@api.route('/teams/<string:id>', methods=['GET'], endpoint='get_team_players')
def get_team_players(id):
    try:
        # Obtener todas las estadísticas asociadas al team_id
        stats = Stats.query.filter_by(team_id=id).all()

        # Extraer los jugadores únicos a partir de las relaciones en Stats
        players = {stat.player_to.api_player_id: stat.player_to for stat in stats}.values()

        # Serializar la lista de jugadores
        response = [player.serialize() for player in players]
        
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route('/players/<string:id>', methods=['GET'])
def get_player_stats(id):
    try:
        # Obtener el jugador con el id proporcionado
        player = Players.query.filter_by(api_player_id=id).first()
        if not player:
            return jsonify({"error": f"Player with ID {id} not found"}), 404

        # Obtener todas las estadísticas del jugador
        stats_list = Stats.query.filter_by(player_id=id).all()
        
        # Verificar si se encontraron estadísticas
        if not stats_list:
            return jsonify({"error": f"No stats found for player with ID {id}"}), 404
        
        # Formato de los datos de las estadísticas del jugador
        stats_data = []
        for stats in stats_list:
            stats_data.append({
                "id": stats.id,
                "games": stats.games,
                "assists": stats.assists,
                "points": stats.points,
                "games_started": stats.games_started,
                "minutes_pg": stats.minutes_pg,
                "field_goals": stats.field_goals,
                "field_attempts": stats.field_attempts,
                "field_percent": stats.field_percent,
                "three_fg": stats.three_fg,
                "three_attempts": stats.three_attempts,
                "three_percent": stats.three_percent,
                "two_fg": stats.two_fg,
                "two_attempts": stats.two_attempts,
                "two_percent": stats.two_percent,
                "effect_fg_percent": stats.effect_fg_percent,
                "ft": stats.ft,
                "ft_attempts": stats.ft_attempts,
                "ft_percent": stats.ft_percent,
                "offensive_rb": stats.offensive_rb,
                "defensive_rb": stats.defensive_rb,
                "total_rb": stats.total_rb,
                "steals": stats.steals,
                "blocks": stats.blocks,
                "turnovers": stats.turnovers,
                "personal_fouls": stats.personal_fouls,
                "team_id": stats.team_id,
                "player_id": stats.player_id,
                "season_id": stats.season_id
            })

        # Incluir el nombre del jugador en la respuesta
        response = {
            "playerName": player.playerName,
            "stats": stats_data
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
if __name__ == '__main__':
    app.run(debug=True)
#     
# PLAYER STATS API http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataTotals/season/2024
# TEAMS API https://api.balldontlie.io/v1/teams?Authorization=d51f0c54-d27d-4844-a944-92f1e747c09d