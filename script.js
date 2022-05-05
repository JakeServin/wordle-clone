let words = [
    'aback',
'abase',
'abate',
'abaya',
'abbey',
'abbot',
'abets',
'abhor',
'abide',
'abode',
'abort',
'about',
'above',
'abuse',
'abuts',
'abyss',
'ached',
'aches',
'acids',
'acing',
'ackee',
'acorn',
'acres',
'acrid',
'acted',
'actin',
'actor',
'acute',
'adage',
'adapt',
'added',
'adder',
'addle',
'adept',
'adieu',
'adios',
'adits',
'adman',
'admin',
'admit',
'adobe',
]

// array of squares to iterate through each one as letters are pressed
let squarePositions = document.getElementsByClassName('wordle-square');
let currentSquare = 0;
let rowPosition = 0;
let row = 0;

// Wordle check function
function checkWordle() {
    let guess = '';
    currentSquare -= 5;
    //check and set each letter 
    for (let i = 0; i < 5; i++) {
        guess += squarePositions[currentSquare].innerText;
        squarePositions[currentSquare].classList.remove('wordle-square-inc');
        // if correct
        if (answer[i].toUpperCase() == squarePositions[currentSquare].innerText) {
            // set square and button to green
            squarePositions[currentSquare].classList.add('wordle-square-green');
            document.getElementById(`${squarePositions[currentSquare].innerText.toLowerCase()}-btn`).setAttribute('class','btn btn-green');

        } else if (answer.toUpperCase().includes(squarePositions[currentSquare].innerText)) {
            squarePositions[currentSquare].classList.add('wordle-square-yellow');
            if (alreadyGreen(squarePositions[currentSquare].innerText)) {
    
            } else {
                document.getElementById(`${squarePositions[currentSquare].innerText.toLowerCase()}-btn`).setAttribute('class','btn-yellow btn');
            }
        } else {
            squarePositions[currentSquare].classList.add('wordle-square-grey');
            document.getElementById(`${squarePositions[currentSquare].innerText.toLowerCase()}-btn`).setAttribute('class', 'btn btn-grey');
        }
        currentSquare++
    }
    if (guess == answer.toLocaleUpperCase()) {
        gameOver('win!');
        return;
    }
    if (row > 4) {
        gameOver("lose!");
        return;
    }
    //Start on next row
    row++
    rowPosition = 0;
}

// checks if button is already green 
function alreadyGreen(btnName) {
    btnName = btnName.toLowerCase();
    if (document.getElementById(`${btnName}-btn`).classList.contains('btn-green')) {
        return true;
    } else {
        return false;
    }

}

// get random int between 2 numbers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function resetGame() {
    currentSquare = 0;
    rowPosition = 0;
    row = 0;
    answer = words[getRandomInt(0, words.length)];
    console.log(answer);
}

function gameOver(msg) {
    document.getElementById('message').innerText = msg;
    document.getElementById('tran-screen').style.display = '';
}

// Make each item clickable
document.addEventListener('click', (event) => {
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
                squarePositions[currentSquare-1].innerText = '';
                currentSquare--;
                rowPosition--;
            }
        }
        else if (event.target.id == 'enter-btn') {
            // Do nothing if all 5 squares not complete
            if (rowPosition != 5) {
                return
            } else {
                checkWordle();
            }
        }
        // If theres no squares left dont do anything
        else if (rowPosition == 5) {
            return;
        } 
        // If a letter button is pressed, and square is available 
        else {
            squarePositions[currentSquare].innerText = event.target.innerText;
            squarePositions[currentSquare].classList.add('wordle-square-inc');
            currentSquare++;
            rowPosition++;
        }
    }
})

// "Play Again" resets game and gets new word
document.getElementById('again-btn').addEventListener('click', () => {
    document.getElementById('main').innerHTML = `<h2 id="title">Wordle Clone!</h2>
    <div id="wordle-wrapper" >
    <div class="row">
        <div id="sqr-1" class="wordle-square"></div>
        <div id="sqr-2" class="wordle-square"></div>
        <div id="sqr-3" class="wordle-square"></div>
        <div id="sqr-4" class="wordle-square"></div>
        <div id="sqr-5" class="wordle-square"></div>
    </div>
    <div class="row">
        <div id="sqr-6" class="wordle-square"></div>
        <div id="sqr-7" class="wordle-square"></div>
        <div id="sqr-8" class="wordle-square"></div>
        <div id="sqr-9" class="wordle-square"></div>
        <div id="sqr-10" class="wordle-square"></div>
    </div>
    <div class="row">
        <div id="sqr-11" class="wordle-square"></div>
        <div id="sqr-12" class="wordle-square"></div>
        <div id="sqr-13" class="wordle-square"></div>
        <div id="sqr-14" class="wordle-square"></div>
        <div id="sqr-15" class="wordle-square"></div>
    </div>
    <div class="row">
        <div id="sqr-16" class="wordle-square"></div>
        <div id="sqr-17" class="wordle-square"></div>
        <div id="sqr-18" class="wordle-square"></div>
        <div id="sqr-19" class="wordle-square"></div>
        <div id="sqr-20" class="wordle-square"></div>
    </div>
    <div class="row">
        <div id="sqr-21" class="wordle-square"></div>
        <div id="sqr-22" class="wordle-square"></div>
        <div id="sqr-23" class="wordle-square"></div>
        <div id="sqr-24" class="wordle-square"></div>
        <div id="sqr-25" class="wordle-square"></div>
    </div>
    <div class="row">
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
        <div id="enter-btn" class="btn">ENTER</div>
        <div id="z-btn" class="btn">Z</div>
        <div id="x-btn" class="btn">X</div>
        <div id="c-btn" class="btn">C</div>
        <div id="v-btn" class="btn">V</div>
        <div id="b-btn" class="btn">B</div>
        <div id="n-btn" class="btn">N</div>
        <div id="m-btn" class="btn">M</div>
        <div id="del-btn" class="btn"><---</div>
    </div>
</div>
</div>
`;
    document.getElementById('tran-screen').style.display = 'none';
    resetGame();
})


//set random word
let answer = words[getRandomInt(0, words.length)];
console.log(answer);