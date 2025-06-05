
📘 Batted Ball Data Visualizer - README.txt
===========================================

Overview
--------
This standalone web app visualizes MLB batted ball data using:

- React (Frontend) — for interactive charts and filters.
- Python Flask (Backend) — to serve Excel data as JSON API.
- Data Source: BattedBallData.xlsx

Features
--------
- Interactive charts (e.g. Exit Speed vs Launch Angle)
- Player-level insights and filters
- Summary statistics (e.g. Avg Exit Velo)
- Option to include video links (optional)

Project Structure
-----------------
project/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── BattedBallData.xlsx
└── frontend/
    ├── public/
    ├── src/
    │   └── App.js
    └── package.json

Installation Instructions
==========================

1. Backend (Python Flask API)
-----------------------------
a. Setup Virtual Environment and Install Dependencies:
------------------------------------------------------
$ cd backend
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

b. Run the Flask Server:
------------------------
$ python app.py

Flask server will start at: http://localhost:5000

2. Frontend (React)
-------------------
a. Install Node Dependencies:
-----------------------------
$ cd frontend
$ npm install

b. Start React Dev Server:
--------------------------
$ npm start

React app runs at: http://localhost:3000

Production Deployment (Shared Hosting)
======================================

1. React:
---------
$ npm run build
Upload the contents of `frontend/build/` to your public_html or hosting web root.

2. Flask (If Python WSGI/CGI is supported):
-------------------------------------------
- Convert app.py into WSGI (app.wsgi) or CGI version.
- Upload to your `cgi-bin` or contact host support for setup.
- Ensure `BattedBallData.xlsx` is present with the script.

Backend: app.py
---------------
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_excel('BattedBallData.xlsx')

@app.route('/api/data')
def get_data():
    columns = ['BATTER', 'PITCHER', 'GAME_DATE', 'LAUNCH_ANGLE', 'EXIT_SPEED',
               'EXIT_DIRECTION', 'HIT_DISTANCE', 'HANG_TIME', 'HIT_SPIN_RATE', 'PLAY_OUTCOME']
    return jsonify(df[columns].fillna(0).to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)

Backend: requirements.txt
--------------------------
flask
flask-cors
pandas
openpyxl

Frontend: src/App.js
---------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(res => setData(res.data));
  }, []);

  const chartData = {
    labels: data.map(d => d.BATTER),
    datasets: [{
      label: 'Exit Speed',
      data: data.map(d => d.EXIT_SPEED),
      borderColor: 'blue',
      fill: false
    }]
  };

  return (
    <div>
      <h1>Batted Ball Data</h1>
      <Line data={chartData} />
    </div>
  );
}

export default App;

Support
-------
If your hosting provider doesn’t support Python, you can host just the static frontend and use a backend service like Render, Railway, or Replit to deploy Flask.

Licensed under MIT.
