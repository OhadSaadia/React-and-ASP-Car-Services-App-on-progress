import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComp(props) {

  const {options , title ,category , setCategory} = props;

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={category}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            options.map(opt => 
               <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            )
          }
          
        </Select>
      </FormControl>
    </div>
  );
}
