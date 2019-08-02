/*
Compare the following pieces of code that have the same functionality.
For each function:
- How does it work?
- What is the runtime complexity of the function?
Which solution would be fastest for large input sizes?
*/


// The following 4 functions all look for duplicated elements in an array.
// For example, if the input is [5,2,4,5,4], the function should return [5,4] 
// because those elements are in the array twice.

const findDuplicatesA = (array) => {
  const duplicated = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i+1; j < array.length; j++) {
      if (array[i] === array[j]) {
        duplicated.push(array[j]);
      }
    }
  }
  return duplicated;
}
// n |  sample input | iterate
// --|---------------|----------------
// 2 |  [1]          | 1         = 1  
// 3 |  [1,1,1]      | 2+1       = 3  
// 4 |  [1,1,1,1]    | 3+2+1     = 6  
// 5 |  [1,1,1,1,1]  | 4+3+2+1   = 10 
// 6 |  [1,1,1,1,1,1]| 5+4+3+2+1 = 15 

// for each element of the array, the function will compare it to the next element
// if duplicate is found, the value will be added into array `duplicated`
// iteration will run `(n-1)+(n-2)+....+1` times, with n being the length of the input array (asuming array minimum has 2 elements)
// runtime complexity = O(n) < O(n^2)


const findDuplicatesB = (array) => {
  const seen = new Set();
  const duplicates = new Set();
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (seen.has(value)) {
      duplicates.add(value);
    }
    seen.add(value);
  }
  return duplicates;
}

const findDuplicatesC = (array) => {
  array.sort();
  const duplicates = [];
  for (let i = 0; i < array.length - 1; i++) {
    const item = array[i];
    const nextItem = array[i + 1];
    if (item === nextItem) {
      duplicates.push(item);
    }
  }
  return duplicates;
}
//O(2n log n)

const findDuplicatesD = (array) => {
  const duplicated = [];
  const seen = [];
  for (let search = 0; search < array.length; search++) {
    const item = array[search];
    if (seen.indexOf(item) !== -1) {
      duplicated.push(item);
    }
    seen.push(item);
  }
  return duplicated;
}


// The following 3 functions all count how many times an item is in an array 
// and return a dictionary of the counts
// For example, if the input is [5,2,4,5,4,5], the function should return {5:3, 4:2, 2:1} 

const countOccurencesA = (array) => {
  const counts = {};
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (counts[item] === undefined) {
      let countForI = 0;
      for (let j = 0; j < array.length; j++) {
        if (array[j] === item) {
          countForI++;
        }
      }
      counts[item] = countForI;
    }
  }
  return counts;
}
// O(n^2)

const countOccurencesB = (array) => {
  const counts = {};
  array.sort();
  let previousItem = undefined;
  let itemCount = 0;
  let currentItem;
  for (let i = 0; i < array.length; i++) {
    currentItem = array[i];
    if (currentItem === previousItem) {
      itemCount++;
    } else {
      counts[currentItem] = itemCount;
      previousItem = currentItem;
      itemCount = 1;
    }
  }
  counts[currentItem] = itemCount;
}
//O(2n log n)

const countOccurencesC = (array) => {
  const counts = {};
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (counts[item] === undefined) {
      counts[item] = 0;
    }
    counts[item] += 1;
  }
  return counts;
}
//O(n)