const add = (string) => {

  if (!string) return 0;

  const delimiter = getDelimiter(string);
  // console.log('delimiter = ' + delimiter);

  const strArr = string.split(delimiter);
  // console.log('strArr = ' + strArr);

  let sum = 0;
  let negNumber = '';

  for (let i = 0; i < strArr.length; i++) {
    // console.log(strArr[i]);

    const number = getNumber(strArr[i]);
    // console.log('number = ' + number);
    
    if (number >= 0) {
      sum += number;
    } else {
      negNumber += number + ' ';
    }
  }

  if (negNumber) {
    throw 'negatives not allowed ' + negNumber;
  }

  return sum;
}

const getDelimiter = (string) => {
  const checkDelim = string.substring(0, 2).includes('//');
  if (checkDelim) {
    return string.substring(2, 3);
  }
  return ',';
}

const getNumber = (str) => {
  let number = 0;
  if (str.includes('\n')) {
    const num1 = str.split('\n')[0];
    const num2 = str.split('\n')[1];

    if (!num1 && !num2) return number;

    if (num1) number += parseInt(num1)
    if (num2) number += parseInt(num2);
  } else {
    if (!parseInt(str)) return number;

    number = parseInt(str)
  }

  return number;
}

console.log(add('1,\n,4'));
console.log(add('//;\n1;2'));
console.log(add('//;\n1;2;-2;-1'));