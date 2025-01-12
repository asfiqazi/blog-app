import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container 
} from '@mui/material';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mt: 8 
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1" paragraph>
          You do not have permission to access this page.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/"
          >
            Go to Home
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            component={Link} 
            to="/login"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Unauthorized;
