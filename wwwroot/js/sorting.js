var arrayToSort = [];
var numberOfNumbers = 100;
var waitTime = 100;
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

function bubbleSort(){
    bubbleSortLoad();
}

function timer() {
    ms = waitTime;
    if(waitTime === 0){
        return;
    }
    return new Promise(res => setTimeout(res, ms));
}

   
async function bubbleSortLoad () { // We need to wrap the loop into an async function for this to work
    let barContainer = document.getElementById("barHolder");
    let arr = barContainer.children; 
    let n = arr.length;
    for(let i = 0; i < n - 1; i++){
        await timer(waitTime);
        for(let j = 0; j < n - i - 1; j++){
            //await timer(waitTime);
            if(parseInt(arr[j].id) > parseInt(arr[j + 1].id)){
                arr[j].style.backgroundColor = "green";
                arr[j + 1].style.backgroundColor = "green";
                //await timer(waitTime);
                let nextElem = document.getElementById(j+1);

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
