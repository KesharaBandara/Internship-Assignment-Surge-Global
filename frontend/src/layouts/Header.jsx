import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from "@material-ui/core/Button";
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function header() {
  const userLogout = () => {
    localStorage.removeItem("token");
    window.location.replace('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Icon
            size="inherit"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <LibraryBooksIcon />
          </Icon>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} align="left">
            MyNotes
          </Typography>
          <Button component="div" sx={{ flexGrow: 1 }} align="right" onClick={() => { userLogout() }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
