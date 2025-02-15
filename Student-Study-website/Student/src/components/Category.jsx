import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getAllNotes } from './Api';
import BasicCard from './NotesCard';
import { useLocation } from 'react-router-dom';
import {Container} from '@mui/material'


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

const Category = () => {
    const [value, setValue] = React.useState(0);
    const [notes,setNotes] = useState([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const myParam = queryParams.get("category");
    const [category,setCategory] = useState(myParam);

    useEffect(()=>{
        const getData = async()=>{
            const res = await getAllNotes(category);
            console.log(res)
            setNotes(res.data)
        }
        getData()
    },[category])
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="1st year" />
    <Tab label="2nd year"  />
    <Tab label="3rd year" />
    <Tab label="4th year" />
  </Tabs>
</Box>
<CustomTabPanel value={value} index={0}>
  {
    <Container    sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 0, 
      }} >
        {

    notes.map(note=>(
       note.year=='1'&&<BasicCard category={note.category} 
       subjectCode={note.subjectCode}
       subjectName={note.subjectName}
       fileUrl={note.file}
       year={note.year} key={note._id}/>
    ))
        }
    </Container>
  }
</CustomTabPanel>
<CustomTabPanel  value={value} index={1}>
{
    <Container sx={{display:'flex'}}>
        {

    notes.map(note=>(
       note.year=='2'&&<BasicCard category={note.category} 
       subjectCode={note.subjectCode}
       subjectName={note.subjectName}
       fileUrl={note.file}
       year={note.year} key={note._id}/>
    ))
        }
    </Container>
  }
</CustomTabPanel>
<CustomTabPanel value={value} index={2}>
{
    <Container sx={{display:'flex'}}>
        {

    notes.map(note=>(
       note.year=='3'&&<BasicCard category={note.category} 
       subjectCode={note.subjectCode}
       subjectName={note.subjectName}
       fileUrl={note.file}
       year={note.year} key={note._id}/>
    ))
        }
    </Container>
  }
</CustomTabPanel>
<CustomTabPanel value={value} index={3}>
{
    <Container sx={{display:'flex'}}>
        {

    notes.map(note=>(
       note.year=='4'&&<BasicCard category={note.category} 
       subjectCode={note.subjectCode}
       subjectName={note.subjectName}
       fileUrl={note.file}
       year={note.year} key={note._id}/>
    ))
        }
    </Container>
  }
</CustomTabPanel>
    </Box>
  )
}

export default Category