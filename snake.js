
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


const elemSize = 10

const convertPosElem = (pos) => {
    const nbElementX = 500/elemSize
    const nbElementY = 500/elemSize
   return pos*elemSize
}

const drawApple = (posX, posY) => {
    ctx.beginPath();
    ctx.fillStyle = "red"
    ctx.fillRect(convertPosElem(posX), convertPosElem(posY), elemSize, elemSize)
    ctx.closePath()
}
class Snake {

    constructor(){
        this.initSnake()
        this.assembleSnake()
    }

    initSnake(){
        this.head = [3,25]
        this.queue = [[1,25], [2,25]]
    }

    getSnake(){
        return this.snake
    }

    getSnakeHead(){
        this.head = this.snake.slice(-1)
    }

    assembleSnake(){
        this.queue.push(this.head)
        this.snake = this.queue
    }

    moveUp(){
        this.snake = this.snake.map((body) => {
            if(body[0] === virage.posX){
                return [body[0], body[1] - 1]
            }else{
                return [body[0] + 1, body[1]]
            }
        })
    }

    moveRight(){
        this.snake = this.snake.map((body) => {
            return [body[0] + 1, body[1]]
        })
    }
}

const drawSnake = (snake) => {
    ctx.beginPath();
    ctx.fillStyle = "green"
    console.log(snake)
    generateSnake(snake)
    ctx.closePath();
}

const generateSnake = (snake) => {
    snake.map((body)=>{
        ctx.fillRect(convertPosElem(body[0]), convertPosElem(body[1]), elemSize, elemSize)
    })
}

let upDetect = false

class Virage {
    constructor(posX, posY){
        this.posX = posX
        this.posY = posY
    }
}

let virage = null

document.addEventListener("keydown", (event) => {
    const nomTouche = event.key
    if(nomTouche === "ArrowUp"){
        upDetect = true
        console.log(snake)
console.log(snake.getSnakeHead())
        virage = new Virage(snake.getSnakeHead()[0], snake.getSnakeHead()[1])
    }
})

let debut
let ecouleSeconde = 0
let snake = new Snake()

const animationRight = (chrono) => {
    if (!debut) {
        debut = chrono
    }

    //je veux 10 secondes pour parcourir le canvas, pour 500px, 50 elements.
    //500px/10sec = 50px/sec
    //50elem/10sec = 5elem/sec   

    const ecoule = chrono - debut // ms 
    ecouleSeconde = ecoule/1000 // s
    const elemBySec = (nbElem, time) => {
        return nbElem * time
    }
    console.log(snake)
    if(elemBySec(1, ecouleSeconde) < 46){
        ctx.clearRect(0,0,500,500);
        drawApple(10,10,10)
        if(upDetect){
            snake.moveUp()
            console.log(snake)
        }else{
            snake.moveRight()

            console.log(snake)
        }
        drawSnake(snake.getSnake())
        setTimeout(() => {
            requestAnimationFrame(animationRight)
        },1000)
       
    }

}



requestAnimationFrame(animationRight)

