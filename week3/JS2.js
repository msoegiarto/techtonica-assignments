const input = ['psyduck', 'jigglypuff', 'vulpix'];

function printCuteAnimals(array){
  console.log('array : ' + array);
  console.log('it\'s length : ' + array.length)
  console.log('\n');
  array.pop();
  console.log('array after pop : ' + array);
  console.log('\n');
  array = array.concat(['eevee','magikarp']);
  console.log('array after concat : ' + array); console.log('it\'s length : ' + array.length);
  console.log('\n');

  // start challenge

  // send pikachu to frontline after psyduck
  array.splice(1, 0, 'pikachu'); 
  console.log('challege1 : ' + array);
  // magikarp cant fight, switch with cubone
  array.splice(4, 1, 'cubone'); 
  console.log('challege2 : ' + array);
  // all pokemon dead, except jigglypuff
  array = array.slice(2,3); 
  console.log('challege3 : ' + array);


  return array;
}

printCuteAnimals(input);