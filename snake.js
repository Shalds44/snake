
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
        this.head = [10,25]
        this.queue = [[1,25], [2,25],[3,25], [4,25],[5,25], [6,25],[7,25], [8,25],[9,25]]
    }

    getSnake(){
        return this.snake
    }

    getSnakeHead(){
        this.head = this.snake.slice(-1)
        return this.head[0]
    }

    getSnakeHeadPosX(){
        this.getSnakeHead()
        return this.head[0][0]
    }

    getSnakeHeadPosY(){
        this.getSnakeHead()
        return this.head[0][1]
    }

    assembleSnake(){
        this.queue.push(this.head)
        this.snake = this.queue
    }

    init(){
        this.saveNewDirection(this.rightDirection)
        this.saveLastDirection(this.rightDirection)
    }

    toUp(){
        this.saveNewDirection(this.upDirection)
    }

    toDown(){
        this.saveNewDirection(this.downDirection)
    }

    toLeft(){
        this.saveNewDirection(this.leftDirection)
    }

    toRight(){
        this.saveNewDirection(this.rightDirection)
    }

    updatePositionBody(body, direction){
        if(direction == "ArrowUp"){
            return this.upDirection(body)
        }else if(direction == "ArrowRight"){
            console.log(this.rightDirection(body))
            return this.rightDirection(body)
        }
    }
    move(move){
        let lastIndex = listVirages.length - 1
        if(listVirages.length) {
            if(this.snake[0][0] == listVirages[lastIndex].posX && this.snake[0][1] == listVirages[lastIndex].posY){
                this.saveLastDirection(this.getNewDirection())
            }
        }
        console.log(this.snake)
        this.snake = this.snake.map((body) => {

            if(listVirages.length) {
                if(move == "right" || move == "left"){
                    // Le snake est décomposé élément par élément. 
                    // Les éléments sont mis à jours 1 par 1 en fonction d'un "truc" 
                    // Il faut traiter chaque body. qui renvoit un résultat.
                    // Une fonction qui traite la case et renvoit sa nouvelle position.

                    if(listVirages[lastIndex].posY == body[1]){
                        return this.getNewDirection()(body)
                    }else{
                        return this.getLastDirection()(body)
                    }
                }else if(move == "up" || move == "down"){
                    if(listVirages[lastIndex].posX == body[0]){
                        return this.getNewDirection()(body)
                    }else{
                        return this.getLastDirection()(body)
                    }
                }
            }else{
                return this.getNewDirection()(body)
            }
        })
    }

    saveLastDirection(direction){
        this.lastDirection = direction
    }

    getLastDirection(){
        return this.lastDirection
    }

    saveNewDirection(direction){
        this.newDirection = direction
    }

    getNewDirection(){
        return this.newDirection
    }

    rightDirection(body){
        return [body[0] + 1, body[1]]
    }
    leftDirection(body){
        return [body[0] - 1, body[1]]
    }
    upDirection(body){
        return [body[0], body[1] - 1] 
    }
    downDirection(body){
        return [body[0], body[1] + 1] 
    }
}

const drawSnake = (snake) => {
    ctx.beginPath();
    ctx.fillStyle = "green"
    generateSnake(snake)
    ctx.closePath();
}

const generateSnake = (snake) => {
    snake.map((body)=>{
        ctx.fillRect(convertPosElem(body[0]), convertPosElem(body[1]), elemSize, elemSize)
    })
}

let upDetect = false
let downDetect = false
let leftDetect = false
let rightDetect = false

class Virage {
    constructor(posX, posY, direction){
        this.posX = posX
        this.posY = posY
        this.direction = direction
    }
}

let listVirages = []
class EventTouch {
    constructor(){
        this.touch = null
    }

    setTouch(touch){
        this.touch = touch
    }

    getTouch(){
        return this.touch
    }

}

document.addEventListener("keydown", (event) => {
    const nomTouche = event.key
    eventTouch.setTouch(nomTouche)
    listVirages.push(new Virage(snake.getSnakeHeadPosX(), snake.getSnakeHeadPosY(), nomTouche))
})

let debut
let ecouleSeconde = 0
let snake = new Snake()
const eventTouch = new EventTouch()

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
    if(elemBySec(1, ecouleSeconde) < 46){
        ctx.clearRect(0,0,500,500);
        drawApple(10,10,10)
        if(eventTouch.getTouch() == "ArrowUp"){
            snake.toUp()
            snake.move("up")
        }else if(eventTouch.getTouch() == "ArrowLeft"){
            snake.toLeft()
            snake.move("left")
        }else if(eventTouch.getTouch() == "ArrowDown"){
            snake.toDown()
            snake.move("down")
        }else if(eventTouch.getTouch() == "ArrowRight"){
            snake.toRight()
            snake.move("right")
        }
        // console.log(listVirages)

        // if(listVirages){
        //     listVirages.map((virage) => {
        //         snake.move(virage.direction)
        //     })
        // }

        drawSnake(snake.getSnake())
        setTimeout(() => {
            requestAnimationFrame(animationRight)
        },1000)
       
    }

}



requestAnimationFrame(animationRight)

