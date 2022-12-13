import { Button } from '@mui/material';
import React from 'react';
import ComplexGrid from '../components/ComplexGrid';
import FilterComp from '../components/FilterComp';
import SortComp from '../components/SortComp';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import api from '../components/api';
import { useState } from 'react';
import { useEffect } from 'react';


function SearchPage(props) {
    
    const [cars,setCars]=useState([{
        id: 0,
        carDetails: {
            id: 0,
            carId: 0,
            year: "",
            forDayRent: 0,
            forSale: 0,
            carPics: []
        },
        model: {
            id: 0,
            name: "",
            engineCapacity: 0,
            horsePower: 0,
            company: {
                id: 0,
                name: ""
            },
            category: {
            id: 0,
            name: ""
            }
        }
    }]);
    let page = 1;
    
    useEffect(()=>{

        //Get 10 Models from api
        api.get(`cars/getcars/${page}`)
        .then(res => setCars(res.data));
    },[])

 

    return (  
         <div className='container'> 
            <br />
            <h1>{props.title}:</h1>
            <div style={{margin:15}}>
                <FilterComp/>
                <SortComp/>
                {
                    cars.map(car => (
                        <>
                            <ComplexGrid key={car.id} car={car}/> 
                        </>
                    ))
                }
            </div>
            <br />   
                <Stack spacing={2} alignItems='center' paddingBottom={5}>
                    <Pagination count={10} color="primary" />
                </Stack>
         </div>
    );
}

export default SearchPage;


