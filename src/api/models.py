from flask_sqlalchemy import SQLAlchemy
from datetime import date
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
                'is_active': self.is_active}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('posts_to', lazy='select'))


class Teams(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conference = db.Column(db.String, unique=False, nullable=False)
    division = db.Column(db.String, unique=False, nullable=False)
    city = db.Column(db.String, unique=False, nullable=False)
    name = db.Column(db.String, unique=True, nullable=False)
    full_name = db.Column(db.String, unique=True, nullable=False)
    abbreviation = db.Column(db.String, unique=True, nullable=False)


class Players(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    playerName = db.Column(db.String, unique=False, nullable=False)
    position = db.Column(db.String, unique=False, nullable=False)
    birth_date = db.Column(db.Date, nullable=False) # Revisar formato de fecha
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    team_to = db.relationship('Teams', foreign_keys=[team_id], backref=db.backref('players_to', lazy='select'))
    

class Seasons(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.String, unique=False, nullable=False)


class Favourites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    favourite_player_id = db.Column(db.Integer, db.ForeignKey('players.id'))
    favourite_player_to = db.relationship('Players', foreign_keys=[favourite_player_id], backref=db.backref('favourite_player_to', lazy='select'))
    favourite_team_id = db.Column(db.Integer, db.ForeignKey('teams.id'))
    favourite_team_to = db.relationship('Teams', foreign_keys=[favourite_team_id], backref=db.backref('favourite_team_to', lazy='select'))
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # user_to = db.relationship('Users', foreign_keys=[favourite_team_id], backref=db.backref('Favourite_teams_to', lazy='select'))
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # user_to = db.relationship('Users', foreign_keys=[favourite_player_id], backref=db.backref('Favourite_players_to', lazy='select'))

    def __repr__(self):
        return f'Siguiendo a: {self.favourite_player_id} - {self.favourite_team_id}'
# Favourites
# ForeingKey
# Stats
# Nullable=False
