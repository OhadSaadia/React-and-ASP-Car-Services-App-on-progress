import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button'
import {Link, useLocation} from 'react-router-dom';
import { Rent,Sale } from '../Enums/RentAndSale'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid(props) {

  var car = props.car;
  let path = useLocation().pathname.split('/')[1];  // forsalepage or forrentpage
  let dealType = "";

  //Set Deal Type
  if(path = '/forrentpage'){
    dealType = Rent;
  }
  if(path = '/forsalepage'){
    dealType = Sale;
  }

  return (
    <Paper
      sx={{
        p: 2,
        margin: 2,
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
                {/* {new Date(car.carDetails.year).getFullYear()}  */}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{direction: 'rtl'}} variant="body2">    
                  <Link to={"/cardetails/:id".replace(':id', car.id )}style={{textDecoration: 'none'}}>
                    <Button variant="contained" size="small"  >
                      Check Out 
                    </Button>
                  </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              {/* {dealType == Rent} && {car.carDetails.forDayRent} */}
              {/* {dealType == Sale} && {car.carDetails.forSale} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
