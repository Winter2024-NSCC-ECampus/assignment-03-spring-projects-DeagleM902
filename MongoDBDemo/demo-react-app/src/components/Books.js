import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress
} from '@mui/material';
import axios from 'axios';

export default function Books() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', year: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                navigate('/login');
                return;
            }
            try {
                await fetchBooks();
            } catch (error) {
            }
        };

        fetchData();
    }, [user, navigate]);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/books', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(response.data);
            setError('');
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Failed to load books';
            setError(errorMessage);

            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }

            console.error('Fetch books error:', err.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const bookToAdd = {
                ...newBook,
                year: parseInt(newBook.year)
            };

            await axios.post('http://localhost:8080/api/books', bookToAdd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setNewBook({ title: '', author: '', year: '' });
            await fetchBooks();
            setError('');
        } catch (err) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Failed to add book';
            setError(errorMessage);

            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }

            console.error('Add book error:', err.response?.data || err.message);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Bookstore
                </Typography>

                <Box component="form" onSubmit={handleAddBook} sx={{ mb: 4 }}>
                    <TextField
                        label="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Year"
                        type="number"
                        value={newBook.year}
                        onChange={(e) => setNewBook({...newBook, year: e.target.value})}
                        required
                        fullWidth
                        sx={{ mb: 2 }}
                        inputProps={{
                            min: "0",
                            step: "1"
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                    >
                        Add Book
                    </Button>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {books.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                No books available in the store
                            </Typography>
                        ) : (
                            books.map((book) => (
                                <ListItem key={book.id}>
                                    <ListItemText
                                        primary={book.title}
                                        secondary={`${book.author} (${book.year})`}
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                )}
            </Box>
        </Container>
    );
}