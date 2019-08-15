const validateInputIsString = input => {
  return (input || typeof input === 'string');
}

// Write a function that takes a word and returns true if the word ends with tonica
const function1 = inputString => {
  if (!validateInputIsString(inputString)) return 'Input is invalid';

  const matchPattern = /tonica$/;

  return matchPattern.test(inputString);
}
console.log(function1('techtonica'));
console.log(function1('tonicatech'));
console.log(function1('tetochnica'));

// Write a function expression that takes a string replaces all instances of symantec with semantic?
const function2 = inputString => {
  if (!validateInputIsString(inputString)) return 'Input is invalid';

  const matchPattern = /symantec/;
  const newWord = 'semantic';

  return inputString.replace(matchPattern, newWord);
}
console.log(function2('the word symantec'));
console.log(function2('symantec is the word'));
console.log(function2('is symantec a word?'));

// Write a function that takes a string and deletes all words that end in ing?
const function3 = inputString => {
  if (!validateInputIsString(inputString)) return 'Input is invalid';

  const matchPattern = /\w+[i][n][g]([^\w]|$)/g;

  return inputString.replace(matchPattern, '');
}
console.log(function3('i am going to try using chopsticks'));
console.log(function3('ingram aringa eating'));

// Write a function that takes a string and returns true if it is an email address? 
// Compare your answer with your neighbor.
const function4 = inputString => {
  if (!validateInputIsString(inputString)) return 'Input is invalid';

  const matchPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+\.\w+/;

  return matchPattern.test(inputString);
}
console.log(function4('bac0n@ch33se.pizza'));
console.log(function4('my.email@email.com'));
console.log(function4('myemail@email'));
console.log(function4('myema!l@email.com'));

// Write a function that takes a string containing names separated by commas like
// "Leah, Russell, Michelle" and returns an array of names, ["Leah", "Russell", "Michelle"]
const function5 = inputString => {
  if (!validateInputIsString(inputString)) return 'Input is invalid';

  const matchPattern = /,\s?/;

  return inputString.split(matchPattern);
}
console.log(function5('Leah, Russell, Michelle'));