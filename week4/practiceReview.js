// Challenge 1 -> runtime complexity O(n)
const metersToInches = input => 39.3701 * input;
// consolr.log('metersToInches 0 = ' + metersToInches(0));
// consolr.log('metersToInches 1 = ' + metersToInches(1));
// consolr.log('metersToInches 1.5 = ' + metersToInches(1.5));
// consolr.log('metersToInches 15.6 = ' + metersToInches(15.6));

// Challenge 2 -> runtime complexity O(n)
const loopThrough = input => {
  for (let i = 0; i < input; i++) {
    console.log(`Hello World`);
  }
}
// console.log('loopThrough 0 = ' + loopThrough(0));
// console.log('loopThrough 1 = ' + loopThrough(1));
// console.log('loopThrough 3 = ' + loopThrough(3));

// Challenge 3 -> runtime complexity O(n)
const calculateSum = input => {
  let sum = 0;
  for (let i = 0; i <= input; i++) {
    sum += i;
  }
  return sum;
}
// console.log('calculateSum 0 = ' + calculateSum(0));
// console.log('calculateSum 1 = ' + calculateSum(1));
// console.log('calculateSum 6 = ' + calculateSum(6));
// console.log('calculateSum 10 = ' + calculateSum(10));

// Challenge 4 -> runtime complexity O(n)
const fizzbuzz = input => {
  for (let i = 1; i <= input; i++) {
    if (i % 15 === 0) {
      console.log(`FizzBuzz`);
    } else if (i % 3 === 0) {
      console.log(`Fizz`);
    } else if (i % 5 === 0) {
      console.log(`Buzz`);
    } else {
      console.log(i);
    }
  }
}
// console.log('fizzbuzz 0 = ' + fizzbuzz(0));
// console.log('fizzbuzz 16 = ' + fizzbuzz(16));

// Challenge 5 -> runtime complexity O(n)
const calculateFactorialNumber = input => {
  let product = 1;
  for (let i = input; i >= 1; i--) {
    product *= i;
  }
  return product;
}
// console.log('calculateFactorialNumber 3 = ' + calculateFactorialNumber(3));
// console.log('calculateFactorialNumber 10 = ' + calculateFactorialNumber(10));

// Challenge 6 -> runtime complexity O(n)
const sleep_in = (weekday, vacation) => {
  switch (vacation || !weekday) {
    case true:
      return true;
  }
  return false;
}
// console.log('sleep_in false,false = ' + sleep_in(false, false));
// console.log('sleep_in true,false = ' + sleep_in(true, false));
// console.log('sleep_in false,true = ' + sleep_in(false, true));

// Challenge 7 -> runtime complexity O(n)
const common = (a, b) => a[0] === b[0] || a[a.length - 1] === b[b.length - 1];

// console.log('common [1,2,3][7,3] = ' + common([1, 2, 3], [7, 3]));
// console.log('common [1,2,3][7,3,2] = ' + common([1, 2, 3], [7, 3, 2]));
// console.log('common [1,2,3][1,3] = ' + common([1, 2, 3], [1, 3]));

// Challenge 8 -> runtime complexity O(n)
// 1. Create an object with two key-value pairs.
const mega = {
  favoriteFood: 'ice cream',
  favoriteColor: 'red'
}
// 2. Log that object to the console.
console.log(mega);
// 3. Delete the first key-value pair in the object.
delete mega.favoriteFood;
// 4. Log that object to the console again. The first key-value pair should be gone.
console.log(mega);

// Challenge 9 -> runtime complexity O(n)
// 1. Create an array of objects with at least 2 key value pairs. The objects should all have the same keys, and the array should contain at least 3 objects.
const arrayOfObjects = [
  {
    name: 'Fighter1',
    atk: 10,
    def: 4
  },
  {
    name: 'Fighter2',
    atk: 5,
    def: 9
  },
  {
    name: 'Fighter3',
    atk: 2,
    def: 13
  }
];
// 2. Create a function that accepts the array of objects as an argument.
const fight = array => {

  for (let i = 0; i < array.length; i++) {

    const obj = array[i];

    // 3. Print the value of the second key in each object to the console. Use dot-notation to access the values.
    console.log('old value = ' + obj.atk);

    // 4. After printing the values in step 3, change the values of the second key in every object to something new.
    let randomNumber = Math.floor(Math.random() * (15 - obj.atk + 1)) + obj.atk;
    obj.atk = randomNumber;

    // 5. Prove the change worked by printing the second key in each object to the console, which should show the new value. Use bracket-notation to access the values this time.
    console.log('new value = ' + obj['atk']);
  }

}
// fight(arrayOfObjects);






// var Jasmine = require('jasmine');
// var jasmine = new Jasmine();
// describe('metersToInches()', function () {
//   it('converts meters to inches', function () {
//     expect(metersToInches(0)).toBe(1);
//   });

//   it('converts meters to inches', function () {
//     expect(metersToInches(1)).toBe(39.3701);
//   });

// });
// jasmine.execute();