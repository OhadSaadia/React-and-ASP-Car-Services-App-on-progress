import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import PricingBox from '../components/PricingBox';
import CarDetailsComp from '../components/CarDetailsComp';
import api from '../components/api';
import { useLocation } from 'react-router-dom';
import { Rent, Sale } from '../Enums/RentAndSale'

function CarDetailsPage(props) {
    
    let carId = useLocation().pathname.split('/')[2];
    const [car , setCar] = useState({
        id: 0 ,
        carDetails:{
            carPics:[],
            forDayRent: 0,
            forSale: 0,
            year: ""
        },
         model:{
            company:{name: ""}, 
            category:{name: ""},
            engineCapacity: 0,
            horsePower: 0,
            name:""
         }
    }); 

    useEffect(() => {   
        api.get(`cars/details/${carId}`)
        .then(res => {
            if (res.status == 200) {
                setCar(res.data);
            }
            else{
                window.location.href = '/errorpage';
            }
        })
        .catch (() => {
            window.location.href = '/errorpage';
        });
    },[])
    
    return (
        <div className='container'>
            <br />
            <h1>Car Datails</h1>
            <br />
            <br />
           <CarDetailsComp car={car} ></CarDetailsComp>
            <div style={{ display: 'flex', height: '100%', justifyContent: 'space-evenly' }}>
                <PricingBox
                    btnClass="btn-outline-primary"
                    pricingDetails={{saleType:Rent,price:car.carDetails.forDayRent,features:car.carDetails.features}}
                />
                <PricingBox
                    btnClass="btn-outline-primary"
                    pricingDetails={{saleType:Sale,price:car.carDetails.forSale,features:car.carDetails.features}}
                />
            </div>
        </div>
    );
}

export default CarDetailsPage;