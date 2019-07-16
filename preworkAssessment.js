// Welcome to the prework assessment!

// Exercise 1. Declare a variable called animal and give it a value of your choice
const animal = "t-rex";

// Exercise 2. Write a conditional that does the following:
// If the value of animal is "lion", print to the console "I'm scared!"
// If the value of animal is "dog", print to the console "So cute"
// If the value of animal is "frog", print to the console "Ribbit ribbit"
// For any other value, print "Just another animal"
console.log( animal === "lion" ? "I'm scared!" : animal === "dog" ? "So cute" : animal === "frog" ? "Ribbit ribbit" : "Just another animal");

// Exercise 3. Declare 2 variables called person1Age and person2Age and give them values of your choice.
// Write a conditional that does the following:
// If both ages are less than 18, print "You are both children"
// Otherwise, print "At least one adult here" 
const person1Age = 12;
const person2Age = 47;
console.log(person1Age < 18 && person2Age < 18 ? "You are both children" : "At least one adult here");

// Exercise 4. Write a for loop that prints the integers starting 
// at 20, and counts down to 10. (Include 20 and 10)
for(let i = 20; i >= 10; i--) {
  console.log(i);
}

// Exercise 5. Write a while loop that prints the multiples of 5 from 5 to 50 inclusive 
// (i.e. 5, 10, 15, 20 ...)
let ctr = 0;
while (ctr < 50) {
  ctr += 5;
  console.log(ctr);
}

// Exercise 6. Declare a variable called 'flavors' that is an array of 3 ice cream flavors
const flavors = ["vanilla", "chocolate", "strawberry"];

// Exercise 7. Update the second element of the array to be a different value
flavors[1] = "mint";

// Exercise 8. Add 2 more items to the array
flavors.push("coconut", "mango");

// Exercise 9. Write a function called multiply that takes in 3 numbers, and returns
// the product of the 3 numbers multiplied together
const exercise9 = (a, b, c) => a * b * c;

// Exercise 10. Write a function that takes in an integer. The function should print all
// integers from 1 to that number. Next to each one it should print whether 
// it is even or odd. For example, if the number is 4, print:
// 1 odd
// 2 even
// 3 odd
// 4 even
const exercise10 = n => {
  for(let i = 1; i <= n; i++) {
    console.log( i % 2 ? `${i} odd` : `${i} even`);
  }
}


// Exercise 11. Make an object called pet that contains 2 properties:
// animal (representing what type of animal the pet is)
// age (representing the age of the pet)
const pet = {
  animal: "dog",
  age: 2
};

// Exercise 12. Print the pet's age
console.log(pet.age);

// Exercise 13. Update pet's age to be a different value
pet.age = 4;

// Exercise 14. In the comments below, write a sentence explaining what each of the following data types are.
// String = a string text consists of letters/numbers/special characters/white spaces.
// Number = numeric value on which mathematical function can be carried out. It can be positive or negative, whole number or fraction.
// Boolean = consists of 2 possible values, true and false.
// Array = a collection of data which can be accessed using numbered index.
// Object = a collection of data which can be accessed using named index.
// undefined = occurs when user doesn't specify a datatype to an empty variable.

//Exercise 15 Add. a new file to the $PATH environmental variable
//export PATH=$PATH:/put/a/path/here/

//Exercise 16. Please explain how the internet works. Your answer should include answers to the following questions: 

// How are the devices on the internet physically connected to each other?
//The devices on the internet are physically connected to each other by using copper wires, fiber optic cables, and/or radio waves.

// How is information physically transmitted from device to device?
//Information is physically transmitted from device to device by having the information made into bits and send those bits using electricity, light or radio waves.

// How does one device find another it’s trying to communicate with?
//One device find another it's trying to communicate with by using IP address. Every device connected to the internet has IP address and every time a device send or request information, the device includes the IP addresses of itself and the other device.

// What methods do devices on the internet use to communicate?
//Devices on the internet communicate to each other by using protocols.

// The following questions are bonus questions! Only work on them once you’ve finished all other questions.


// Bonus 1. Write a function that takes in a string and returns the number of times the 
// character "a" appears in the string.
const bonus1 = s => s.match(/a|A/g).length;

// Bonus 2. Write a function that takes a string and returns which character appears the 
// most times in the string.
const bonus2 = s => {
  const obj = {};
  let max = 0;
  let temp = '';

  for(let i = 0; i < s.length; i++) {
    let charAt = s[i];
    if(charAt === ' ') continue;
    obj[charAt] = obj[charAt] == null || obj[charAt] == undefined ? 1 : obj[charAt]+=1;
  }
  
  for(let i in obj) {
    if(obj[i] > max){ 
      max = obj[i];
      temp = i;
    }
  }

  return temp;
}