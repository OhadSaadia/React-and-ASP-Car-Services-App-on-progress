import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


export default function CarCard(props) {
  
  var car = props.car;
  
  const handleCarClick = () => {
    window.location.href = `/cardetails/${car.id}`;
  }
  

  return (
    <Card sx={{ width: 275 , borderRadius : 2 }}>
      <CardActionArea onClick={handleCarClick}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="Car Pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <br />
            Company: {car.company}<br/>
            Year: {car.year}<br/><br />
            Price
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
