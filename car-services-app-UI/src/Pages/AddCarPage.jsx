import React, { useState } from 'react';
import SelectComp from '../components/SelectComp';
import { Slider, TextField } from '@mui/material';

export default function AddCarPage() {


    const [category , setCategory] = useState();
    const [year , setYear] = useState(); 
    const [forDayRent , setForDayRent] = useState(); 
    const [forSale , setForSale] = useState(); 

    const categories = ["Family" , "Sport" , "Jeep"];
    const yearRange = {
      min : 2000,
      max : 2022
    }
    const priceRange = {
      min : 0,
      max : 1000
    }

    const handleYearChange = (e) => {
        setYear(e.target.value);
    } 
    const handleRentChange = (e) => {
        setForDayRent(e.target.value);
    }
    const handleSaleChange = (e) => {
        setForSale(e.target.value);
    }
    return (  
        <div className="container">
            <br />
            <h1>Add Car</h1>
            <div style={{margin:"50px"}}>
            <form>
                <label>

                </label>
            </form>


            <SelectComp title="Category" options={categories} category={category} setCategory={setCategory}/>
            <h3>Year</h3>
             <Slider defaultValue={2011} aria-label="year" valueLabelDisplay="year" min={2000} max={2022} onChange={handleYearChange} /> {year}
             <h3>For rent per day</h3>
             <Slider defaultValue={500} aria-label="forDayRent" valueLabelDisplay="forDayRent" min={0} max={1000} onChange={handleRentChange} /> {forDayRent}
             <h3>For sale</h3>
             <Slider defaultValue={50000000} aria-label="forSale" valueLabelDisplay="forSale" min={0} max={100000000} onChange={handleSaleChange} /> {forSale}
          
            <TextField
                sx={{marginTop: 5}}
                id="filled-search"
                label="name"
                type="search"
                variant="filled"
            />  
            </div>
        </div>
    );
}
