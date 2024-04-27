from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from flask_session import Session
from pymongo import MongoClient
import requests

app = Flask(__name__)

client = MongoClient('mongodb+srv://shriharimahabal22:1234@pet.youpnug.mongodb.net/?retryWrites=true&w=majority&appName=Pet')

db = client.test


@app.route('/xyz', methods=['GET','POST'])
def user_create():
    url = 'http://localhost:4000/api/login'
    data = {'name': "lasm", 'email': "nn aa,z", 'password': "password", 'contact': "0099999999"}
    response = requests.post(url, json=data)
    print("*********")
    json_data = response.json()  # Parse the JSON response
    user_id = json_data['user']['_id']
    print(user_id)
    url='http://localhost:4000/api/addPet/'
    data = {'name': "lasm", 'type': "dog",'breed':'what', 'user': user_id}
    response = requests.post(url, json=data)
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

@app.route('/book_appointment', methods=['POST'])
def book_appointment():
    if request.method == 'POST':
        pet_name = request.form['pet_name']
        date = request.form['date']
        time = request.form['time']
        description = request.form['description']

        if not pet_name or not date or not time or not description:
            error = 'Please fill all the details'
            return render_template('book_appointment.html', error=error)
        
        appoinment_req = db.appoinment_req
        appoinment_req.insert_one({'pet_name': pet_name, 'date': date, 'time': time, 'description': description})
    return render_template('book_appointment.html')

if __name__ == '__main__':
    app.run(debug=True)