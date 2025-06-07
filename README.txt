# MLB Batted Ball Visualizer

A web application for visualizing MLB batted ball data, deployed on Azure.

Live Demo: [https://delightful-glacier-085b1650f.6.azurestaticapps.net/](https://delightful-glacier-085b1650f.6.azurestaticapps.net/)

## Project Structure
```
Braves-TakeHome/
├── frontend/           # React frontend application
├── app.py             # Flask backend application
├── requirements.txt   # Python dependencies
├── BattedBallData.xlsx # Data file
└── README.md          # This file
```

## Local Development Setup

### Prerequisites
- Python 3.9 or higher
- Node.js 14 or higher
- VS Code
- Git
- Azure CLI

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
   git remote add origin <your-github-repo-url>
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
