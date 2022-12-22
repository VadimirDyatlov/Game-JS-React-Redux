function formatTime(milesSeconds) {
  const seconds = ((milesSeconds / 1000) % 60).toFixed(0);
  const minutes = Math.floor(((milesSeconds / 1000 / 60) % 60)).toString();
  const hours = Math.floor((milesSeconds / (1000 * 60 * 60))).toString();
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}

function radianceNumbers(classN) {
  this.current.classList.add(classN);
  setTimeout(() => {
    this.current.classList.remove(classN);
  }, 1200);
}

function calcUpgrade(
  direction,
  constObj,
  heroValue,
  skill,
  activeGold,
  ref,
  defGold,
  heroObj = null,
) {
  let workingArray = null;
  let startValue = null;
  let startPrice = null;
  let PriceCoef = null;
  let maxlengthArray = null;
  let indicatorUpOrDown = 1;
  let lastGold = null;
  let lastValue = null;
  let nextPrice = null;
  switch (skill) {
    case 'hp':
      workingArray = constObj.hpUpdateArray;
      startPrice = constObj.hpStartPrice;
      lastValue = heroValue.hp;
      PriceCoef = constObj.hpPriceCoefficient;
      if (heroObj) {
        startValue = heroObj.hp;
      }
      break;
    case 'damage':
      workingArray = constObj.damageUpdateArray;
      startPrice = constObj.damageStartPrice;
      lastValue = heroValue.damage;
      PriceCoef = constObj.damagePriceCoefficient;
      if (heroObj) {
        startValue = heroObj.damage;
      }
      break;
    case 'speed':
      workingArray = constObj.speedUpdateArray;
      startPrice = constObj.speedStartPrice;
      lastValue = heroValue.speed;
      PriceCoef = constObj.speedPriceCoefficient;
      if (heroObj) {
        startValue = heroObj.speed;
      }
      break;
    default:
      console.log('1--->');
      return null;
  }
  maxlengthArray = workingArray.length - 1;
  if (direction === 'down') {
    maxlengthArray += 1;
    indicatorUpOrDown = -1;
  }
  const index = workingArray.findIndex((el) => el === lastValue);
  nextPrice = (Math.floor(startPrice * PriceCoef ** index));
  if (direction === 'price') {
    console.log('2--->', nextPrice);
    if (index === maxlengthArray) return 'max';
    return nextPrice;
  }
  console.log('3--->', { [skill]: workingArray[index], gold: activeGold });
  if (index === maxlengthArray) return { [skill]: workingArray[index], gold: activeGold };
  console.log('4--->', { [skill]: startValue, gold: activeGold });
  if (startValue === workingArray[index]) return { [skill]: startValue, gold: activeGold };
  console.log('5--->', { [skill]: lastValue, gold: activeGold });
  if (direction === 'up') {
    if (activeGold < nextPrice) {
      return { [skill]: lastValue, gold: activeGold };
    }
    console.log('prov', activeGold, nextPrice);
    lastGold = activeGold - nextPrice;
  }
  if (defGold !== activeGold && direction === 'down') {
    lastGold = activeGold + Math.round(nextPrice / PriceCoef);
  }
  console.log('6--->', {
    [skill]: workingArray[index + indicatorUpOrDown],
    gold: lastGold,
  });
  radianceNumbers.call(ref, direction);
  return {
    [skill]: index === -1
      ? lastValue : workingArray[index + indicatorUpOrDown],
    gold: lastGold,
  };
}

export { formatTime, calcUpgrade, radianceNumbers };
