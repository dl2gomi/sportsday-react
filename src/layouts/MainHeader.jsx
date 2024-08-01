import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon, Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 240;
const pages = ['Events', 'Live', 'History'];
const settings = ['Profile', 'Logout'];

const MainHeader = ({}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="static">
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'inherit',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.hoverfore',
                },
              }}
              component={RouterLink}
              to="/"
              alignItems="center"
            >
              <HomeIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  textDecoration: 'none',
                }}
              >
                SportsDAY
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                cursor: 'pointer',
                color: 'inherit',
                '&:hover': {
                  color: 'primary.hoverfore',
                },
              }}
              alignItems="center"
              component={RouterLink}
              to="/"
            >
              <HomeIcon sx={{ mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  textDecoration: 'none',
                }}
              >
                SportsDAY
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Link
                  component={RouterLink}
                  key={index}
                  to={`/${page.toLowerCase()}`}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  <Button
                    sx={{
                      color: 'white',
                      display: 'block',
                      '&:focus': {
                        outline: 'none',
                      },
                      '&:hover': {
                        backgroundColor: 'primary.hoverback',
                      },
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'primary.back',
            },
          }}
        >
          <List>
            {pages.map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={`/${text.toLowerCase()}`}
                  sx={{
                    color: 'primary.fore',
                    '&:hover': {
                      color: 'primary.hoverfore',
                    },
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </nav>
    </Box>
  );
};

export default MainHeader;
