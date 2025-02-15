import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addAnswer } from '../Api'

const AddProblem = ({textAnswer,setTextAnswer,setChange,change,problemId}) => {
    const [formData,setFormData] = useState({});
    const handleAnswer = async(e)=>{
        e.preventDefault()
        formData.problemId = problemId
        const res = await addAnswer(formData);
        console.log(res)
        setChange(!change)
        setTextAnswer(false)
    }
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
  return (
    <Box>
 {
            textAnswer?<Box 
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }} 
            component='form'
            onSubmit={handleAnswer}
            >
                <TextField
                variant='outlined'
                label='name'
                name='name'
                onChange={handleChange}
                />
             <TextField
                id="outlined-basic"
                label="Enter Answer Here"
                variant="outlined"
                name='answer'
                onChange={handleChange}
                multiline
                rows={5}
                 />
             <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>:''
        }
    </Box>
  )
}

export default AddProblem