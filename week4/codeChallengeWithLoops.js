// https://www.hackerrank.com/challenges/js10-loops/problem
function vowelsAndConsonants(s) {
  var vowelsRegex = /a|e|i|o|u/;
  var vowels = '';
  var consonants = '';
  for (var i = 0; i < s.length; i++) {
    if (s[i].match(vowelsRegex)) {
      vowels += s[i];
    } else {
      consonants += s[i];
    }
  }
  console.log(vowels + consonants);
}
vowelsAndConsonants('javascriptloops');
vowelsAndConsonants('thequickbrownfoxjumpsoverthelazydog');