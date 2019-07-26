/*
  Based on the logic described, there are 2 groups:
  1. David and Alex
  2. Priya and Ming
  Other combinations between these 4 people will NEVER happen and the key person is DAVID.

  Whether David goes or doesn't go will decide the 2 possible outputs:
  1. David, Alex, Breanna
  2. Priya, Ming, Breanna
*/
function movieNight (input) {

  const nameObj = {
    priya: 'Priya',
    ming: 'Ming',
    david: 'David',
    alex: 'Alex',
    breanna: 'Breanna'
  };

  if(!input || !Array.isArray(input) || input.length === 0){ 
    return 'no one is going to the movie';
  }

  const input1 = input[0].toLowerCase();
  const input2 = input[1].toLowerCase();
  const input3 = input[2].toLowerCase();

  if (input1.toLowerCase() === nameObj.david.toLowerCase() || 
    input2.toLowerCase() === nameObj.david.toLowerCase() || 
    input3.toLowerCase() === nameObj.david.toLowerCase() ) {
    return [nameObj.david, nameObj.alex, nameObj.breanna];
  } else {
    return [nameObj.priya, nameObj.ming, nameObj.breanna];
  }
}

console.log(movieNight(['Priya', 'David', 'Alex']));
console.log(movieNight(['pRiya', 'dAvid', 'Ming']));
console.log(movieNight(['PrIya', 'Breanna', 'aLex']));
console.log(movieNight(['PriYa', 'bReanna', 'mIng']));
console.log(movieNight(['breaNNa', 'alEx', 'miNg']));
console.log(movieNight(['daVid', 'brEanna', 'aleX']));
console.log(movieNight(['davId', 'aLeX', 'minG']));
console.log(movieNight(['aLEx', 'MinG', 'P']));
console.log(movieNight(['daviD', 'breannA', 'MiNg']));
console.log(movieNight(['P', 'dAvId', 'bReanna']));
console.log(movieNight([]));
console.log(movieNight('test'));
