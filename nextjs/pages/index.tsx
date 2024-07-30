import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, TextField, Stack, Button, Menu, ListItemText } from '@mui/material';
import axios from 'axios';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { TextFieldProps } from '@mui/material/TextField'; // اضافه کردن این خط

interface Person {
  id: number;
  firstName: string;
  lastName: string;
  nationalCode: string;
  detectionTime: string;
}

const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند"
];

const daysOfWeek = [
  "شنبه",
  "یک‌شنبه",
  "دو‌شنبه",
  "سه‌شنبه",
  "چهار‌شنبه",
  "پنج‌شنبه",
  "جمعه"
];

const NewPersonTable: React.FC = () => {
  const [newPeople, setNewPeople] = useState<Person[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Person[]>('/api/matchedperson');
        setNewPeople(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDetectionTime = (timeString: string) => {
    const date = new Date(timeString);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  const handleMonthChange = (action: 'next' | 'prev') => {
    const newSelectedMonth = action === 'next' ? addMonths(selectedMonth, 1) : subMonths(selectedMonth, 1);
    setSelectedMonth(newSelectedMonth);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDaySelect = (day: number) => {
    const selectedDay = new Date(selectedMonth);
    selectedDay.setDate(day);
    setSelectedDate(selectedDay);
    setAnchorEl(null);
  };

  const filterByMonthAndDate = (person: Person) => {
    const detectionDate = new Date(person.detectionTime);
    const monthMatches = detectionDate.getMonth() + 1 === selectedMonth.getMonth() + 1;
    if (!selectedDate) return monthMatches;
    return monthMatches && detectionDate.getDate() === selectedDate.getDate();
  };

  const filteredPeople = newPeople.filter(filterByMonthAndDate);

  // Generate days of the selected month
  const daysOfMonth = eachDayOfInterval({
    start: startOfMonth(selectedMonth),
    end: endOfMonth(selectedMonth)
  });

  return (
    <div style={{ width: '100%' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={() => handleMonthChange('prev')}>{'<'}</Button>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="month-filter-label">فیلتر بر اساس ماه</InputLabel>
          <Select
            labelId="month-filter-label"
            id="month-filter-select"
            value={selectedMonth.getMonth() + 1}
            onChange={(e) => setSelectedMonth(new Date(selectedMonth.setMonth(parseInt(e.target.value as string) - 1)))}
          >
            {monthNames.map((month, index) => (
              <MenuItem key={index + 1} value={index + 1}>{month}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => handleMonthChange('next')}>{'>'}</Button>
        <Button onClick={handleMenuOpen}>
          {selectedDate ? `${selectedDate.getDate()} ${daysOfWeek[selectedDate.getDay()]}` : 'انتخاب روز'}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {daysOfMonth.map(day => (
            <MenuItem key={day.getDate()} onClick={() => handleDaySelect(day.getDate())}>
              <ListItemText primary={day.getDate()} secondary={daysOfWeek[day.getDay()]} />
            </MenuItem>
          ))}
        </Menu>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="انتخاب تاریخ"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params: TextFieldProps) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      <TableContainer component={Paper} >
        <Table style={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>نام</TableCell>
              <TableCell>نام خانوادگی</TableCell>
              <TableCell>کد ملی</TableCell>
              <TableCell>زمان ثبت حاضری</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPeople.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{person.nationalCode}</TableCell>
                <TableCell>{formatDetectionTime(person.detectionTime)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NewPersonTable;
