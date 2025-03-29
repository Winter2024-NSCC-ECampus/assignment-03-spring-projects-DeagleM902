import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MongoDB + React Demo
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {user ? (
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton color="inherit">
                                    <AccountCircle />
                                </IconButton>
                                <Typography>{user.username}</Typography>
                            </Box>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/books"
                                sx={{ mr: 2 }}
                            >
                                Books
                            </Button>
                            <Button
                                color="inherit"
                                onClick={logout}
                                variant="outlined"
                                sx={{ color: 'white', borderColor: 'white' }}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/login"
                                variant="outlined"
                                sx={{ color: 'white', borderColor: 'white' }}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}