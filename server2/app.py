from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from flask_session import Session
from pymongo import MongoClient
import requests

app = Flask(__name__)

client = MongoClient('mongodb+srv://shriharimahabal22:1234@pet.youpnug.mongodb.net/?retryWrites=true&w=majority&appName=Pet')

db = client.test

users = db.users

@app.route('/xyz', methods=['GET','POST'])
def fn():
    url = 'http://localhost:4000/api/login'
    data = {'name': 'hello', 'email': 'deepp', 'password': '1234'}
    response = requests.post(url, json=data)
    print('Response from server:', response.text)
    return 'hi'

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        users = db.users
        user = users.find_one({'username': username})

        if user and user['password']==password:
            session['username'] = user['username']
            session['uid'] = user['uid']
            return redirect(url_for('home'))
        elif user:
            error="Incorrect Credentials"
            return render_template('login.html', error=error)
        else:
            error = 'User does not exist'
            return render_template('login.html', error=error)

    return render_template('login.html')

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        phone_no = request.form['phone_no']
        pet_name = request.form['pet_name']

        if not username or not email or not password or not pet_name:
            error = 'Please fill all the details'
            return render_template('register.html', error=error)
        
        users = db.users
        user = users.find_one({'username': username})
        if user:
            error = 'Username already exists'
            return render_template('register.html', error=error)
        
        users.insert_one({'username': username, 'email': email, 'password': password, 'phone_no': phone_no})
    return render_template('register.html')

if __name__ == '__main__':
    app.run(debug=True)