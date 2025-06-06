const config = {
    apiUrl: process.env.NODE_ENV === 'production' 
        ? 'https://braves-takehome-backend.azurewebsites.net'
        : 'http://localhost:5000'
};

export default config; 