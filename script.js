'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i, arr) {
    const typee = mov >= 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${typee}">
        ${i + 1}${typee}</div>
        <div class="movements__value    ">रु${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `रु${acc.balance}`;
};

// calDisplayBalance(account1.movements);

const DisplaySummary = function (accc) {
  const income = accc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `रु${income}`;

  const out = accc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `रु${Math.abs(out)}`;

  const intrest = accc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * accc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `रु${intrest}`;
};
// DisplaySummary(account1.movements);
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calDisplayBalance(acc);
  DisplaySummary(acc);
};
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    // displayMovements(currentAccount.movements);
    // calDisplayBalance(currentAccount);
    // DisplaySummary(currentAccount);
    updateUI(currentAccount);
    inputLoginPin.value = '';
    inputLoginUsername.value = '';
    inputLoginPin.blur();
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const receiveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// const calPrintBalance = function (movements) {
//   movements.forEach(accc);
//   {
//     accc.balance = accc.movements.reduce((acc, mov) => acc + mov, 0);
//   }
// };

// console.log(accounts);

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],erallmov = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallmov);

// const overallmov2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc +
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = [1, 2, 3, 4];
// console.log(arr.slice(2, 3));
// console.log(arr.slice(1, -1));
// console.log(arr.slice());
// console.log([...arr]);

//splice
// console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);

// arr.reverse();

// console.log(arr);

// const arr1 = [5, 6, 7];
// console.log(arr.concat(arr1));

// console.log([...arr, ...arr1]);
// console.log(arr.join('-'));

// console.log(arr.at(-1));

// const movements = [100, 20, -200, 300, -400, 500];
// console.log(movements.at(-1));
// movements.forEach(function (movement, key, arr) {
//   if (movement > 0) {
//     console.log(`${key}Positive${movement}`);
//   } else {
//     console.log(`Positive${Math.abs(movement)}`);
//   }
// });

// // const city = new Map([
// //   ['USA', 'Newyork'],
// //   ['Nepal', 'Kathmandu'],
// //   ['India', 'Delhi'],
// // ]);
// // console.log(city);

// // city.forEach(function (cities, country, map) {
// //   console.log(`${country}:${cities}`);
// // });

// const country = new Set(['Usa', 'Nepal', 'india']);
// console.log(country);

// country.forEach(function (count, _, set) {
//   console.log(count);
// });
// const isPrime = function (numb) {
//   let a = 0;
//   for (let i = 2; i <= Number(numb) / 2; i++) {
//     if (Number(numb) / i === 0) {
//       a++;
//     }
//   }
//   if (a > 0) {
//     return 0;
//   } else {
//     return numb;
//   }
// };

// const arr = [4, 5, 6, 7, 8, 9, 10];
// let sum = 0;
// for (let i = 0; i < arr.length - 1; i++) {
//   console.log(isPrime(arr[i]));
// }

// console.log(sum);

/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog
🐶 number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far 😉

*/

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];
// // Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

// const checkDogs = function (dogsJulia, dogsKate) {
//   const juliacorrected = dogsJulia.slice(1, 3);
//   const allDogs = juliacorrected.concat(dogsKate);
//   allDogs.forEach(function (age, i) {
//     age >= 3
//       ? console.log(
//           `Dog🐶 number ${i + 1} is an adult, and is ${age} years old`
//         )
//       : console.log(
//           `Dog🐶 number ${i + 1} is still puppy, and is ${age} years old`
//         );
//   });
// };
// checkDogs(dogsJulia, dogsKate);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;
// const movementsUsd = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
// const movementsUsd = movements.map(mov => mov * eurToUsd);
// console.log(movements);
// console.log(movementsUsd);

// const me = () => console.log(hello);

// const movementDescription = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposoted' : 'withdrew'} ${Math.abs(
//       mov
//     )}`
// );

// console.log(movementDescription);

// const deposite = movements.filter(function (mov) {
//   return mov > 0;
// });
// const withdrawal = movements.filter(mov => mov < 0);
// console.log(deposite);
// console.log(withdrawal);

// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance);

// let peoples = {
//   fname: 'regish',
//   lname: 'shrestha',
//   age: 19,
//   address: 'Satungal',
//   calAge: function () {
//     console.log(this.age);
//   },
// };
// console.log(peoples);
// console.log(peoples.age);
// console.log(peoples.fname + ' ' + peoples.lname);
// peoples.calAge();

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const dogJulia = [5, 2, 4, 1, 15, 8, 3];
// const dogKate = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (dogs) {
//   const dogage = dogs.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   console.log(dogage);
//   const adult = dogage.filter(age => age >= 18);
//   console.log(adult);
//   const avgAge = adult.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   console.log(avgAge);
// };
// calcAverageHumanAge(dogJulia);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const firstWithDrawal = movements.find(mov => mov > 0);
// console.log(firstWithDrawal);

// const eurotoUsd = 1.1;
// const totalDepositeToUsd = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurotoUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositeToUsd);

/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// const calcAverageHumanAge = dogs =>
//   dogs
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// return avgage;
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const account = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');
// console.log(account);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const anyDeposite = movements.some(mov => mov > 0);
// console.log(anyDeposite);

// console.log(movements.includes(200));

// // const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// const arr = [[[1, 2], 3], [[4, 5], 6], 7, 8];

// console.log(arr.flat(2));

// const accMovements = accounts.map(acc => acc.movements);
// console.log(accMovements);

// const allmov = accMovements.flat();
// console.log(allmov);

// const overallmov = allmov.reduce((acc, mov) => acc + mov, 0);
// console.log(overallmov);

// const overallmov = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallmov);

// const overallmov2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallmov2);

// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });erallmov = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallmov);

// const overallmov2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc +
// console.log(movements);
// movements.sort((a, b) => {
//   return a - b;
// });
// console.log(movements);

// const arr = [1, 2, 3, 4, 5];
// // const arr = new Array(8);
// console.log(arr);
// // arr.fill(1);
// arr.fill(11, 1, 4);
// console.log(arr);

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 8 }, (_, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('रु', ''))
//   );
//   console.log(movementsUI);
// });

// const bankDepositeSum = accounts.map(acc => acc.movements).flat();
const bankDepositeSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, curr) => sum + curr, 0);

console.log(bankDepositeSum);

// const bankDeposite1000 = accounts
// .flatMap(acc => acc.movements)
// .filter(mov => mov > 1000).length;
const bankDeposite1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);

console.log(bankDeposite1000);

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (ssum, curr) => {
      curr > 0 ? (ssum.desposits += curr) : (ssum.withdrawal += curr);
      return ssum;
    },
    { desposits: 0, withdrawal: 0 }
  );

console.log(sums);

/*
Coding Challenge #4
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Forumla:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);
/*
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓
*/
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah dog eat too ${
    dogSarah.curFood > dogSarah.recFood ? 'MUCH' : 'LITTLE'
  }.`
);
/*
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
*/
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);
/*
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
*/
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little`);

/*
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
*/
console.log(dogs.some(dog => dog.curFood === dog.recFood));
/*
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
*/
const checkEatingOk = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOk));
/*
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
*/
console.log(dogs.filter(checkEatingOk));
/*
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)
*/
console.log(dogs.slice().sort((a, b) => a.recFood - b.recFood));
/*
Hints:
§
Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§
Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
Test data:
const dogs = [
{ weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
{ weight: 8, curFood: 200, owners: ['Matilda'] },
{ weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
{ weight: 32, curFood: 340, owners: ['Michael'] },
];
GOOD LUCK 😀
*/
