MLB Batted Ball Data Visualizer
==============================

Overview
--------
This web application visualizes MLB batted ball data in an interactive and user-friendly interface. It allows users to explore batted ball metrics, filter by players, and view detailed statistics including video replays when available.

Key Features
-----------
- Interactive scatter plot of Exit Speed vs Launch Angle
- Real-time filtering by batter and pitcher names
- Detailed modal view for each batted ball event
- Embedded video replays (when available)
- Summary statistics dashboard
- Responsive design for all device sizes

Tech Stack
----------
Frontend:
- React.js
- Material-UI (MUI) for UI components
- Chart.js for data visualization
- Axios for API requests

Backend:
- Python Flask
- Pandas for data processing
- Flask-CORS for cross-origin support

Installation & Setup
-------------------
1. Clone the repository:
   ```bash
   git clone https://github.com/KingFrank/Braves-TakeHome.git
   cd Braves-TakeHome
   ```

2. Backend Setup:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python3 app.py
   ```
   The backend server will run on http://localhost:5000

3. Frontend Setup:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will run on http://localhost:3000

Deployment
----------
The application is deployed on cPanel and can be accessed at:
https://kfdigitals.com/Braves-TakeHome

GitHub Repository:
https://github.com/KingFrank/Braves-TakeHome

Deployment Steps:
1. Build the React application:
   ```bash
   cd frontend
   npm run build
   ```

2. Upload to cPanel:
   ```bash
   # Initialize git in the project directory
   git init
   
   # Add cPanel repository as remote
   git remote add production https://kfdigitals.com:2083/repository.git
   
   # Add all files
   git add .
   
   # Commit changes
   git commit -m "Initial deployment"
   
   # Push to cPanel
   git push production main
   ```

3. Configure cPanel:
   - Set document root to /public_html/Braves-TakeHome
   - Configure Python application in cPanel
   - Set up SSL certificate for secure HTTPS access

Project Structure
----------------
```
project/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Python virtual environment
└── frontend/
    ├── public/            # Static files
    ├── src/              # React source code
    │   └── App.js        # Main application component
    └── package.json      # Node.js dependencies
```

API Endpoints
------------
- GET /api/data - Returns filtered batted ball data
- GET /api/summary - Returns summary statistics

Contributing
-----------
Feel free to submit issues and enhancement requests!

License
-------
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
-------
For any questions or support, please contact:
- Email: Amani.Franklin3@gmail.com
- GitHub: https://github.com/KingFrank # trigger redeploy
