import { Link } from '@mui/material';
import React from 'react';
import CarCard from '../components/CarCard';
import Button from '@mui/material/Button';

function CardsBar(props) {
    const {cars , title} = props;
    return (
        <div className="cardbar">
            <h2>{title}</h2>
            <div style={{ display: 'flex', height: '100%' , justifyContent:'space-evenly' }}>
            {   
                    cars.map(car => <CarCard car={car}/>)
            }
            </div>
            <Button sx={{marginTop : 1}} variant="contained" size="small">
                See All
                <Link to='/forrentpage'/>
            </Button>
        </div> 
    );
}

export default CardsBar;