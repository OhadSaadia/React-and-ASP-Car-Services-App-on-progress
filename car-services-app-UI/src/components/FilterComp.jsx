import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectComp from './SelectComp';
import RangeSlider from './RangeSlider';

export default function FilterComp() {

  const categories = ["Family" , "Sport" , "Jeep"];
  const yearRange = {
    min : 2000,
    max : 2022
  }
  const priceRange = {
    min : 0,
    max : 1000
  }
  return (
    <div>
      <Accordion sx={{backgroundColor : 'inherit'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SelectComp title="Category" options={categories}/>
          <RangeSlider title="Year" options={yearRange}/>
          <RangeSlider title="Price per day" options={priceRange}/>
        </AccordionDetails>
      </Accordion>   
    </div>
  );
}
