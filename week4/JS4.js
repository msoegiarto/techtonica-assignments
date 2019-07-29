const printVacations = input => {
  for (let i = 0; i < input.length; i++) {
    console.log(`${input[i][0]} really wants to go to ${input[i][1]}.`);
  }
}
printVacations([['Tammy', 'Tahiti'], ['Erin', 'Banff, Alberta, Canada'], ['Janet', 'London']]);

const printVacations2 = input => {
  for (let i = 0; i < input.length; i++) {
    const placesArray = input[i][1];
    let placesArrayReconstructed = '';

    for (let j = 0; j < placesArray.length; j++) {
      if (j === placesArray.length - 1) {
        placesArrayReconstructed += ` or `;
      } else if (j !== 0) {
        placesArrayReconstructed += `, `;
      }
      placesArrayReconstructed += `${placesArray[j]}`;
    }
    console.log(`${input[i][0]} is willing to go to ${placesArrayReconstructed}.`);

  }
}
printVacations2([['Tammy', ['Tahiti', 'Bali', 'Hawaii']], ['Erin', ['Banff, Alberta, Canada', 'Iceland']], ['Janet', ['London', 'Hogwarts']]]);

const printMultiplicationTable = (input) => {
  let head = '';
  let head2 = '';

  // head
  for(let i = 0; i <= input; i++){
    if(i === 0){
      head += `     `;
      head2 += `-----`
      continue;
    }
    head += `${i}    `;
    head2 += `-----`;
  }
  console.log(`Table of Multiplication`);
  console.log(``);
  console.log(head);
  console.log(head2);

  // body
  for(let i = 1; i <= input; i++) {
    let body = `${i}  | `;
    for(let j = 1; j <= input; j++){
      body += `${i*j}    `;
    }
    console.log(body);
  }
}
printMultiplicationTable(4);