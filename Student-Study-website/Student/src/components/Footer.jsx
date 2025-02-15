import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  useTheme,
  styled,
  alpha,
  Snackbar,
  Alert
} from '@mui/material';
import {Link} from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Send
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const WaveBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)',
  '& svg': {
    position: 'relative',
    display: 'block',
    width: 'calc(100% + 1.3px)',
    height: '120px',
    transform: 'rotateY(180deg)',
  },
  '& .shapeFill': {
    fill: theme.palette.background.default,
  },
}));

const GlowingTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.5),
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
    },
  },
}));

const AnimatedLink = motion(Link);
const AnimatedIconButton = motion(IconButton);

const socialIcons = [
  { icon: GitHubIcon, color: '#2b2929', name: 'Github' },
  { icon: Twitter, color: '#1DA1F2', name: 'Twitter' },
  { icon: Instagram, color: '#E4405F', name: 'Instagram' },
  { icon: LinkedIn, color: '#0A66C2', name: 'LinkedIn' },
];

export default function EnhancedUniqueFooter() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        position: 'relative',
        mt: 15,
        pt: 20,
        pb: 6,
      }}
    >
      <WaveBox>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shapeFill"></path>
        </svg>
      </WaveBox>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
              Let's Connect and Create!
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Join our community of innovators and stay updated with the latest trends and opportunities.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <GlowingTextField
                variant="outlined"
                placeholder="Your email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mr: 1, bgcolor: 'background.paper', borderRadius: 1 }}
              />
              <AnimatedIconButton
                type="submit"
                color="secondary"
                size="large"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}
              >
                <Send />
              </AnimatedIconButton>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          {socialIcons.map((social, index) => (
            <AnimatedIconButton
              key={index}
              component={motion.a}
              href={index=='0'?'https://github.com/vikashmishra1234':index=='1'?'https://x.com/VikashMish23321?t=W_vUKpmWLecypC9655InHQ&s=09':index=='2'?'https://www.instagram.com/v.i.k.a.s.h.123?igsh=MWNsNWFxY25od3puMg==':index=='3'?'https://www.linkedin.com/in/vikash-mishra-099478277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app':''}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${social.name}`}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                color: 'background.paper',
                bgcolor: social.color,
                mx: 1,
                '&:hover': { bgcolor: alpha(social.color, 0.8) },
              }}
            >
              <social.icon />
            </AnimatedIconButton>
          ))}
        </Box>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Home', 'Chatbot', 'Share files', 'Contact', 'Community'].map((text, index) => (
            <AnimatedLink
              key={text}
              to={index=='0'?'/':index=='1'?'/chatbot':index=='2'?'/share/notes':index=='3'?'https://vikash-six.vercel.app':index=='4'?'/community':''}
              color="inherit"
              underline="none"
              sx={{ mx: 2, my: 1 }}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span style={{marginRight:'15px',fontSize:"1.1rem",color:'white',textDecoration:'none'}}>{text}</span>
            </AnimatedLink>
          ))}
        </Box>
        <Typography variant="body2" color="primary.contrastText" align="center" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} vikash mishra. All rights reserved.
        </Typography>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for subscribing!
        </Alert>
      </Snackbar>
    </Box>
  );
}
