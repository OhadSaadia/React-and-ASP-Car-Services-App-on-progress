import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from './Assetes/logo.svg';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext , CartContext } from './GlobalContexts';
import AccountCircle from '@mui/icons-material/AccountCircle';
import cartIcon from "./Assetes/cart.svg"


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Layout = () => {
  
  const getCart = () => {
    let cartStr = localStorage.getItem("cart");
    let cartArr = [];
    if (cartStr && cartStr.length > 0) {
      cartArr = JSON.parse(cartStr);
    }
    return cartArr;
  }
  
  const [cartArr , serCartArr] = useState(getCart());
  
  let navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext);
  
  

  const addToCart = (pricingDetails) => {
    var cartStr = localStorage.getItem('cart');
    if (!cartStr || cartStr.length == 0) {
      localStorage.setItem('cart', JSON.stringify([{ carId: pricingDetails.carId, dealType: pricingDetails.saleType }]));
    }
    else {
      let cartArr = JSON.parse(cartStr);
      localStorage.setItem('cart', JSON.stringify([...cartArr, { carId: pricingDetails.carId, dealType: pricingDetails.saleType }]));
    }
    serCartArr(getCart());
  }

  const handleCartClick = () => {
    navigate('/cart');
  }

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.clear();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CartContext.Provider value={{ getCart , addToCart}}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logo} alt='Logo' />
            </Typography>

            <Box sx={{ flexGrow: 1, alignSelf: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
              <Link to='/forrentpage'>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  For Rent
                </Button>
              </Link>
              <Link to='/forsalepage'>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  For Sale
                </Button>
              </Link>
              <Link to='/addnewcar'>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Add New Car
                </Button>
              </Link>
              <div style={{ position: 'absolute', right: 1 }}>
                <IconButton onClick={handleCartClick} title="Show cart" >
                  <img style={{width: "30px"}} src={cartIcon} alt='cart pic' /> 
                  <span className='badge badge-warning' id='lblCartCount'> {cartArr.length} </span>
                </IconButton>
                {
                  !isAuthenticated &&
                  <>
                    <Link to='/signin'>
                      <Button sx={{ my: 2, color: 'white' }}>
                        Sign In
                      </Button>
                    </Link>
                    |
                    <Link to='/signup'>
                      <Button sx={{ my: 2, color: 'white' }}>
                        Sign Up
                      </Button>
                    </Link>
                  </>
                }
                {
                  isAuthenticated &&
                  <>

                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to='/ordersummery'>
                          My Orders
                        </Link>
                      </MenuItem>
                    </Menu>
                    <Button sx={{ my: 2, color: 'white' }} onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                }
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </CartContext.Provider>
  );
};
export default Layout;
