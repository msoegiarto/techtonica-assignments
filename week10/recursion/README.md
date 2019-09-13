# Recursion

made for [this](https://github.com/Techtonica/curriculum/blob/master/recursion/recursion.md) assignment

#### Independent practice

1. Palindrome

    const isPalindrome = input => {
      if (input[0] === input[input.length - 1]) {
        if (input.length > 1) {
          const str = input.substring(1, input.length - 1);
          isPalindrome(str);
        }
        return true;
      }
      return false;
    }

#### Challenges

1. Factorial

    const doFactorial = input => {
      if (input === 1) return 1;
      return input * doFactorial(input - 1);
    }

2. Fibonacci

    const fib = input => {
      if(input === 0 || input === 1) return 1;
      return (fib(input - 1) + fib(input - 2));
    }

3. GCD

    const doGCD = input => (y === 0 ? x : doGCD(y, x % y));

#### Check for understanding

fun1(1, 1) // return 2
fun1(2, 1) // return 4
fun1(2, 2) // return 5
fun1(0, 2) // return 2
