// https://www.hackerrank.com/challenges/js10-loops/problem
function vowelsAndConsonants(s) {
  var vowelsRegex = /a|e|i|o|u/;
  var vowels = '';
  var consonants = '';
  var result;
  for (var i = 0; i < s.length; i++) {
    if (s[i].match(vowelsRegex)) {
      vowels += s[i];
    } else {
      consonants += s[i];
    }
  }
  result = vowels + consonants;
  for(var j = 0; j < result.length; j++){
    console.log(result[j]);
  }
}
vowelsAndConsonants('javascriptloops');
// vowelsAndConsonants('thequickbrownfoxjumpsoverthelazydog');