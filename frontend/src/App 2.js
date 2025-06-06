import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Card,
  CardContent,
  CircularProgress
} from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

function App() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    batter: '',
    pitcher: '',
    minExitSpeed: '',
    maxExitSpeed: '',
    minLaunchAngle: '',
    maxLaunchAngle: ''
  });

  useEffect(() => {
    fetchData();
    fetchSummary();
  }, [filters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`http://localhost:5000/api/data?${params}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/summary');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const chartData = {
    datasets: [{
      label: 'Batted Balls',
      data: data.map(d => ({
        x: d.LAUNCH_ANGLE,
        y: d.EXIT_SPEED
      })),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Launch Angle (°)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Exit Speed (mph)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const point = data[context.dataIndex];
            return [
              `Batter: ${point.BATTER}`,
              `Pitcher: ${point.PITCHER}`,
              `Exit Speed: ${point.EXIT_SPEED} mph`,
              `Launch Angle: ${point.LAUNCH_ANGLE}°`,
              `Distance: ${point.HIT_DISTANCE} ft`,
              `Outcome: ${point.PLAY_OUTCOME}`
            ];
          }
        }
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MLB Batted Ball Visualizer
      </Typography>

      <Grid container spacing={3}>
        {/* Filters */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Batter"
                  name="batter"
                  value={filters.batter}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Pitcher"
                  name="pitcher"
                  value={filters.pitcher}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Min Exit Speed"
                  name="minExitSpeed"
                  type="number"
                  value={filters.minExitSpeed}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <TextField
                  fullWidth
                  label="Max Exit Speed"
                  name="maxExitSpeed"
                  type="number"
                  value={filters.maxExitSpeed}
                  onChange={handleFilterChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Summary Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary Statistics
              </Typography>
              {summary ? (
                <>
                  <Typography>Avg Exit Speed: {summary.avg_exit_speed.toFixed(1)} mph</Typography>
                  <Typography>Avg Launch Angle: {summary.avg_launch_angle.toFixed(1)}°</Typography>
                  <Typography>Total Batted Balls: {summary.total_batted_balls}</Typography>
                  <Typography>Unique Batters: {summary.unique_batters}</Typography>
                  <Typography>Unique Pitchers: {summary.unique_pitchers}</Typography>
                </>
              ) : (
                <CircularProgress size={20} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Exit Speed vs Launch Angle
            </Typography>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height={400}>
                <CircularProgress />
              </Box>
            ) : (
              <Box height={400}>
                <Scatter data={chartData} options={chartOptions} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App; 