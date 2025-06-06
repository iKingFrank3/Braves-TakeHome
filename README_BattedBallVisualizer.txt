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

Modal Implementation
-------------------
1. Install Required Dependencies:
   ```bash
   cd frontend
   npm install @mui/material @emotion/react @emotion/styled
   ```

2. Create Modal Component (src/components/BallDetailsModal.js):
   ```javascript
   import React from 'react';
   import { Modal, Box, Typography, Button } from '@mui/material';

   const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 400,
     bgcolor: 'background.paper',
     boxShadow: 24,
     p: 4,
     borderRadius: 2,
   };

   function BallDetailsModal({ open, handleClose, ballData }) {
     return (
       <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="ball-details-modal"
       >
         <Box sx={style}>
           <Typography variant="h6" component="h2">
             Batted Ball Details
           </Typography>
           {ballData && (
             <>
               <Typography>Batter: {ballData.BATTER}</Typography>
               <Typography>Pitcher: {ballData.PITCHER}</Typography>
               <Typography>Exit Speed: {ballData.EXIT_SPEED} mph</Typography>
               <Typography>Launch Angle: {ballData.LAUNCH_ANGLE}°</Typography>
               <Typography>Distance: {ballData.HIT_DISTANCE} ft</Typography>
               <Typography>Outcome: {ballData.PLAY_OUTCOME}</Typography>
             </>
           )}
           <Button onClick={handleClose} sx={{ mt: 2 }}>
             Close
           </Button>
         </Box>
       </Modal>
     );
   }

   export default BallDetailsModal;
   ```

3. Update App.js to Use Modal:
   ```javascript
   import React, { useEffect, useState } from 'react';
   import axios from 'axios';
   import { Line } from 'react-chartjs-2';
   import BallDetailsModal from './components/BallDetailsModal';

   function App() {
     const [data, setData] = useState([]);
     const [selectedBall, setSelectedBall] = useState(null);
     const [modalOpen, setModalOpen] = useState(false);

     useEffect(() => {
       axios.get('http://localhost:5000/api/data')
         .then(res => setData(res.data));
     }, []);

     const handleBallClick = (ballData) => {
       setSelectedBall(ballData);
       setModalOpen(true);
     };

     const handleCloseModal = () => {
       setModalOpen(false);
       setSelectedBall(null);
     };

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
         <Line 
           data={chartData}
           options={{
             onClick: (_, elements) => {
               if (elements.length > 0) {
                 const index = elements[0].index;
                 handleBallClick(data[index]);
               }
             }
           }}
         />
         <BallDetailsModal
           open={modalOpen}
           handleClose={handleCloseModal}
           ballData={selectedBall}
         />
       </div>
     );
   }

   export default App;
   ```

4. Usage:
   - Click on any data point in the chart to open the modal
   - Modal displays detailed information about the selected batted ball
   - Click outside the modal or the close button to dismiss

Support
-------
If your hosting provider doesn't support Python, you can host just the static frontend and use a backend service like Render, Railway, or Replit to deploy Flask.

Licensed under MIT.
