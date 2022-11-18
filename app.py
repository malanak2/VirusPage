# app.py
import os
from flask import Flask, render_template, redirect, url_for, request, send_file
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.sql import text


Base = declarative_base()
basedir = os.path.abspath(os.path.dirname(__file__))
db = SQLAlchemy()
app = Flask(__name__, static_folder='templateStatic')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'icomputers.db')
db.init_app(app)


class computersdata(db.Model):  # type: ignore
    id = db.Column('computer_id', db.Integer, primary_key=True)    
    infrom = db.Column(db.DateTime)
    uname = db.Column(db.String(255))
    notes = db.Column(db.String(500))
    status = db.Column(db.Boolean)
    def __init__(self, infrom, uname, notes, status: bool):
        self.infrom = infrom
        self.uname = uname
        self.notes = notes
        self.status = status

@app.route('/', methods=['GET'])
def home():
    return render_template('home.html', computersdata=computersdata.query.all())

@app.route('/person', methods=['GET', 'POST'])  # type: ignore
def persons():
    args = request.args
    if 'id' not in args:
        return render_template('error.html', case='ID Not provided')
    idC = args['id']
    try:
        idC = int(idC)
    except:
        return render_template('error.html', case='ID Cannot be a letter')
    user = computersdata.query.get(idC)
    if user is None:
        return render_template('error.html', case='Invalid computer id provided')
    WIPCOMMANDS = ['Id is '+str(idC), 'Second command']
    if request.method == 'GET':
        return render_template('person.html', computer=user, list=WIPCOMMANDS)
    if request.method == 'POST':
        data = request.form['CommandToInput']
        if data != '':
            SECONDATA = ['Id is '+str(idC), 'Second command', 'Written in input: '+data]
            return render_template('person.html', computer=user, list=SECONDATA)
        return render_template('person.html', computer=user, list=WIPCOMMANDS)
    

@app.route('/notes', methods=['GET', 'POST'])
def notes():
    args = request.args
    if 'id' not in args:
        return render_template('error.html', case='ID Not provided')
    idC = args['id']
    try:
        idC = int(idC)
    except:
        return render_template('error.html', case='ID Cannot be a letter')
    user = computersdata.query.get(idC)
    if user is None:
        return render_template('error.html', case='Invalid computer id provided')
    if request.method == 'GET':
        return render_template('notes.html', user=user)
    if request.method == 'POST':
        newNote = request.form['note']
        user = computersdata.query.get(idC)
        refNote = newNote.replace('-id-', str(user.id))
        user.notes = refNote
        db.session.add(user)
        db.session.commit()
        return render_template('notes.html', user=user)

    return render_template('error.html', case='NOTES UNKNOWN ERROR')

@app.route('/addPc', methods=['GET', 'POST'])
def addPc():
    if request.method == 'POST':
        data = request.data
        strData = str(data)
        li = list(strData.split('?'))
        pcInfrom = datetime.today()
        pcUname = li[0].removeprefix('b\'')
        pcNotes = li[1]
        pcStatus = li[2]
        pcstat = False
        if pcStatus == '1\'':
            pcstat = True
        cdata = computersdata(infrom=pcInfrom, uname=pcUname, notes=pcNotes, status=pcstat)
        db.session.add(cdata)
        db.session.commit()
        return str(cdata.id)
    return 'ACCES DENIED'

@app.get('/favicon.ico')
def favicon():
    filename = 'templateStatic/favicon.ico'
    return send_file(filename, mimetype='image/gif')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', case='Page not found')


if __name__ == "__main__":
    with app.app_context():
        engine = create_engine('sqlite:///icomputers.db')
        Base.metadata.create_all(engine)
        db.create_all()
    app.run(debug=True)