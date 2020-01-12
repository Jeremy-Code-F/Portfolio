var arrayToSort = [];
var numberOfNumbers = 100;
window.addEventListener('DOMContentLoaded', (event) => {

    //Generate an array with n elements random number
    let numberHolder = document.getElementById("barHolder");
    for(let i = 0; i < numberOfNumbers; i++){
        arrayToSort.push(Math.floor(Math.random() * 101));
        let newBar = document.createElement("div");
        //newBar.id = ""+i+"_"+arrayToSort[i];
        newBar.id = arrayToSort[i];
        newBar.name = arrayToSort[i];
        newBar.style.width = ''+ (1 / numberOfNumbers) *100 + '%';
        newBar.style.height = ''+arrayToSort[i] + '%';
        newBar.style.backgroundColor = "blue";
        newBar.style.border = ".5px solid white";
        numberHolder.appendChild(newBar)
    }

});

function blaBubble(){
    let barContainer = document.getElementById("barHolder");
    let arr = barContainer.children; 
    let n = arr.length;
    for(let i = 0; i < n - 1; i++){
        for(let j = 0; j < n - i - 1; j++){
            let temp = arrayToSort[j];
            arrayToSort[j] = arrayToSort[j + 1];
            arrayToSort[j + 1] = temp;
        }
    }
}


function testBubbleSort(){
    let barContainer = document.getElementById("barHolder");
    let arr = barContainer.children; 
    let n = arr.length;
    for(let i = 0; i < n - 1; i++){
        for(let j = 0; j < n - i - 1; j++){
            if(parseInt(arr[j].id) > parseInt(arr[j + 1].id)){
                let nextElem = document.getElementById(j+1);
                console.log("Swapping: " + arr[j].id + " and : " + arr[j + 1].id);

                let tempHeight = arr[j].style.height;
                let tempId = arr[j].id;

                let nextHeight = arr[j + 1].style.height;
                let nextId = arr[j + 1].id;

                arr[j].style.height = nextHeight;
                arr[j].id = nextId;

                arr[j + 1].style.height = tempHeight;
                arr[j + 1].id = tempId;


            }
        }
    }
}


function bubbleSort(){
    //DO a bubble sort on the arrayToSort
    //load();
    let n = arrayToSort.length;
    for(let i = 0; i < n - 1; i++){
        for(let j = 0; j < n - i - 1; j++){
            if(arrayToSort[j] > arrayToSort[j + 1]){
                let elemSearch = j + "_" + arrayToSort[j];
                let currentBar = document.getElementById(j + "_" + arrayToSort[j]);
                let nextBar = document.getElementById(j + 1 + "_" + arrayToSort[j + 1]);
                currentBar.style.backgroundColor = "green";
                nextBar.style.backgroundColor = "green";

                let tempElement = currentBar.style.height;
                let tempID = currentBar.id;

                currentBar.style.height = nextBar.style.height;
                currentBar.id = nextBar.id;

                nextBar.style.height = tempElement;
                nextBar.id = tempID;

                let temp = arrayToSort[j];
                arrayToSort[j] = arrayToSort[j + 1];
                arrayToSort[j + 1] = temp;
            }
        }

    }

    for(let i = 0; i < arrayToSort.length; i++){
        console.log(arrayToSort[i]);
    }
    console.log("Done bubble sort");


    return 0;
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
   }
   
   async function load () { // We need to wrap the loop into an async function for this to work
    for(let i = 0; i < arrayToSort.length; i++){
        let currentBar = document.getElementById(i + "_" + arrayToSort[i]);
        currentBar.style.backgroundColor = "green";
        await timer(50);
        currentBar.style.backgroundColor = "blue";
    }
   }
