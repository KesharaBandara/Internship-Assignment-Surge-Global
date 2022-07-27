import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function header() {
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
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
