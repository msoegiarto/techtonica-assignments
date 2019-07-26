/*
Epoch time or Unix time, also referred to as zero time, is represented by the date string 01 January, 1970 00:00:00 Universal Time (UTC), and by the 0 timestamp.
Unix time is stored as a signed 32-bit integer, end date will be 19 January 2038.
*/

const myBday = (year, month, date) => {
  const objDate = new Date();
  objDate.setDate(date);
  objDate.setMonth(month-1);
  objDate.setFullYear(year);
  console.log('timestamp = ' + Date.parse(objDate));

  const strDate = objDate.toString();
  console.log('string = ' + strDate);
  return strDate.substr(4,11);
}
const myBdayIn2020 = myBday(2020,5,13);
const myBdayIn2021 = myBday(2021,5,13);
const myBdayIn2022 = myBday(2022,5,13);
console.log('myBdayIn2020 = ' + myBdayIn2020);
console.log('myBdayIn2021 = ' + myBdayIn2021);
console.log('myBdayIn2022 = ' + myBdayIn2022);


const dateDiff = (dateArr1, dateArr2) => {

  const date1 = new Date(dateArr1[0], dateArr1[1]-1, dateArr1[2]);
  const date2 = new Date(dateArr2[0], dateArr2[1]-1, dateArr2[2]);

  // subtraction
  const dateDiffMillisecond = date1 - date2;
  console.log('dateDiffMillisecond = ' + dateDiffMillisecond);

  const dateDiffMin = Math.ceil(dateDiffMillisecond / (1000 * 60 * 60))
  console.log('dateDiffMin = ' + dateDiffMin);

  const dateDiffDays = Math.ceil(dateDiffMillisecond / (1000 * 60 * 60 * 24))
  console.log('dateDiffDays = ' + dateDiffDays);

  const dateDiffDateObject = new Date(dateDiffMillisecond);
  console.log('dateDiffDateObject = ' + dateDiffDateObject);

  // addition
  const dateAddMillisecond = date1 + date2;
  console.log('dateAddMillisecond = ' + dateDiffMillisecond);

  // code below will return invalid date because 
  // the resulting date will be greater than the end of epoch date
  const dateAddDateObject = new Date(dateAddMillisecond);
  console.log('dateAddDateObject = ' + dateAddDateObject);
}

dateDiff([2020, 5, 13], [2019, 5, 13]);