// START JS1 CALCULATE
const calculate = (num1, operator, num2) => {
  return calculate2(num1, operator, num2, null);
}

const calculate2 = (num1, operator, num2, num3) => {

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

  switch (operator) {
    case '+':
      if (num3 && !isNaN(num3)) {
        return num1 + num2 + num3;
      }
      return num1 + num2;
    case '-':
      if (num3 && !isNaN(num3)) {
        return num1 - num2 - num3;
      }
      return num1 - num2;
    case '*':
      if (num3 && !isNaN(num3)) {
        return num1 * num2 * num3;
      }
      return num1 * num2;
    case '/':
      if (num3 && !isNaN(num3)) {
        return num1 / num2 / num3;
      }
      return num1 / num2;
    case '%':
      if (num3 && !isNaN(num3)) {
        return num1 % num2 % num3;
      }
      return num1 % num2;
    case 'sqrt':
      return Math.sqrt(num1);
    case '^':
    case 'pow':
      return Math.pow(num1, num2);
    default:
      return 'oops, something went wrong';
  }
}

function checkPI(number) {
  if (number && isNaN(number) && number.toLowerCase() === 'pi') {
    return Math.PI;
  }
  return number;
}
// console.log(calculate(4, 'sqrt', null, 2));
// console.log(calculate(4, 'pow', 2, 2));

// END JS1 CALCULATE



// START JS3 MOVIENIGHT
function movieNight (input) {
  const nameObj = {
    priya: 'Priya',
    ming: 'Ming',
    david: 'David',
    alex: 'Alex',
    breanna: 'Breanna'
  };

  for(let i = 0 ; i < input.length; i++){
    const name = input[i].toLowerCase();
    switch(name === nameObj.david.toLowerCase()){
      case true:
        return [nameObj.david, nameObj.alex, nameObj.breanna];
    }
  }

  return [nameObj.priya, nameObj.ming, nameObj.breanna];
}
// console.log(movieNight(['Priya', 'David', 'Alex']));
// console.log(movieNight(['pRiya', 'dAvid', 'Ming']));
// console.log(movieNight(['PrIya', 'Breanna', 'aLex']));
// console.log(movieNight(['PriYa', 'bReanna', 'mIng']));
// console.log(movieNight(['breaNNa', 'alEx', 'miNg']));
// console.log(movieNight(['daVid', 'brEanna', 'aleX']));
// console.log(movieNight(['davId', 'aLeX', 'minG']));
// console.log(movieNight(['aLEx', 'MinG', 'P']));
// console.log(movieNight(['daviD', 'breannA', 'MiNg']));
// END JS3 MOVIENIGHT



// START HACKERRANK CHALLENGES
function challenge1(num) {
  switch (num) {
    case 1:
      console.log('ONE');
      break;
    case 2:
      console.log('TWO');
      break;
    case 3:
      console.log('THREE');
      break;
    case 4:
      console.log('FOUR');
      break;
    case 5:
      console.log('FIVE');
      break;
    case 6:
      console.log('SIX');
      break;
    case 7:
      console.log('SEVEN');
      break;
    case 8:
      console.log('EIGHT');
      break;
    case 9:
      console.log('NINE');
      break;
    default:
      console.log('PLEASE TRY AGAIN');
  }
}

function getLetter(s) {
  let letter;
  // Write your code here
  const s1 = s[0];
  switch ("aeiou".includes(s1)) {
    case true:
      letter = 'A';
  }
  switch ("bcdfg".includes(s1)) {
    case true:
      letter = 'B';
  }
  switch ("hjklm".includes(s1)) {
    case true:
      letter = 'C';
  }
  switch ("npqrstvwxyz".includes(s1)) {
    case true:
      letter = 'D';
  }
  return letter;
}
// console.log(getLetter('adfgt'));

// END HACKERRANK CHALLENGES