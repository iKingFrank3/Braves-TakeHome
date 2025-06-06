from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
# Configure CORS for your frontend domain
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://delightful-glacier-085b1650f.6.azurestaticapps.net",
            "http://localhost:3000"  # For local development
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Load data
def load_data():
    try:
        # Try to load from Azure path first
        data_path = os.path.join(os.path.dirname(__file__), 'BattedBallData.xlsx')
        if not os.path.exists(data_path):
            # Fallback to relative path
            data_path = os.path.join(os.path.dirname(__file__), '..', 'BattedBallData.xlsx')
        
        if not os.path.exists(data_path):
            raise FileNotFoundError(f"Data file not found at {data_path}")
            
        return pd.read_excel(data_path)
    except Exception as e:
        print(f"Error loading data: {e}")
        return pd.DataFrame()

df = load_data()

@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "data_loaded": not df.empty
    }), 200

@app.route('/api/data')
def get_data():
    if df.empty:
        return jsonify({'error': 'Data not loaded'}), 500
        
    try:
        # Get filter parameters from request
        batter = request.args.get('batter')
        pitcher = request.args.get('pitcher')
        min_exit_speed = request.args.get('min_exit_speed', type=float)
        max_exit_speed = request.args.get('max_exit_speed', type=float)
        min_launch_angle = request.args.get('min_launch_angle', type=float)
        max_launch_angle = request.args.get('max_launch_angle', type=float)

        # Apply filters
        filtered_df = df.copy()
        if batter:
            filtered_df = filtered_df[filtered_df['BATTER'].str.contains(batter, case=False, na=False)]
        if pitcher:
            filtered_df = filtered_df[filtered_df['PITCHER'].str.contains(pitcher, case=False, na=False)]
        if min_exit_speed is not None:
            filtered_df = filtered_df[filtered_df['EXIT_SPEED'] >= min_exit_speed]
        if max_exit_speed is not None:
            filtered_df = filtered_df[filtered_df['EXIT_SPEED'] <= max_exit_speed]
        if min_launch_angle is not None:
            filtered_df = filtered_df[filtered_df['LAUNCH_ANGLE'] >= min_launch_angle]
        if max_launch_angle is not None:
            filtered_df = filtered_df[filtered_df['LAUNCH_ANGLE'] <= max_launch_angle]

        # Select columns and handle missing values
        columns = ['BATTER', 'PITCHER', 'GAME_DATE', 'LAUNCH_ANGLE', 'EXIT_SPEED',
                  'EXIT_DIRECTION', 'HIT_DISTANCE', 'HANG_TIME', 'HIT_SPIN_RATE', 'PLAY_OUTCOME', 'VIDEO_LINK']
        
        result = filtered_df[columns].fillna('').to_dict(orient='records')
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/summary')
def get_summary():
    if df.empty:
        return jsonify({'error': 'Data not loaded'}), 500
        
    try:
        summary = {
            'avg_exit_speed': float(df['EXIT_SPEED'].mean()),
            'avg_launch_angle': float(df['LAUNCH_ANGLE'].mean()),
            'total_batted_balls': int(len(df)),
            'unique_batters': int(df['BATTER'].nunique()),
            'unique_pitchers': int(df['PITCHER'].nunique())
        }
        return jsonify(summary)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 