# MLB Batted Ball Visualizer

A web application for visualizing MLB batted ball data, deployed on Azure.

Live Demo: [https://delightful-glacier-085b1650f.6.azurestaticapps.net/](https://delightful-glacier-085b1650f.6.azurestaticapps.net/)

## Tech Stack
### Frontend
- React 18.2.0
- Material-UI (MUI) v5
- Chart.js with react-chartjs-2
- Axios for API calls
- React Router DOM

### Backend
- Python 3.9
- Flask 2.3.3
- Flask-CORS 4.0.0
- Pandas 2.2.0
- Gunicorn 21.2.0

### Infrastructure
- Azure Static Web Apps (Frontend)
- Azure App Service (Backend)
- Azure CLI for deployment

## How It Works
The MLB Batted Ball Visualizer is an interactive web application that analyzes and visualizes baseball batted ball data. Here's what the app does:

### Data Analysis
- Processes MLB batted ball data from Excel files
- Calculates key metrics including:
  - Average exit speed
  - Average launch angle
  - Total number of batted balls
  - Count of unique batters
  - Count of unique pitchers
- Handles missing values and data filtering

### Interactive Features
- Dynamic filtering by:
  - Batter name (case-insensitive search)
  - Pitcher name (case-insensitive search)
  - Exit speed range (min/max)
  - Launch angle range (min/max)
- Real-time data visualization updates
- Responsive design for desktop and mobile viewing
- Detailed modal view for each batted ball event showing:
  - Complete batted ball statistics
  - Video playback (if available)
  - Game date and player information

### Visualization Components
1. **Summary Statistics Card**
   - Average exit speed
   - Average launch angle
   - Total batted balls count
   - Unique batters count
   - Unique pitchers count

2. **Exit Speed vs Launch Angle Scatter Plot**
   - Interactive scatter plot visualization
   - Color-coded data points
   - Tooltip with detailed information:
     - Batter name
     - Pitcher name
     - Exit speed
     - Launch angle
     - Hit distance
     - Play outcome
   - Click interaction to view detailed stats

3. **Detailed Statistics Modal**
   - Comprehensive batted ball information:
     - Batter and pitcher details
     - Game date
     - Exit speed and launch angle
     - Exit direction
     - Hit distance
     - Hang time
     - Hit spin rate
     - Play outcome
   - Embedded video player (when available)
   - Full-screen viewing option

### API Endpoints
- `/api/data` - Retrieves filtered batted ball data
  - Query parameters:
    - batter: Filter by batter name
    - pitcher: Filter by pitcher name
    - min_exit_speed: Minimum exit speed
    - max_exit_speed: Maximum exit speed
    - min_launch_angle: Minimum launch angle
    - max_launch_angle: Maximum launch angle
  - Returns: Array of batted ball records with video links

- `/api/summary` - Retrieves aggregated statistics
  - Returns: Object containing:
    - avg_exit_speed: Average exit speed
    - avg_launch_angle: Average launch angle
    - total_batted_balls: Total number of batted balls
    - unique_batters: Count of unique batters
    - unique_pitchers: Count of unique pitchers

## Project Structure
```
Braves-TakeHome/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static files
│   └── package.json   # Dependencies
├── app.py             # Flask backend application
├── requirements.txt   # Python dependencies
├── BattedBallData.xlsx # Data file
└── README.md          # This file
```

## Local Development Setup

### Backend Setup
1. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the backend server:
   ```bash
   python app.py
   ```
   The backend server will run on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on http://localhost:3000

## Deployment to Azure

### 1. GitHub Setup
1. Initialize Git repository (if not already done):
   ```bash
   git init
   ```

2. Create a new repository on GitHub

3. Add your files and push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/iKingFrank3/Braves-TakeHome.git
   git push -u origin main
   ```

### 2. Azure Setup
1. Install Azure CLI and login:
   ```bash
   az login
   ```

2. Create Azure resources:
   ```bash
   # Create resource group
   az group create --name BravesTakeHome --location centralus

   # Create App Service Plan
   az appservice plan create --name BravesTakeHomePlan --resource-group BravesTakeHome --sku B1 --is-linux

   # Create Web App for backend
   az webapp create --resource-group BravesTakeHome --plan BravesTakeHomePlan --name braves-takehome-backend --runtime "PYTHON:3.9"

   # Create Static Web App for frontend
   az staticwebapp create --name braves-takehome-frontend --resource-group BravesTakeHome --location centralus
   ```

### 3. Deploy Backend
1. Deploy using the provided script:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

2. Configure CORS in Azure Portal:
   - Go to your Web App > Configuration > CORS
   - Add your frontend URL: `https://delightful-glacier-085b1650f.6.azurestaticapps.net`

### 4. Deploy Frontend
1. Build the React application:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Azure Static Web Apps:
   - Connect your GitHub repository to Azure Static Web Apps
   - Configure build settings:
     - App location: `/frontend`
     - Output location: `build`
     - Build command: `npm run build`

## Environment Variables
- Backend API URL: Set in `frontend/src/config.js`
- CORS Origins: Configured in `app.py` and Azure Portal

## Troubleshooting
1. If backend fails to start:
   - Check Azure Web App logs
   - Verify Python version and dependencies
   - Ensure CORS is properly configured

2. If frontend can't connect to backend:
   - Verify API URL in `config.js`
   - Check CORS settings
   - Ensure backend is running and accessible

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Footnote
This project is created by Amani Franklin on 6/6/2025. 

Contact
-------
For any questions or support, please contact:
- Email: Amani.Franklin3@gmail.com
- GitHub: https://github.com/KingFrank # trigger redeploy
