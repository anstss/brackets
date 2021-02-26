module.exports = function check(str, bracketsConfig) {
  let bracketsOpen = [];
  let bracketsClose = [];
  let exception = [];
  let charCodeOpen, charCodeClose;

  for (let i = 0; i < bracketsConfig.length; i++) {
    charCodeOpen = bracketsConfig[i][0].charCodeAt(0);
    charCodeClose = bracketsConfig[i][1].charCodeAt(0);

    if (charCodeOpen === charCodeClose) {
      exception = exception.concat(bracketsConfig[i][0]);
    } else {
      bracketsOpen = bracketsOpen.concat(bracketsConfig[i][0]);
      bracketsClose = bracketsClose.concat(bracketsConfig[i][1]);
    }
  }

  let arr = str.split("");
  let stack = [];
  let indexOpen, indexClose, lastInStack;

  for (let i = 0; i < arr.length; i++) {
    if (bracketsOpen.includes(arr[i])) {
      stack.push(arr[i]);
    } else if (bracketsClose.includes(arr[i])) {
      lastInStack = stack.pop();
      indexOpen = bracketsOpen.indexOf(lastInStack);
      indexClose = bracketsClose.indexOf(arr[i]);
      if (indexOpen !== indexClose) {
        return false;
      }
    } else if (exception.includes(arr[i])) {
      lastInStack = stack.pop();
      if (lastInStack !== arr[i]) {
        if (lastInStack === undefined) {
          stack.push(arr[i]);
        } else {
          stack.push(lastInStack);
          stack.push(arr[i]);
        }
      }
    }
  }

  if (stack.length !== 0) {
    return false;
  } else {
    return true;
  }
}