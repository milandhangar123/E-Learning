import { Box, Button, Container, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllProblems } from "../Api";
import AddAnswer from "./AddAnswer";
import AddProblem from "./AddProblem";
import Loader from "../Loader";

const Community = () => {
  const [textAnswer, setTextAnswer] = useState(false);
  const [problems, setProblems] = useState([]);
  const [change,setChange] = useState(false);
  const [answerCount,setAnswerCount] = useState(3)
  const [answerNum,setAnswerNum] = useState(null);
  const [problemNum,setProblemNum] = useState(null);
  const [loading,setLoading] = useState(false)
  const theme = useTheme()
  const small = theme.breakpoints.down('sm')
  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const res = await getAllProblems();
      setLoading(false)
      setProblems(res.data);
    };
    getData();
  }, [change]);
  if(loading){
    return <Loader/>
  }
  return (
    <Container sx={{ pt: 5 }}>
        <AddProblem change={change} setChange={setChange}/>
      <Box>
        {problems.map((item,index) => (
          <>
            <Typography sx={{ fontSize: "1.3rem",[small]:{fontSize:'1.2rem'} }} component="p">
              <Typography
                sx={{ fontSize: "1.4rem",[small]:{fontSize:'1.2rem'}, fontWeight: "bold" }}
                component="span"
              >
                Problem:{" "}
              </Typography>
              {item.problem}
              <Button
                sx={{ mt: 1, display: "block" }}
                onClick={() => {
                    setAnswerNum(index)
                    setTextAnswer(!textAnswer)
                }}
                variant="contained"
                color='success'
              >
                Add Your Answer
              </Button>
            {
              index==answerNum&&<AddAnswer setTextAnswer={setTextAnswer} change={change} setChange={setChange} problemId={item._id} textAnswer={textAnswer}/>
            } 
              {item.answers.map((ans,ind) => (
               ind<answerCount&&<Typography
                  sx={{ ml: 4, fontSize: "1.3rem", [small]:{fontSize:'1.2rem',ml:2},mt: 3 }}
                  component="p"
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.4rem",[small]:{fontSize:'1.2rem'} }}
                    component="span"
                  >
                    Ans{ind+1}: 
                  </Typography>
                  {' '+ans.answer}
                  <Typography sx={{textAlign:'end'}}>
                    ~ {ans.name}
                  </Typography>
                </Typography>
              ))}
              {
                item.answers&&<Button onClick={()=>{
          
                  setAnswerCount(answerCount+3)
                }}>show more answers</Button>
              }
            </Typography>
          </>
        ))}
      </Box>
    </Container>
  );
};

export default Community;
