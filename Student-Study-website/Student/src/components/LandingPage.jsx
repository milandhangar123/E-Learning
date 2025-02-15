import * as React from "react";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Community from "./Community/Community";
import ModernFooter from "./Footer";
import EnhancedUniqueFooter from "./Footer";
import Loader from "./Loader";
const image =
  "https://t4.ftcdn.net/jpg/02/43/22/71/360_F_243227135_0MKgZJefxBmaClJmhFdgfSByHI4n8UVy.jpg";

const LandingPage = () => {
  const theme = useTheme();
  const medium = theme.breakpoints.down("md");
  const lg = theme.breakpoints.down("lg");
  const small = theme.breakpoints.down("sm");
  const heroStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "calc(100vh - 100px)",
    color: "white",
    padding: "20px",
  };
  const [quote, setQuote] = useState("");
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/quotes?category=education`,
          {
            headers: {
              "X-Api-Key": "dGPpu1Z0YSMf53+DWsq3BQ==7XXHNd4N4UOD3Fvx",
            },
          }
        );
        setLoading(false)
        setQuote(response.data[0].quote);
      } catch (err) {
        setLoading(false)
        console.error("Request failed:", err);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={heroStyle}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}

          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mb: 5,
                fontWeight: "bold",
                fontSize: "5rem",
                [lg]: { fontSize: "4rem" },
                [medium]: {
                  fontSize: "3.4rem",
                  mb: 1,
                },
                [small]: { fontSize: "2.5rem" },
              }}
            >
              Welcome to your journey of limitless learning!
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="h6"
              component="p"
              sx={{
                fontSize: "1.4rem",
                [medium]: {
                  fontSize: "1.3rem",
                },
                [small]: {
                  fontSize: "1rem",
                },
              }}
            >
              {quote}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/chatbot"
              sx={{
                mt: 2,
                mr: 2,
                fontSize: "1rem",
                [small]: {
                  fontSize: "1rem",
                },
              }}
            >
              Chatbot
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/share/notes"
              sx={{
                mt: 2,
                fontSize: "1rem",
                [small]: {
                  fontSize: "1rem",
                },
              }}
            >
              Share Notes
            </Button>
          </motion.div>
        </Container>
      </Box>
      <Container sx={{ py: 4, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          <Paper elevation={3} sx={{ flex: "1 1 320px", padding: 3 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              AI Chatbot
            </Typography>
            <Typography
              sx={{
                fontSize: "1.3rem",
                [medium]: {
                  fontSize: "1.2rem",
                },
              }}
            >
              Experience a smarter, more interactive , with our new AI-powered
              features. These features are crafted to make your learning journey
              smoother and more engaging. Dive into a world of enhanced learning
              and explore how AI can transform your study methods, and ensure
              you're well-prepared for any exam.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/aichatbot"
              sx={{
                mt: 1,
                width: "36%",
                [medium]: {
                  width: "45%",
                },
              }}
            >
              Try AI
            </Button>
          </Paper>
          <Paper elevation={3} sx={{ flex: "1 1 320px", padding: 3 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Books
            </Typography>
            <Typography
              sx={{
                fontSize: "1.3rem",
                [medium]: {
                  fontSize: "1.2rem",
                },
              }}
            >
              Unlock a valuable resource with our new add books feature . These
              compact books are packed with all the important questions that may
              appear in your exams. They’re designed to help you focus your
              study efforts on key topics and ensure youre well-prepared for any
              exam.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="category/?category=Books"
              sx={{
                mt: 1,
                width: "36%",
                [medium]: {
                  width: "45%",
                },
              }}
            >
              Books
            </Button>
          </Paper>
          <Paper elevation={3} sx={{ flex: "1 1 320px", padding: 3 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Notes
            </Typography>
            <Typography
              sx={{
                fontSize: "1.3rem",
                [medium]: {
                  fontSize: "1.2rem",
                },
              }}
            >
              Take advantage of our new notes accessing feature. Seamlessly
              view, organize, and manage all your class notes in one convenient
              place. Whether you re reviewing for an exam or need a quick
              reference, our platform ensures that your notes are always within
              reach.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="category/?category=Notes"
              sx={{
                mt: 1,
                width: "36%",
                [medium]: {
                  width: "45%",
                },
              }}
            >
              Notes
            </Button>
          </Paper>
          <Paper elevation={3} sx={{ flex: "1 1 320px", padding: 3 }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Previous year
            </Typography>
            <Typography
              sx={{
                fontSize: "1.3rem",
                [medium]: {
                  fontSize: "1.2rem",
                },
              }}
            >
              Unlock a treasure trove of past exam papers with our new
              feature.You can upload the previous year paper here and help your
              freinds. Gain valuable insights and practice with previous year’s
              questions to better prepare for your upcoming exams
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="category/?category=Previous Year"
              sx={{
                mt: 1,
                width: "36%",
                [medium]: {
                  width: "45%",
                },
              }}
            >
              Privious year
            </Button>
          </Paper>
        </Box>
      </Container>
      <Community setLoading={setLoading} />
      <EnhancedUniqueFooter />
    </Box>
  );
};

export default LandingPage;
