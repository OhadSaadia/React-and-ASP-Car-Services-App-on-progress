import React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles'


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',

});

function CarDetailsComp(props) {

    let car = props.car;

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

            <Img src="" alt='CarPic' />
            <br />
            <br />
            {/* <h2> {model.toUpperCase()} - {company.toUpperCase()}</h2> */}
            <br />
            <Box sx={{ height: 'auto', backgroundColor: 'white', margin: 2, padding: 2, borderRadius: 2 }}>
                Category: {car.model.category.name} <br />
                Year: {car.carDetails.year.split('-')[0]}<br />
                Engine: {car.model.engineCapacity}<br />
                Horsepower: {car.model.horsePower}<br />
            </Box>
        </Paper>
    );
}

export default CarDetailsComp;