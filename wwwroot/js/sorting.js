var arrayToSort = [];
var numberOfNumbers = 10;
var waitTime = 100;
window.addEventListener("DOMContentLoaded", event => {
  var slider = document.getElementById("myRange");
  slider.oninput = function() {
    waitTime = this.value;
  };

  //Generate an array with n elements random number
  let numberHolder = document.getElementById("barHolder");
  for (let i = 0; i < numberOfNumbers; i++) {
    arrayToSort.push(Math.floor(Math.random() * 101));
    let newBar = document.createElement("div");
    //newBar.id = ""+i+"_"+arrayToSort[i];
    newBar.id = arrayToSort[i];
    newBar.name = arrayToSort[i];
    newBar.style.width = "" + (1 / numberOfNumbers) * 100 + "%";
    newBar.style.height = "" + arrayToSort[i] + "%";
    newBar.style.backgroundColor = "blue";
    newBar.style.border = ".5px solid white";
    numberHolder.appendChild(newBar);
  }
});

function timer() {
  ms = waitTime;
  if (waitTime === 0) {
    return;
  }
  return new Promise(res => setTimeout(res, ms));
}

function bubbleSort() {
  bubbleSortLoad();
}

async function bubbleSortLoad() {
  // We need to wrap the loop into an async function for this to work
  let barContainer = document.getElementById("barHolder");
  let arr = barContainer.children;
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    await timer(waitTime);
    for (let j = 0; j < n - i - 1; j++) {
      //await timer(waitTime);
      if (parseInt(arr[j].id) > parseInt(arr[j + 1].id)) {
        arr[j].style.backgroundColor = "green";
        arr[j + 1].style.backgroundColor = "green";
        //await timer(waitTime);
        let nextElem = document.getElementById(j + 1);

        let tempHeight = arr[j].style.height;
        let tempId = arr[j].id;

        let nextHeight = arr[j + 1].style.height;
        let nextId = arr[j + 1].id;

        await timer(waitTime);
        arr[j].style.height = nextHeight;
        arr[j].id = nextId;

        await timer(waitTime);
        arr[j + 1].style.height = tempHeight;
        arr[j + 1].id = tempId;

        arr[j].style.backgroundColor = "blue";
        arr[j + 1].style.backgroundColor = "blue";
      }
    }
  }
}

async function qsPartition(arr, low, high) {
  let pivot = parseInt(arr[high].id);

  let indexOfSmallest = low - 1;
  for (let j = low; j < high; j++) {
    if (parseInt(arr[j].id) < pivot) {
      indexOfSmallest++;

      arr[indexOfSmallest].style.backgroundColor = "green";
      arr[j].style.backgroundColor = "green";
      await timer(waitTime);

      let tempHeight = arr[indexOfSmallest].style.height;
      let tempId = arr[indexOfSmallest].id;

      await timer(waitTime);
      arr[indexOfSmallest].style.height = arr[j].style.height;
      arr[indexOfSmallest].id = arr[j].id;

      await timer(waitTime);
      arr[j].style.height = tempHeight;
      arr[j].id = tempId;

      arr[indexOfSmallest].style.backgroundColor = "blue";
      arr[j].style.backgroundColor = "blue";
    }
  }

  arr[indexOfSmallest + 1].style.backgroundColor = "green";
  arr[high].style.backgroundColor = "green";
  await timer(waitTime);

  let tempTwoHeight = arr[indexOfSmallest + 1].style.height;
  let tempTwoId = arr[indexOfSmallest + 1].id;

  await timer(waitTime);
  arr[indexOfSmallest + 1].style.height = arr[high].style.height;
  arr[indexOfSmallest + 1].id = arr[high].id;

  await timer(waitTime);
  arr[high].style.height = tempTwoHeight;
  arr[high].id = tempTwoId;

  arr[indexOfSmallest + 1].style.backgroundColor = "blue";
  arr[high].style.backgroundColor = "blue";

  return indexOfSmallest + 1;
}

function quickSort() {
  let barContainer = document.getElementById("barHolder");
  let arr = barContainer.children;
  let n = arr.length;
  quickSortLoad(arr, 0, n - 1);
}

async function quickSortLoad(arr, low, high) {
  if (low < high) {
    let partitionIndex = await qsPartition(arr, low, high);

    quickSortLoad(arr, low, partitionIndex - 1);
    quickSortLoad(arr, partitionIndex + 1, high);
  }
}

function merge(arr, low, middle, r) {
  let firstHalf = middle - low + 1;
  let secondHalf = r - middle;

  let leftArr = new Array(firstHalf);
  let rightArr = new Array(secondHalf);

  for (let i = 0; i < firstHalf; i++) {
    leftArr[i] = arr[low + i].id;
  }
  for (let i = 0; i < secondHalf; i++) {
    rightArr[i] = arr[middle + 1 + i].id;
  }

  console.log("Left array");
  console.log(leftArr);
  console.log("Right array");
  console.log(rightArr);
  //leftArr.forEach(element => console.log("left: " + element));
  //rightArr.forEach(element => console.log("Right: " + element))

  let i = 0;
  let j = 0;

  console.log("Combining the elements back together");
  let k = low;
  while (i < firstHalf && j < secondHalf) {
    if (parseInt(leftArr[i]) <= parseInt(rightArr[j])) {
      console.log("Swap? Adding from left arr: " + leftArr[i]);
      arr[k].id = leftArr[i];
      arr[k].style.height = leftArr[i] + "%";
      i++;
    } else {
      console.log("Swap? Adding from right arr: " + rightArr[j]);
      arr[k].id = rightArr[j];
      arr[k].style.height = rightArr[j] + "%";
      j++;
    }
    k++;
  }

  //Add the rest of the elements that ARE in order from here that got left in one of the arrays from the while loop above
  while (i < firstHalf) {
    console.log("Adding from left arr: " + leftArr[i]);
    arr[k].id = leftArr[i];
    arr[k].style.height = leftArr[i] + "%";
    i++;
    k++;
  }

  while (j < secondHalf) {
    console.log("Adding from right arr: " + rightArr[j]);
    arr[k].id = rightArr[j];
    arr[k].style.height = rightArr[j] + "%";
    j++;
    k++;
  }

  console.log(arr);
  //arr.forEach(element => console.log("Arr: " + element));
}

function mergeSort(arr, left, right) {
  console.log(arr);
  console.log("\n");
  if (left < right) {
    let middle = parseInt((left + right) / 2);

    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);

    merge(arr, left, middle, right);

    console.log(arr);
  }
}

function doMergeSort(){
  let numberHolder = document.getElementById("barHolder");
  let arr = numberHolder.children;
  mergeSort(arr, 0, arrayToSort.length - 1);
}
