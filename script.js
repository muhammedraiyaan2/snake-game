// Game variable
let moveMu=new Audio('move.mp3')
let gameover = new Audio('gameover.mp3')
let foodd=new Audio('food.mp3')
let inputDir = { x: 0, y: 0 };
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = {x:6,y:7}
//main logic
//game function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine()
}
// colide function
function isCollide(snake){
    // If you pump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y){
            return true;
        }
    }
        // If you go to the border
        if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y<=0){
            return true;
        } 
}
//game engine function
const gameEngine = () => {
    //Part 1: Updating the snake array and food
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        gameover.play()
        speed=8
        alert("Game Over. Press enter to continue or click ok")
        snakeArr=[{ x: 13, y: 15 }]
        score=0
    }
    // If you have eaten the food, icrement the score and regenrate the food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        foodd.play()
        score++
        if(score>localStorage.getItem("highScore")){
            highValue=score;
    localStorage.setItem("highScore", JSON.stringify(highValue))
        }
        speed+=0.4
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    // Moving the Snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        const element = snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
    // Part 2: Display the snake and food
    // Displaying the food
    let board = document.getElementById('board');
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0) {
        snakeElement.classList.add('head')
        }
        else{
            snakeElement.classList.add('snake')
        }
        
        board.appendChild(snakeElement)
    })
        // Displaying the head
            foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food')
            board.appendChild(foodElement)

}
// request
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir={x:0,y:1} // Start the game
switch(e.key){
    case "w":
        inputDir.x=0;
        inputDir.y=-1;
        moveMu.play()
        break;
    case "s":
        inputDir.x=0;
        inputDir.y=1;
        moveMu.play()
        break;
    case "a":
        inputDir.x=-1;
        inputDir.y=0;
        moveMu.play()
        break;
    case "d":
        inputDir.x=1;
        inputDir.y=-0;
        moveMu.play()
        break;
    case "i":
        inputDir.x=0;
        inputDir.y=-1;
        moveMu.play()
        break;
    case "k":
        inputDir.x=0;
        inputDir.y=1;
        moveMu.play()
        break;
    case "j":
        inputDir.x=-1;
        inputDir.y=0;
        moveMu.play()
        break;
    case "l":
        inputDir.x=1;
        inputDir.y=-0;
        moveMu.play()
        break;
     case "ArrowUp":
        inputDir.x=0;
        inputDir.y=-1;
        moveMu.play()
        break;
    case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
        moveMu.play()
        break;
    case "ArrowLeft":
        inputDir.x=-1;
        inputDir.y=0;
        moveMu.play()
        break;
    case "ArrowRight":
        inputDir.x=1;
        inputDir.y=-0;
        moveMu.play()
        break;
    default:
        break;
}
})
// Displaying the score 
let scoreDisplay=document.getElementById("scoreDisplay");
setInterval(() => {
    scoreDisplay.innerText=`Score: ${score}`
}, 10);
// Setting the high score
if(localStorage.getItem("highScore")===null) {
    let highValue=0
    localStorage.setItem("highScore", JSON.stringify(highValue))
}
else{
    highValue=JSON.parse(localStorage.getItem("highScore"))
    let highScoreDisplay=document.getElementById("highscore");
    setInterval(() => {
        highScoreDisplay.innerText=`High Score: ${localStorage.getItem("highScore")}`       
    }, 1);
}
// Displaying high score
