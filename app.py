import os
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///submissions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

class Submission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    company = db.Column(db.String(100), nullable=False)
    job_title = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-started', methods=['GET', 'POST'])
def get_started():
    if request.method == 'POST':
        data = request.json
        new_submission = Submission(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            company=data['company'],
            job_title=data['jobTitle'],
            message=data['message']
        )
        db.session.add(new_submission)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Form submitted successfully!'}), 200
    return render_template('get_started.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
