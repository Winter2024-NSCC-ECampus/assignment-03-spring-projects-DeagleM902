import { Container, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Landing() {
    const { user } = useAuth();

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    {user ? `Welcome ${user.username}!` : 'Demo Web App'}
                </Typography>
                <Typography variant="h5" component="p" gutterBottom>
                    {user ? 'You have successfully logged in!' : 'Please register or login'}
                </Typography>
                {!user && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/register"
                        >
                            Register
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}