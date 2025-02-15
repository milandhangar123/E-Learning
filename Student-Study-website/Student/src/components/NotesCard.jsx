import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function BasicCard({subjectCode,subjectName,year,category,fileUrl}) {
  return (
    <Card sx={{ minWidth: 275,maxWidth:'350px',margin:'14px' }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          category: {category}
        </Typography>
        <Typography variant="h5" component="div">
          SubjectCode: {subjectCode}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>SubjecName: {subjectName}</Typography>
        <Typography variant="body2">
         these notes are for helping the student.
         please visit <a href="https://vikash-six.vercel.app">vikash mishra</a>
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button component='a' href={fileUrl} download={subjectCode} size="small">Download</Button>
      </CardActions>
    </Card>
  );
}
