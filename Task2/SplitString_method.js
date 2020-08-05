const SplitString = (inputString, splitParameter) => {

  const stringArray = [];
  let j = 0;

  const delimiterLen = splitParameter.length;

  for (let i = 0; i < inputString.length; i++) {
    let compString = '';
    for (let k = i; k < i + delimiterLen; k++) {
      compString += inputString.charAt(k)
    }
    if (compString === splitParameter) {
      i += (delimiterLen - 1)
      j++;
      stringArray[j] = compString;
      j++
    } else {
      if (!stringArray[j]) stringArray[j] = '';
      stringArray[j] += inputString.charAt(i);
    }
  }

  const newArray = stringArray.filter((item) => {
    return item != null;
  })
  return newArray;
}
