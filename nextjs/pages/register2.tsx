import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    if (!username || !email || !password) {
      toast.error('لطفاً تمامی فیلدها را پر کنید');
      setErrors({
        username: !username ? 'نام کاربری ضروری است' : '',
        email: !email ? 'ایمیل ضروری است' : '',
        password: !password ? 'پسورد ضروری است' : ''
      });
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        username,
        email,
        password,
        roles,
      });

      console.log('User registered:', response.data);
      toast.success('ثبت نام موفقیت‌آمیز بود!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('ثبت نام ناموفق بود!');
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roleName = e.target.value;
    if (e.target.checked) {
      setRoles((prevRoles) => [...prevRoles, roleName]);
    } else {
      setRoles((prevRoles) => prevRoles.filter((role) => role !== roleName));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} // سایه ملایم
          sx={{ 
            padding: 4, 
            backgroundColor: '#ffffff', // رنگ پس‌زمینه فرم سفید
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // سایه فرم
            borderRadius: '8px', // گرد کردن گوشه‌ها
            width: '100%', // عرض کامل
            maxWidth: '400px', // حداکثر عرض
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
            صفحه ثبت نام
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="نام کاربری"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="ایمیل"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="پسورد"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                ثبت نام
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>

      <ToastContainer position="bottom-right" />
    </Container>
  );
};

export default RegisterPage;
