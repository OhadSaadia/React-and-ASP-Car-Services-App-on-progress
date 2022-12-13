import React from 'react';
import Card from '@mui/material/Card';
import { Button, CardActionArea, CardActions } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../GlobalContexts';
import { Rent, Sale } from '../Enums/RentAndSale'

const PricingBox = (props) => {
  
  const { pricingDetails } = props;
  const {addToCart} = useContext(CartContext);  
  let navigate = useNavigate();
  
  const handleAddToCart = event => {
    event.preventDefault();
    addToCart(pricingDetails);
    navigate( '/cart');  
  }


  return (
    <Card sx={{ width: 300, borderRadius: 2 }}>
      <CardContent>
        <Typography align="center" variant="h5" component="div">
          {pricingDetails.saleType}
        </Typography>
      </CardContent>

      <CardActionArea onClick={handleAddToCart}>
        <CardContent>
          <Typography gutterBottom align='center' variant="h5" component="div">
            {
              pricingDetails.saleType == Rent &&
                <h1>
                  ${pricingDetails.price}
                  <Typography variant="p" color="text.secondary">
                    <small>/ Day</small>
                  </Typography>
                </h1>
            }
            {
              pricingDetails.saleType == Sale &&
                <h1>
                  ${pricingDetails.price}
                </h1>
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <ul className="list-unstyled mt-3 mb-4">
              {pricingDetails.features &&
                pricingDetails.features.map((data, index) => {
                  return <li key={index}>{data}</li>;
                })}
            </ul>
          </Typography>
          <Typography variant="h5" align='center' padding={1}>
            {`${pricingDetails.saleType} Now!`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PricingBox;
