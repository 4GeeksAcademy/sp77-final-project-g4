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
    conference = db.Column(db.String, unique=False, nullable=False)
    division = db.Column(db.String, unique=False, nullable=False)
    city = db.Column(db.String, unique=False, nullable=False)
    name = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, unique=True, nullable=False)
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
    playerName = db.Column(db.String, unique=False, nullable=False)
    position = db.Column(db.String, unique=False, nullable=False)
    # birth_date = db.Column(db.DateTime, nullable=True) # Revisar formato de fecha
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team_to = db.relationship('Teams', foreign_keys=[team_id], backref=db.backref('players_to', lazy='select'))

    def __repr__(self):
        return f'<Player: {self.full_name} >'

    def serialize(self):
        return {'id': self.id,
                'playerName': self.playerName,
                'position': self.position,
                'team': self.team_abbreviation}


class Seasons(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.String, unique=False, nullable=False)


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
    games = db.Column(db.String, unique=False, nullable=False)
    assists = db.Column(db.String, unique=False, nullable=False)
    points = db.Column(db.String, unique=False, nullable=False)
    gamesStarted = db.Column(db.String, unique=False, nullable=False)
    minutesPg = db.Column(db.String, unique=False, nullable=False)
    fieldGoals = db.Column(db.String, unique=False, nullable=False)
    fieldAttempts = db.Column(db.String, unique=False, nullable=False)
    fieldPercent = db.Column(db.String, unique=False, nullable=False)
    threeFg = db.Column(db.String, unique=False, nullable=False)
    threeAttempts = db.Column(db.String, unique=False, nullable=False)
    threePercent = db.Column(db.String, unique=False, nullable=False)
    twoFg = db.Column(db.String, unique=False, nullable=False)
    twoAttempts = db.Column(db.String, unique=False, nullable=False)
    threePercent = db.Column(db.String, unique=False, nullable=False)
    effectFgPercent = db.Column(db.String, unique=False, nullable=False)
    ft = db.Column(db.String, unique=False, nullable=False)
    ftAttempts = db.Column(db.String, unique=False, nullable=False)
    ftPercent = db.Column(db.String, unique=False, nullable=False)
    offensiveRb = db.Column(db.String, unique=False, nullable=False)
    defensiveRb = db.Column(db.String, unique=False, nullable=False)
    totalRb = db.Column(db.String, unique=False, nullable=False)
    steals = db.Column(db.String, unique=False, nullable=False)
    blocks = db.Column(db.String, unique=False, nullable=False)
    turnovers = db.Column(db.String, unique=False, nullable=False)
    blocks = db.Column(db.String, unique=False, nullable=False)
    personalFouls = db.Column(db.String, unique=False, nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team_to = db.relationship('Teams', foreign_keys=[team_id], backref=db.backref('stats_to', lazy='select'))
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    player_to = db.relationship('Players', foreign_keys=[player_id], backref=db.backref('stats_to', lazy='select'))
    season_id = db.Column(db.Integer, db.ForeignKey('seasons.id'))
    season_to = db.relationship('Seasons', foreign_keys=[season_id], backref=db.backref('stats_to', lazy='select'))
