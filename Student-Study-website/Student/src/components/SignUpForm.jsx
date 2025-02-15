import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp } from './Api';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  // Validation schema using Yup
  const navigate = useNavigate()
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    studentYear: Yup.string().required('Student Year is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  // Formik hook to handle form state, validation, and submission
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      studentYear: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
     const res = await signUp(values);
     if(res&&res.token){
        Cookies.set('token',res.token);
        navigate('/share/notes')
        Swal.fire({
            icon:'success',
            title:res.message
        })
     }
    },
  });

  return (
    <Box sx={{ maxWidth: '400px', margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New User
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
          required
        />
        <TextField
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          fullWidth
          required
        />
        <TextField
          label="Student Year"
          name="studentYear"
          value={formik.values.studentYear}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.studentYear && Boolean(formik.errors.studentYear)}
          helperText={formik.touched.studentYear && formik.errors.studentYear}
          fullWidth
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      <Typography sx={{textAlign:"center",width:'100%'}} component={Link} to='/login'>
          already have an account? login
          </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
