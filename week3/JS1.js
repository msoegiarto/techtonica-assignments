function calculate(num1, operator, num2) {
  return calculate(num1, operator, num2, null);
}

function calculate(num1, operator, num2, num3) {

  const operatorType = /[\+\-\*\/\%\^]/;
  let errMsg = '';

  num1 = checkPI(num1);
  num2 = checkPI(num2);
  num3 = checkPI(num3);

  if (!num1 || isNaN(num1)) {
    errMsg += 'num1 is not number';
  }

  if (operator && operator !== 'sqrt' && (!num2 || isNaN(num2))) {
    if (errMsg !== '') errMsg += '\n';
    errMsg += 'num2 is not number';
  }

  if (!operator ||
    (operator.length === 1 && !operatorType.test(operator)) ||
    (operator.length > 1 && (operator.toLowerCase() !== 'sqrt' && operator.toLowerCase() !== 'pow'))) {
    if (errMsg !== '') errMsg += '\n';
    errMsg += 'operator is not recognized';
  }

  if (errMsg !== '') {
    return errMsg;
  }

  if (operator === '+') {
    if (num3 && !isNaN(num3)) {
      return num1 + num2 + num3;
    }
    return num1 + num2;
  } else if (operator === '-') {
    if (num3 && !isNaN(num3)) {
      return num1 - num2 - num3;
    }
    return num1 - num2;
  } else if (operator === '*') {
    if (num3 && !isNaN(num3)) {
      return num1 * num2 * num3;
    }
    return num1 * num2;
  } else if (operator === '/') {
    if (num3 && !isNaN(num3)) {
      return num1 / num2 / num3;
    }
    return num1 / num2;
  } else if (operator === '%') {
    if (num3 && !isNaN(num3)) {
      return num1 % num2 % num3;
    }
    return num1 % num2;
  } else if (operator.toLowerCase() === 'sqrt') {
    return Math.sqrt(num1);
  } else if (operator === '^' || operator.toLowerCase() === 'pow') {
    return Math.pow(num1, num2);
  }

  return 'oops, something went wrong';
}

function checkPI(number) {
  if (number && isNaN(number) && number.toLowerCase() === 'pi') {
    return Math.PI;
  }
  return number;
}

// console.log(calculate(4, 'sqrt', null, 2));
// console.log(calculate(4, 'pow', 2, 2));