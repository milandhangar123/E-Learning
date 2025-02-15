import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
// import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';

const Navbar = () => {
  const theme = useTheme();
  const medium = theme.breakpoints.down('md');
  const mediumUp = theme.breakpoints.up('md');
  const [isMenuOpened, setMenuOpened] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: 'black', height: '100px',position:'sticky',top:'0' }} >
        <Toolbar sx={{ height: '100%' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
            Student-Study-Portal
          </Typography>

          <Box sx={{ [mediumUp]: { display: 'none' } }}>
            <Sidebar />
          </Box>

          <Box sx={{ [medium]: { display: 'none' } }}>
            <Button sx={{ fontSize: "1.4rem", textTransform: 'none', ml: 3 }} color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button sx={{ fontSize: "1.4rem", textTransform: 'none', ml: 3 }} color="inherit" component={Link} to="/share/notes">
              Share Notes
            </Button>
            <Button sx={{ fontSize: "1.4rem", textTransform: 'none', ml: 3 }} color="inherit" component={Link} to="/community">
              Community
            </Button>
            <Button sx={{ fontSize: "1.4rem", textTransform: 'none', ml: 3 }} color="inherit" component={Link} to="/chatbot">
              Try AI
            </Button>
            <Button sx={{ fontSize: "1.4rem", textTransform: 'none', ml: 3 }} color="inherit" component={Link} to="https://vikash-six.vercel.app">
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
