import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';

export default function CalendarsDateRangePicker(props) {
  const [value, setValue] = React.useState([null, null]);
  const [days , setDays] = React.useState(0);
  const setRentPrice = props.setRentPrice;
  const forDayRent = props.forDayRent;  

  useEffect(() =>{
    setDays((value[1] - value[0]) /1000/60/60/24);
  },[value])
  
  useEffect(() =>{
    if (value[0] && value[1]) {
      setRentPrice( (days) * forDayRent);
    }
  },[days])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DateRangePicker
        TransitionProps={{ unmountOnExit: true }}
          calendars={1}
          value={value}
          onChange={newValue => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} onClick={e => e.stopPropagation()}/>
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
              <Box sx={{ mx: 2 }}>
              {
                value[0] && value[1] &&
                <>
                   total days: {days}
                </>
              } </Box>
            </React.Fragment>
          )}
        />
      </div>
    </LocalizationProvider>
  );
}
