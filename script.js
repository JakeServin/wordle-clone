// Variables

// Array of squares to iterate through as letters are pressed
let squarePositions = document.getElementsByClassName('wordle-square');
// Iterator for squarePositions
let currentSquare = 0;
// Variable to keep track of row position 0-5
let rowPosition = 0;
// Variable to keep track of row 0-5
let row = 0;


// FUNCTIONS

// Function to make code wait since setTimeout didn't work - found online
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

// Checks if button is already green 
function alreadyGreen(btnName) {
    btnName = btnName.toLowerCase();
    if (document.getElementById(`${btnName}-btn`).classList.contains('btn-green')) {
        return true;
    } else {
        return false;
    }

}

// Wordle check function
async function checkWordle() {
    // Get word from tiles
    let check = '';
    currentSquare -= 5;
    for (let i = 0; i < 5; i++){
        check += squarePositions[currentSquare].innerText
        currentSquare++;
    }
    // Check if word exists
    let wordleData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${check}`).then(res => (res.json())).then((data) => {
        return data;
    })
    // If the word doesn't exist, do shake animation, don't run code - Phase is not included in free dictionary API (added manually)
    if (wordleData.title == "No Definitions Found" && check != 'PHASE') {
        console.log(document.getElementById(`row${row + 1}`));
        document.getElementById(`row${row + 1}`).classList.add('shake');
        setTimeout(() => {
            document.getElementById(`row${row + 1}`).classList.remove('shake');
        }, 500);

        return;
    } 

    currentSquare -= 5;
    // Check and set each letter 
    for (let i = 0; i < 5; i++) {
        // Wait function gives animation effect by waiting .062 secs to before changing next tile
        await wait(62);
        // Remove current style on square
        squarePositions[currentSquare].classList.remove('wordle-square-inc');
        // If letter is in answer
        if (answer[i].toUpperCase() == squarePositions[currentSquare].innerText) {
            // Set square and button to green
            squarePositions[currentSquare].classList.add('wordle-square-green');
            document.getElementById(`${squarePositions[currentSquare].innerText.toLowerCase()}-btn`).setAttribute('class','btn btn-green');

        }
        // If letter is in the wrong spot
        else if (answer.toUpperCase().includes(squarePositions[currentSquare].innerText)) {
            // Change square to yellow
            squarePositions[currentSquare].classList.add('wordle-square-yellow');
            // Check if letter button is already green before setting to yellow
            if (!alreadyGreen(squarePositions[currentSquare].innerText)) {
                // Change button to yellow
                document.getElementById(`${squarePositions[currentSquare].innerText.toLowerCase()}-btn`).setAttribute('class','btn-yellow btn');
            }
        }
        // If letter is not in word
        else {
            // Change square and button to grey
            squarePositions[currentSquare].classList.add('wordle-square-grey');
            document.getElementById(`${squarePositions[currentSquare].innerText.toLowerCase()}-btn`).setAttribute('class', 'btn btn-grey');
        }
        // Animation enlarges square
        squarePositions[currentSquare].classList.add('reveal');
        currentSquare++
    }
    // If the answer is correct, display win message & play again button
    if (check == answer.toLocaleUpperCase()) {
        gameOver('win!');
        return;
    }
    // If it's the last row and the answer is wrong, display lose message/play again button/answer
    if (row > 4) {
        gameOver(`lose! The word was ${answer}`);
        return;
    }
    // Start on next row
    row++
    rowPosition = 0;
}

// Function to get random int between 2 numbers - sourced from w3schools
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// Display win/lose message
function gameOver(msg) {
    document.getElementById('message').innerText = msg;
    document.getElementById('tran-screen').style.display = '';
}

// Reset game, pick new word, set iterators to 0
function resetGame() {
    currentSquare = 0;
    rowPosition = 0;
    row = 0;
    answer = words[getRandomInt(0, words.length)];
}


// MAIN CODE
// Make each item clickable - Adds click event listener to whole page, 
document.addEventListener('click', async(event) => {
    // Only do something if it's a button
    if (event.target.classList.contains('btn')) {
        // If backspace is pressed
        if (event.target.id == 'del-btn') {
            // Do nothing if nothing is entered so far
            if (rowPosition == 0) {
                return;
            // Delete last square if letter present
            } else {
                squarePositions[currentSquare-1].classList.remove('wordle-square-inc');
                squarePositions[currentSquare-1].classList.remove('bounce');
                squarePositions[currentSquare-1].innerText = '';
                currentSquare--;
                rowPosition--;
            }
        }
        // If enter button is pressed
        else if (event.target.id == 'enter-btn') {
            // If the row is incomplete, shake
            if (rowPosition != 5) {
                document.getElementById(`row${row + 1}`).classList.add('shake');
                setTimeout(() => {
                    document.getElementById(`row${row + 1}`).classList.remove('shake');
                }, 500);
                return
            } else {
                // If the row is complete, check word
                checkWordle();
            }
        }
        // If row is full, do nothing unless enter or delete button is pressed
        else if (rowPosition == 5) {
            return;
        } 
        // If a letter button is pressed, and square is available, change the square to the letter, add animation, increment currentSquare and rowPosition iterators 
        else {
            squarePositions[currentSquare].innerText = event.target.innerText;
            squarePositions[currentSquare].classList.add('wordle-square-inc');
            squarePositions[currentSquare].classList.add('bounce');
            currentSquare++;
            rowPosition++;
        }
    }
})

// "Play Again" resets game's html, picks new word, hides transition screen, and sets iterators to 0
document.getElementById('again-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<h2 id="title">Wordle Clone!</h2>
    <div id="wordle-wrapper" >
    <div id="row1" class="row">
        <div id="sqr-1" class="wordle-square"></div>
        <div id="sqr-2" class="wordle-square"></div>
        <div id="sqr-3" class="wordle-square"></div>
        <div id="sqr-4" class="wordle-square"></div>
        <div id="sqr-5" class="wordle-square"></div>
    </div>
    <div id="row2" class="row">
        <div id="sqr-6" class="wordle-square"></div>
        <div id="sqr-7" class="wordle-square"></div>
        <div id="sqr-8" class="wordle-square"></div>
        <div id="sqr-9" class="wordle-square"></div>
        <div id="sqr-10" class="wordle-square"></div>
    </div>
    <div id="row3" class="row">
        <div id="sqr-11" class="wordle-square"></div>
        <div id="sqr-12" class="wordle-square"></div>
        <div id="sqr-13" class="wordle-square"></div>
        <div id="sqr-14" class="wordle-square"></div>
        <div id="sqr-15" class="wordle-square"></div>
    </div>
    <div id="row4" class="row">
        <div id="sqr-16" class="wordle-square"></div>
        <div id="sqr-17" class="wordle-square"></div>
        <div id="sqr-18" class="wordle-square"></div>
        <div id="sqr-19" class="wordle-square"></div>
        <div id="sqr-20" class="wordle-square"></div>
    </div>
    <div id="row5" class="row">
        <div id="sqr-21" class="wordle-square"></div>
        <div id="sqr-22" class="wordle-square"></div>
        <div id="sqr-23" class="wordle-square"></div>
        <div id="sqr-24" class="wordle-square"></div>
        <div id="sqr-25" class="wordle-square"></div>
    </div>
    <div id="row6" class="row">
        <div id="sqr-26" class="wordle-square"></div>
        <div id="sqr-27" class="wordle-square"></div>
        <div id="sqr-28" class="wordle-square"></div>
        <div id="sqr-29" class="wordle-square"></div>
        <div id="sqr-30" class="wordle-square"></div>
    </div>
</div>
<div id="keyboard-wrapper">
    <div class="row">
        <div id="q-btn" class="btn">Q</div>
        <div id="w-btn" class="btn">W</div>
        <div id="e-btn" class="btn ">E</div>
        <div id="r-btn" class="btn ">R</div>
        <div id="t-btn" class="btn">T</div>
        <div id="y-btn" class="btn">Y</div>
        <div id="u-btn" class="btn">U</div>
        <div id="i-btn" class="btn">I</div>
        <div id="o-btn" class="btn">O</div>
        <div id="p-btn" class="btn">P</div>
    </div>
    <div class="row">
        <div id="a-btn" class="btn">A</div>
        <div id="s-btn" class="btn">S</div>
        <div id="d-btn" class="btn">D</div>
        <div id="f-btn" class="btn">F</div>
        <div id="g-btn" class="btn">G</div>
        <div id="h-btn" class="btn">H</div>
        <div id="j-btn" class="btn">J</div>
        <div id="k-btn" class="btn">K</div>
        <div id="l-btn" class="btn">L</div>
    </div>
    <div class="row">
        <div id="enter-btn" class="btn" style="flex-grow: 2">ENTER</div>
        <div id="z-btn" class="btn">Z</div>
        <div id="x-btn" class="btn">X</div>
        <div id="c-btn" class="btn">C</div>
        <div id="v-btn" class="btn">V</div>
        <div id="b-btn" class="btn">B</div>
        <div id="n-btn" class="btn">N</div>
        <div id="m-btn" class="btn">M</div>
        <div id="del-btn" class="btn" style="flex-grow: 2"><---</div>
    </div>
</div>
</div>
`;
    document.getElementById('tran-screen').style.display = 'none';
    resetGame();
})

// Set intial answer
let answer = words[getRandomInt(0, words.length)];

window.addEventListener("load",function() {
    setTimeout(function(){
        // This hides the address bar:
        window.scrollTo(0, 1);
    }, 0);
});

// CODE BELOW PREVENTS DOUBLE-TAPS - sourced online
let drags = new Set() //set of all active drags
document.addEventListener("touchmove", function(event){
  if(!event.isTrusted)return //don't react to fake touches
  Array.from(event.changedTouches).forEach(function(touch){
    drags.add(touch.identifier) //mark this touch as a drag
  })
})
document.addEventListener("touchend", function(event){
  if(!event.isTrusted)return
  let isDrag = false
  Array.from(event.changedTouches).forEach(function(touch){
    if(drags.has(touch.identifier)){
      isDrag = true
    }
    drags.delete(touch.identifier) //touch ended, so delete it
  })
  if(!isDrag && document.activeElement == document.body){
    //note that double-tap only happens when the body is active
    event.preventDefault() //don't zoom
    event.stopPropagation() //don't relay event
    event.target.focus() //in case it's an input element
    event.target.click() //in case it has a click handler
    event.target.dispatchEvent(new TouchEvent("touchend",event))
    //dispatch a copy of this event (for other touch handlers)
  }
})