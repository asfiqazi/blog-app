import React, { Component, ErrorInfo, ReactNode } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Button 
} from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { 
      hasError: true,
      error 
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ 
      hasError: true,
      error,
      errorInfo 
    });
    
    // Log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  handleResetError = () => {
    this.setState({ 
      hasError: false,
      error: undefined,
      errorInfo: undefined 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <Typography variant="h5" color="error" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" paragraph>
              An unexpected error occurred. Please try again later.
            </Typography>
            {this.state.error && (
              <Typography variant="body2" color="text.secondary" paragraph>
                Error: {this.state.error.toString()}
              </Typography>
            )}
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.handleResetError}
            >
              Try Again
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
