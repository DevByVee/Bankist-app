'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Vicky Kent',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: premium,
};

const account2 = {
  owner: 'Jessica Kent',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: standard,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: premium,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: basic,
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

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}
      </div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); 
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + Math.abs(mov), 0);
  labelSumOut.textContent = `${out}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = function (acc) {
  acc.forEach(function (acc) { 
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  });
  
}
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcPrintBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
}

// EVENT HANDLERs
let currentAccount;

// LOGIN
btnLogin.addEventListener('click', function (event) {
  // Prevent form from submitting
  event.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome message and UI
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    updateUI(currentAccount);// Update UI
  }
  
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount)
  };
});

btnLoan.addEventListener('click', function (e) { 
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) { 
    // Add loan
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
 
  if (currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)) {

    const index = accounts.findIndex(acc => acc.username === currentAccount.username);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // Goodbye message
    labelWelcome.textContent = `Goodbye, ${currentAccount.owner.split(' ')[0]}`;
  };

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})






















/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Array Methods
/*
let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE Method
// We can extract parts of an array without changing the original array

console.log(arr.slice(2)); // brings out the items in the array starting from postion 2
console.log(arr.slice(2, 4)); // brings out the items in the array starting from position 2 and ending at position 4
console.log(arr.slice(-2)); // The last two elements of the array
console.log(arr.slice(-1));
console.log(arr.slice(1, -2)); // starts extracting from postion one and stop before the last two
console.log(arr.slice()); // can be used to create shallow copies too
console.log([...arr]);


// SPLICE Method
// We can add or remove items from an array but it changes the original array

// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr); // extracted elements are gone. splice deleted the rest elements

// REVERSE
// It reverses an array
// Also mutates the arrays too
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f']
console.log(arr2.reverse());
console.log(arr2);




// CONCAT
// It combines two arrays
// It doesn't mutate the original array
const letters = arr.concat(arr2)
console.log(letters);
console.log([...arr, arr2]);

// JOIN
console.log(letters.join(' - '));

// AT Method
const arr = [23, 11, 64];
console.log(arr[0]); // older
console.log(arr.at(0)); // new

console.log(arr[arr.length - 1]); // getting the last element of an array (before)
console.log(arr.slice(-1)[0]); // or using slice method
console.log(arr.at(-1)); // using the at method (newer method)

// AT Method also works on strings
console.log('Vicky'.at(0)); 
console.log('Vicky'.at(-1));




const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for(const [i, movement] of movements.entries()) { // getting the current element using index
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`); // Maths.abs takes the absolute value
  }
}

// LOOPING OVER ARRAYS USING THE FOREACH METHOD
// loops over an array and executes the callback function and passes in the current element of the array after each iteration
movements.forEach(function (movement, i, arr) { // first element has to be the element before the index
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); 
  }
})
// 0: function(200)
// 1: function(450)
// 2: function(400)
// etc

// Difference between foreach and forof loop is that
// You cannot break out of a foreach loop
// continue and break statements do not work in a for each loop




// FOREACH WITH MAPS AND SETS

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
})

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  // console.log(`${key}: ${value}`); // Set doesn't have keys or indexes
  console.log(`${value}: ${value}`);
  // When using .forEach() on a Set, the second argument is redundant, and you only need the value.
})

currenciesUnique.forEach(value => console.log(value));


/*
Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 yearsold.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy🐶 ")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const Julia = [3, 5, 2, 12, 7];
const Kate = [4, 1, 15, 8, 3];
const checkDogs = function (dogsJulia, dogsKate) {
  const newjulia = dogsJulia.slice()
  newjulia.splice(0, 1)
  newjulia.splice(-2);
  const allDogs = newjulia.concat(dogsKate);
  allDogs.forEach(function (dog, i) {
    const age = dog;
    const adult = age >= 3 ? 'adult' : 'puppy';
    console.log(`Dog number ${i + 1} is a ${adult}, and is ${age} years old`);
  });
};
console.log(checkDogs(Julia, Kate));


// DATA TRANSFORMATIONS WITH MAP, FILTER AND REDUCE

// MAP METHOD
// The map method creates a new array with the results of applying the provided function on every element in this array.
*/

// const eurToUsd = 1.1;

/*
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
//   // return 23;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

const movementsDescriptions = movements.map((mov, i) => {
  `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)} euros`;
});
console.log(movementsDescriptions);


// FILTER METHOD
// Uses a callback function too

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if(mov > 0) depositsFor.push(mov)
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);

console.log(withdrawals);



// REDUCE METHOD
// Reduce is for boiling down the array into one single value
console.log(movements);

// Accumulator
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
// first parameter is accumulator
// second: current element of the array
// third: current index
// last: array itself

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);


calcPrintBalance(account1.movements);

// Maximum Value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

/*
Coding Challenge #2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs 
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adultAges = humanAges.filter(age => age >= 18);
  // const average = adultAges.reduce((acc, age) => acc + age, 0) / adultAges.length;
  const average = adultAges.reduce((acc, age, i , arr) => acc + age / arr.length, 0);
  return average
};
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]))
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));


// CHAINING
// Do not overuse chaining
// you can only chain a method after another if the first returns an array
// Do not chain methods that mutate the underlying or original array i.e the splice method


// PIPELINE
const eurToUsd = 1.1
console.log(movements);
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);



// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀


const calcAverageHumanAge = ages => ages
  .map(age => age <= 2 ? 2 * age : 16 + age * 4)
  .filter(age => age >= 18)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0)


// FIND METHOD
// Used to retrieve one elements of an array based on a condition
// Also accepts a callback function
// Doesn't return a new array ONLY the first element in an array that satisfies a specific condition

const firstWithdrawal = movements.find(mov => mov < 0)
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Kent');
console.log(account);

for (const acc of accounts) {
  if (acc.owner === 'Jessica Kent') {
    console.log(acc);
    break;
  }
  
}

// FINDINDEX METHOD
// Returns the index of the found element and not the element itself
// indexof can only search for values that is in the array

// FINDLAST AND FINDLASTINDEX METHOD
// Does the same thing as gthe others but starts searching from the last to the first elements

const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

const largeMov = movements.findLastIndex(mov => mov > 1000)
console.log(`Your latest large movement ${movements.length - largeMov} was movements ago`);


// SOME AND EVERY METHOD

// SOME METHOD

console.log(movements);
// checks for equality
console.log(movements.includes(-130));

// condition
console.log(movements.some(mov => mov === -130));
// checks if at least one element is true
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);


// EVERY METHOD
// checks if all elements are true
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
// Reusable (DRY PRINCIPLE)
const deposit = mov => mov > 0;
console.log(movements.some(deposit));


// FLAT AND FLATMAP METHOD
// FLAT METHOD
// Only goes one level deep when flattening an array
const arr = [[1, 2, 3], [4, 5, 6], 7,8]
console.log(arr.flat());

// If you want to go deeper you need to specify the depth
const arrDeep = [[[1, 2], 3], [4,[ 5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance);

// FLATMAP METHOD
// Combines flat and map method which is better for performance
// Only goes one level deep when flattening an array and can't be changed
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);


// Coding Challenge #4
/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:

const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];



// 1.
const huskyWeight = breeds.find(breed => breed.breed === 'Husky').averageWeight;
console.log(huskyWeight);

// 2.
const dogBothActivities = breeds.find((breed) => breed.activities.includes('fetch') && breed.activities.includes('running')).breed;
console.log(dogBothActivities);

// 3.
const allActivities = breeds.flatMap(breed => breed.activities)
console.log(allActivities);

// 4.
const uniqueActivities = [...new Set(breeds.flatMap(breed => breed.activities))];
console.log(uniqueActivities);

// 5
const swimmingAdjacent = [...new Set(breeds.flatMap(breed => {
  if (breed.activities.includes('swimming')) {
    return breed.activities.filter(activity => activity !== 'swimming')
  }
  return []
}))];
console.log(swimmingAdjacent);

// 6.
console.log(breeds.every(weight => weight.averageWeight > 10));

// 7.
console.log(breeds.some(act => act.activities.length >= 3));

// 8.
const averageWeight = breeds.filter(breed => {
  if (breed.activities.includes('fetch')) {
    return breed.averageWeight
  }
  
}).map(breed => breed.averageWeight);
const heaviest = Math.max(...averageWeight);
console.log(heaviest);


// Sorting An Array
// Sort mutates an array

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// if return < 0 then A comes first
// return > 0 then B comes first

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });

movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Array Grouping
// Group Values in an array based on a certain condition
console.log(movements);
const groupedMovements = Object.groupBy(movements, (movement) => movement > 0 ? 'deposits' : 'withdrawals');
console.log(groupedMovements);
const groupedByActivity = Object.groupBy(accounts, (account) => {
  const movementCount = account.movements.length
  if (movementCount >= 8) return 'Very active';
  if (movementCount >= 4) return 'Active';
  if (movementCount >= 1) return 'Moderate';
  return 'Not active';
});
console.log(groupedByActivity);

// const groupedAccounts = Object.groupBy(accounts, account => account.type);
const groupedAccounts = Object.groupBy(accounts, ({type}) => type);
console.log(groupedAccounts);
*/

// More ways of creating and filling arrays
const arr = [1, 2, 3, 4, 5];
console.log(new Array(1, 2, 3, 4, 5));

const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));

// Fill method
// Fill mutates the underlying method

x.fill(1);
x.fill(1, 3); // specify where it should start filling up from
console.log(x);

arr.fill(23, 2, 6) // fill from index 2 to 6 with 23

// Array.from Method
const arr2 = Array.from({ length: 7 }, () => 1);
console.log(arr2);

const arr3 = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(arr3);

const randomDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);



labelBalance.addEventListener('click', function () { 
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('💲', '')
  );
  console.log(movementsUI);

  // OR
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];

});

// Non-Destructive Alternatives: toReversed, toSorted, toSpliced, with
// They don't mutate the underlying arrays

console.log(movements);
const reversedMov = movements.toReversed();
console.log(reversedMov);

// with
// movements[1] = 2000;
const newMovements = movements.with(1, 2000); // first is the index
console.log(movements);