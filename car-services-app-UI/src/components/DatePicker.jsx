import * as React from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function DatePicker() {

  let now = dayjs();

  const [value, setValue] = React.useState(now);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  function addMonths(date, months) {
    const dateCopy = new Date(date);
    dateCopy.setMonth(dateCopy.getMonth() + months);
    return dateCopy;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Pick Date"
          inputFormat="MM/DD/YYYY"
          value={value}
          minDate={now}
          maxDate={addMonths(now, 3)}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
