import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import api from './api';
import CalendarsDateRangePicker from './CalendarsDateRangePicker';
import { grey } from '@mui/material/colors';
import { Collapse } from '@mui/material';
import DatePicker from './DatePicker';
import { useEffect } from 'react';
import deletePic from "../Assetes/delete-svgrepo-com.svg"
import downArrowPic from "../Assetes/down-arrow-svgrepo-com.svg"
import upArrowPic from "../Assetes/up-arrow-svgrepo-com.svg"
import { useState } from 'react';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function OrderBar(props) {

  let order = props.order;
  const [isOnHover , setIsOnHover] = useState(false);
  const [rentPrice , setRentPrice] = useState(0);

  const [car, setCar] = React.useState({
    model:{
      name: "",
      company:{
        name: ""
      }
    },
    carDetailes: {
      year: "",
      forDayRent: 0.0,
      forSale: 0.0
    }
  });

  const [checked, setChecked] = React.useState(false);

  const handleArrowClick = e => {
    e.preventDefault();
    setChecked((prev) => !prev);
  }

  // const handleDelete = () => {
  //   let cart = getCart();
  //   cart.splice(0 ,order.id);
  //   localStorage.removeItem("cart");
  //   localStorage.setItem("cart" , JSON.stringify(cart));
  // }

  useEffect(() => {

    api.get(`cars/details/${order.carId}`)
    .then(res => {
      if (res.status == 200) {
        setCar(res.data);
      }
    })
    .catch(() => 
    window.location.href = "/errorpage"
    );
  },[])


  return (
    <Collapse className='collaps-link' onMouseEnter={() => setIsOnHover(true)} onMouseLeave={() => setIsOnHover(false)} in={checked} collapsedSize={150}>
      <Paper
        sx={{
          p: 2,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src="/static/images/grid/complex.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {car.model.company.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {car.model.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {car.carDetailes.year.split('-')[0]} 
                </Typography>
              </Grid>
            </Grid>
            <Grid sx={{position: "relative"}} item>
              <Typography variant="subtitle1" component="div">
                Price: $ 
                {
                  order.dealType === "Rent" &&
                  rentPrice
                }
                {
                  order.dealType === "Bay" &&
                  car.carDetailes.forSale 
                }
                </Typography>
                {
                    isOnHover &&
                     <>
                        <Grid sx={{position: "absolute" ,top: 50 , left: 25, cursor: "pointer"}}>
                         <img style={{width: "25px"}} title="Delete line" src={deletePic} alt='Delete pic' />
                        </Grid>
                        {
                          !checked &&
                            <Grid sx={{position: "absolute" ,bottom: 10 , left: 25 , cursor: "pointer"}}  onClick={handleArrowClick} >
                             <img style={{width: "20px"}} title="Show detailes" src={downArrowPic} alt='Down Arrow pic' />
                            </Grid>
                        }
                    </>
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{position: "relative"}} item>
          <ButtonBase sx={{ height: 128, margin: 1 }}>
            <Typography gutterBottom variant="subtitle1" component="div">
              {
                order.dealType === "Rent" &&
                <CalendarsDateRangePicker setRentPrice={setRentPrice} forDayRent={car.carDetailes.forDayRent}/>
              }
              {
                order.dealType === "Bay" &&
                <DatePicker />
              }
            </Typography>
          </ButtonBase>
          <Grid sx={{position: "absolute" ,bottom: 10 , right: 35 , cursor: "pointer"}}  onClick={handleArrowClick} >
           <img style={{width: "20px"}} title="Hide detailes" src={upArrowPic} alt='Up Arrow pic' />
          </Grid>
        </Grid>
      </Paper>
    </Collapse>

  );
}
