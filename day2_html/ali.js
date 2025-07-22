debugger;
var sortedSquares = function (nums) {
  let rightPointer = nums.length - 1;
  let leftpointer = 0;
  let newArray = new Array(nums.length).fill(0);
  let newarraypointer = nums.length - 1;

  while (leftpointer <= rightPointer) {
    const leftsquare = nums[leftpointer] * nums[leftpointer];
    const rightsquare = nums[rightPointer] * nums[rightPointer];
    console.log(leftsquare);
    console.log(rightsquare);
    if (leftsquare > rightsquare) {
      newArray[newarraypointer] = leftsquare;
      leftpointer++;
    } else {
      newArray[newarraypointer] = rightsquare;
      rightPointer--;
    }
    newarraypointer--;
  }
  return newArray;
};

sortedSquares([2, 4, 6, 8]);
