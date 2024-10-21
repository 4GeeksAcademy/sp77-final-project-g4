from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    premium = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User (id:{self.id}) - {self.username}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'premium': self.premium}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('posts_to', lazy='select'))

    def __repr__(self):
        return f'<Post: {self.title} - User: {self.username}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'body': self.body,
                'date': self.date}


class Teams(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conference = db.Column(db.String, unique=False, nullable=True)
    division = db.Column(db.String, unique=False, nullable=True)
    city = db.Column(db.String, unique=False, nullable=True)
    name = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, unique=True, nullable=True)
    abbreviation = db.Column(db.String, unique=True, nullable=False)

    def __repr__(self):
        return f'<Team: {self.abbreviation} - {self.name} >'

    def serialize(self):
        return {'id': self.id,
                'conference': self.conference,
                'division': self.division,
                'city': self.city,
                'name': self.name,
                "full_name": self.full_name,
                'abbreviation': self.abbreviation}


class Players(db.Model):
    __tablename__ = 'players'
    id = db.Column(db.Integer, primary_key=True)
    api_player_id = db.Column(db.String, unique=True, nullable=False)
    playerName = db.Column(db.String, unique=False, nullable=False)

    def __repr__(self):
        return f'<Player: {self.playerName} >'

    def serialize(self):
        return {'id': self.id,
                'api_player_id': self.api_player_id,
                'playerName': self.playerName}


class Seasons(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.String, unique=True, nullable=False)


class FavoritePlayers(db.Model):
    __tablename__ = 'favorite_players'
    id = db.Column(db.Integer, primary_key=True)
    favourite_player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    favourite_player_to = db.relationship('Players', foreign_keys=[favourite_player_id], backref=db.backref('user_fans_to', lazy='select'))
    # favourite_team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    # favourite_team_to = db.relationship('Teams', foreign_keys=[favourite_team_id], backref=db.backref('favourite_team_to', lazy='select'))
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # user_to = db.relationship('Users', foreign_keys=[favourite_team_id], backref=db.backref('Favourite_teams_to', lazy='select'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('favourite_players_to', lazy='select'))

    def __repr__(self):
        return f'Siguiendo a: {self.favourite_player_id} - {self.favourite_team_id}'


class Stats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    games = db.Column(db.String, unique=False, nullable=True)
    assists = db.Column(db.String, unique=False, nullable=True)
    points = db.Column(db.String, unique=False, nullable=True)
    games_started = db.Column(db.String, unique=False, nullable=True)
    minutes_pg = db.Column(db.String, unique=False, nullable=True)
    field_goals = db.Column(db.String, unique=False, nullable=True)
    field_attempts = db.Column(db.String, unique=False, nullable=True)
    field_percent = db.Column(db.String, unique=False, nullable=True)
    three_fg = db.Column(db.String, unique=False, nullable=True)
    three_attempts = db.Column(db.String, unique=False, nullable=True)
    three_percent = db.Column(db.String, unique=False, nullable=True)
    two_fg = db.Column(db.String, unique=False, nullable=True)
    two_attempts = db.Column(db.String, unique=False, nullable=True)
    two_percent = db.Column(db.String, unique=False, nullable=True)
    effect_fg_percent = db.Column(db.String, unique=False, nullable=True)
    ft = db.Column(db.String, unique=False, nullable=True)
    ft_attempts = db.Column(db.String, unique=False, nullable=True)
    ft_percent = db.Column(db.String, unique=False, nullable=True)
    offensive_rb = db.Column(db.String, unique=False, nullable=True)
    defensive_rb = db.Column(db.String, unique=False, nullable=True)
    total_rb = db.Column(db.String, unique=False, nullable=True)
    steals = db.Column(db.String, unique=False, nullable=True)
    blocks = db.Column(db.String, unique=False, nullable=True)
    turnovers = db.Column(db.String, unique=False, nullable=True)
    personal_fouls = db.Column(db.String, unique=False, nullable=True)
    team_id = db.Column(db.String, db.ForeignKey('teams.abbreviation'), nullable=False)
    team_to = db.relationship('Teams', foreign_keys=[team_id], backref=db.backref('stats_to', lazy='select'))
    player_id = db.Column(db.String, db.ForeignKey('players.api_player_id'), nullable=False)
    player_to = db.relationship('Players', foreign_keys=[player_id], backref=db.backref('stats_to', lazy='select'))
    season_id = db.Column(db.Integer, db.ForeignKey('seasons.id'), nullable=False)
    season_to = db.relationship('Seasons', foreign_keys=[season_id], backref=db.backref('stats_to', lazy='select'))

    def __repr__(self):
        return f'<Player: {self.player_id} - {self.team_id} >'

    def serialize(self):
        return {'id': self.id,
                'games': self.games,
                'assists': self.assists,
                'points': self.points,
                'games_started': self.games_started,
                'minutes_pg': self.minutes_pg,
                'field_goals': self.field_goals,
                'field_attempts': self.field_attempts,
                'field_percent': self.field_percent,
                'three_fg': self.three_fg,
                'three_attempts': self.three_attempts,
                'three_percent': self.three_percent,
                'two_fg': self.two_fg,
                'two_attempts': self.two_attempts,
                'two_percent': self.three_percent,
                'effect_fg_percent': self.effect_fg_percent,
                'ft': self.ft,
                'ft_attempts': self.ft_attempts,
                'ft_percent': self.ft_percent,
                'offensive_rb': self.offensive_rb,
                'defensive_rb': self.defensive_rb,
                'total_rb': self.total_rb,
                'steals': self.steals,
                'blocks': self.blocks,
                'turnovers': self.turnovers,
                'personal_fouls': self.personal_fouls,
                'player_id': self.player_to.api_player_id,
                'season_id': self.season_id,
                'team_id': self.team_to.abbreviation
                }
