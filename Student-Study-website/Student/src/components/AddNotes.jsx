import React, { useState } from 'react'
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import axios from 'axios'
import { addNotes } from './Api'
import Swal from 'sweetalert2'

const categories = ['Books', 'Notes', 'Previous Year', 'Other']

export default function AddNotes() {
  const [loading,setLoading] = useState('')
  const [formData, setFormData] = useState({
    subjectCode: '',
    subjectName: '',
    file: null, // Changed from fileUrl to file
    year:'',
    category: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const handleFileChange = async(e) => {
    try {
      const selectedFile = e.target.files[0];
      if (!selectedFile) {
        throw new Error("No file selected.");
      }

      // Create FormData for the file upload
      const formDat = new FormData();
      formDat.append("file", selectedFile);
      formDat.append("upload_preset", "l3shyrzx"); // Unsigned preset name

      // Upload to Cloudinary
      setLoading(true)
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/vikashcloud/raw/upload",
        formDat
      );
      setLoading(false)
      console.log("Uploaded file URL:", response.data.secure_url);

      // Update state with the uploaded file URL
      formData.file=response.data.secure_url
    } catch (err) {
      setLoading(false)
      console.error("Error uploading file:", err);
    }
  }

  const validateForm = () => {
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required'
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      if (validateForm()) {
          console.log(formData)
          setLoading(true)
        const res = await addNotes(formData);
        setLoading(false)
        if(res){
          Swal.fire({
              icon:'success',
              title:'success',
              text:'Notes has been uploaded'
          })
            setFormData({
              year:'',
              subjectCode: '',
              subjectName: '',
              file: null, // Reset file to null
              category: '',
            })
        }
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Notes
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        {Object.keys(formData).map((field) => (
          field !== 'file' && (
            <motion.div
              key={field}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: Object.keys(formData).indexOf(field) * 0.1 }}
            >
              {field === 'category' ? (
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field]}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  margin="normal"
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field]}
                />
              )}
            </motion.div>
          )
        ))}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: Object.keys(formData).length * 0.1 }}
        >
          <TextField
            fullWidth
            margin="normal"
            name="file"
            type="file"
            onChange={handleFileChange}
            error={!!errors.file}
            helperText={errors.file}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
          {loading?'Loading...':'Submit'}
          </Button>
        </motion.div>
      </Box>
    </Box>
  )
}
