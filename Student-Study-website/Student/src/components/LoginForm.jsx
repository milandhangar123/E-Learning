import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { login } from './Api';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

// Validation schema using Yup
const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = ({setToken}) => {
  const Navigate = useNavigate();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  useEffect(()=>{
    if(isLoggedIn){

      setToken(true)
    }
  },[isLoggedIn])
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(async() => {
    const res = await login(values);
    if(res&&res.token){

        Cookies.set('token',res.token)
        Navigate('/share/notes')
        setToken(true)
        setIsLoggedIn(true)
        Swal.fire({
            icon:'success',
            title:res.message
            
        })
    }
      
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Formik
      initialValues={{ phone: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: '400px', margin: 'auto', mt: 5 }}
          >
            <Typography variant="h5" align="center">Login</Typography>
            {/* Phone field */}
            <Field name="phone">
              {({ field, form }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  error={Boolean(form.errors.phone && form.touched.phone)}
                  helperText={<ErrorMessage name="phone" />}
                />
              )}
            </Field>
            {/* Password field */}
            <Field name="password">
              {({ field, form }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={Boolean(form.errors.password && form.touched.password)}
                  helperText={<ErrorMessage name="password" />}
                />
              )}
            </Field>
            {/* Submit button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          <Typography sx={{textAlign:"center",width:'100%'}} component={Link} to='/signup'>
          don'nt have an account?signup
          </Typography>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
