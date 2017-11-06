function randomNumberInRange(lowerLimit, upperLimit) {
  return Math.floor( Math.random() * (1 + upperLimit - lowerLimit) ) + lowerLimit;
}

export function uniqueRandomNumbers(numRandomNumbers, lowerLimit, upperLimit) {
  let uniqueNumbers = [];
  while( uniqueNumbers.length != numRandomNumbers ) {
    let currentRandomNumber = randomNumberInRange(lowerLimit, upperLimit);
    if( uniqueNumbers.indexOf(currentRandomNumber) === -1 ) 
      uniqueNumbers.push(currentRandomNumber);
  }
  return uniqueNumbers;
}



