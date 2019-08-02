/* 
Read the following functions. For each one, figure out:
- What does the function do? 
- Try to figure out the runtime -- O(1), O(log n), O(n), O(n log n), O(n^2), or O(2^n)
- Run the function with a few different input sizes and see how long it takes
- When the input size doubles, what happens to the time it takes to run?
*/


const mysteryFunction0 = function(array) {
  const myFavoriteNum = 7;
  for (i = 0; i < array.length; i++) {
    if (array[i] === myFavoriteNum) {
      return true;
    }
  }
  return false;
}
// the function will go through each element of the input array
// and try to match the value of the element with a certain number (myFavoriteNum)
// runtime = O(n)


const mysteryFunction1 = function(array) {
  index = 4;
  return array[index];
}
// the function will return the value of the 4th index of the array
// runtime = O(1)


var mysteryFunction2 = function(n) {
  let primes = []
  for (i = 2; i < n; i++) {
    let factorFound = false;
    for (j = 2; j < n; j++) {
      if (i % j == 0) {
        factorFound = true;
      }
    }
    if (factorFound === false) {
      primes.push(i);
    }
  }
  return primes.length;
}
// the function will compute the remainder of a range of number starting from 2 until n
// if remainder not found on a number, that number will be added to the array `primes`
// since i will be operated on j (j will be 2 until n), `factorFound` will always be true, `primes` length will always 0
// runtime = O(n^2)


const mysteryFunction3 = function(array) {
  myLength = array.length;
  if (myLength % 2 == 0) {
    return "even length";
  } else {
    return "odd length";
  }
}
// the function will analyze whether the length of the input array is odd or even
// runtime = O(1)


var mysteryFunction4 = function(string) {
  let eCount = 0;
  for (i = 0; i < string.length; i++) {
    if (string[i] === 'e') {
      eCount++;
    }
  }
  return eCount;
}
// the function will count how many 'e' found in an input string
// runtime = O(n)


var mysteryFunction5 = function(array) {
  array.sort();
}
// the function will sort the input array in ascending order using standard build-in library
// runtime = O(n log n)


const mysteryFunction6 = function(dict, key) {
  var value = dict[key];
  return value;
}
// the function will return the value of the object 'dict' at the property/key 'key'
// runtime = O(1)

const mysteryFunction7 = function(array) {
  // Assume `array` is an array of ints sorted from smallest to biggest
  const lookingFor = 9;
  let lowerBound = 0;
  let upperBound = array.length - 1;
  let guessIndex = Math.floor(upperBound / 2);
  while (lowerBound <= upperBound) {
    if (array[guessIndex] === lookingFor) {
      return true;
    } else if (lookingFor < array[guessIndex]) {
      upperBound = guessIndex - 1;
    } else {
      lowerBound = guessIndex + 1;
    }
    guessIndex = Math.floor((lowerBound + upperBound) / 2);
  }
  return false;
}
// the function will check whether the input array contains a certain number (lookingFor) using binary search
// runtime = O(log n)


const mysteryFunction8 = function(dictionary) {
  for(var key in dictionary) {
    var value = dictionary[key];
    if (key == value) {
      return true;
    }
    return false;
  }
}
// the function will check whether the key and value of the input object are the same. 
// The function will only check up to the first key-value pair
// runtime = O(1)