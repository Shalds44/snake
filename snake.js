
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
    }

    initSnake(){
        this.snake = [[1,25],[2,25],[3,25],[4,25],[5,25],[6,25],[7,25],[8,25],[9,25],[10,25]]
    }

    getSnake(){
        return this.snake
    }

    addHead(direction){
        const lastItem = getLastItemArray(this.snake)
       
        switch (direction) {
            case "ArrowRight":
                this.head = this.rightDirection(lastItem)
                break;
            case "ArrowLeft":
                this.head = this.leftDirection(lastItem)
                break;
            case "ArrowUp":
                this.head = this.upDirection(lastItem)
                break;
            case "ArrowDown":
                this.head = this.downDirection(lastItem)
                break;
            default:
                break;
        }
        console.log(this.checkSelfEat())
        if(this.checkSelfEat().length) return this.gameLose()
        if(this.checkIfOutside().length) return this.gameLose()

        this.snake.push(this.head)
    }

    updateSnakeDirection(direction){
        this.addHead(direction)
        let newSnake = []
        for (let i = 1; i < this.snake.length; i++) {
            newSnake.push(this.snake[i])
        }
        this.snake = newSnake
    }
    rightDirection(head){
        return [head[0]+1, head[1]]
    }
    leftDirection(head){
        return [head[0] - 1, head[1]]
    }
    upDirection(head){
        return [head[0], head[1] - 1]
    }
    downDirection(head){
        return [head[0], head[1] + 1] 
    }
    growSnake(direction){
        let elemToAdd
        switch (direction) {
            case "ArrowRight":
                elemToAdd = [this.head[0]+1, this.head[1]]
                break;
            case "ArrowLeft":
                elemToAdd = [this.head[0]-1, this.head[1]]
                break;
            case "ArrowUp":
                elemToAdd = [this.head[0], this.head[1]-1]
                break;
            case "ArrowDown":
                elemToAdd = [this.head[0], this.head[1]+1]
                break;
            default:
                break;
        }
        this.snake.push(elemToAdd)
    }
    actionEatApple(apple, direction){
        if(apple.posX === this.head[0] && apple.posY === this.head[1]){
            this.growSnake(direction)
            apple.randomPos()
        }
    }
    checkSelfEat(){
        return this.snake.filter((body) => this.head[0] == body[0] && this.head[1] == body[1])
    }
    checkIfOutside(){
        return this.snake.filter(() => this.head[0] == 50 || this.head[0] == -1 || this.head[1] == 50 || this.head[1] == -1)

    }
    gameLose(){
        alert("Perdu")
    }
}

class Apple {
    constructor(){
        this.randomPos()
    }

    randomPos(){
        this.posX = getRandomInt(2, 30)
        this.posY = getRandomInt(2, 30)
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
})

let debut
let ecouleSeconde = 0
let snake = new Snake()


const apple = new Apple()
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
        drawApple(apple.posX,apple.posY,10)
        
        if(eventTouch.getTouch()){
            snake.updateSnakeDirection(eventTouch.getTouch())

            snake.actionEatApple(apple, eventTouch.getTouch())
        }


        drawSnake(snake.getSnake())

        setTimeout(() => {
            requestAnimationFrame(animationRight)
        },70)
       
    }

}



requestAnimationFrame(animationRight)

