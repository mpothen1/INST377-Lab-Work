document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid') 
    const doodler = document.createElement('div') 
    let doodlerLeftSpace = 50; 
    let startPoint = 150; 
    let doodlerBottomSpace = startPoint; 
    let isGameOver = false; 
    let platformCount = 5; 
    let platforms = []
    let upTimerId 
    let downTimerId
    let isJumping = true 
    let isGoingLeft = false
    let isGoingRight = false
    let leftTimerId 
    let rightTimerId 
    let score = 0 
    

    //create doodler 
    function createDoodler(){
        grid.appendChild(doodler) //puts div doodler into grid
        doodler.classList.add('doodler') //make doodler object a doodler class from css
        //placing doodler on first platform
        doodlerLeftSpace = platforms[0].left 
        //moving doodler
        doodler.style.left = doodlerLeftSpace + 'px' //js gives css attributes to elements
        doodler.style.bottom = doodlerBottomSpace + 'px'
    }

    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')
    
            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
      }


    function createPlatforms(){
        for (let i = 0; i<platformCount; i++){
            //using for loop to increment gap space
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap //adding spacing 
            let newPlatform = new Platform(newPlatBottom) //make new platform
            //put platforms in an array
            platforms.push(newPlatform)
            console.log(platforms)


        }
    }

    //only move platforms is doodler is in a certain position
    function movePlatforms(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(platform => {
                platform.bottom -= 4 //each platform moves by 4 each time
                let visual = platform.visual 
                visual.style.bottom = platform.bottom + 'px'

                //removing platforms
                if(platform.bottom < 10){
                    let firstPlatform = platforms[0].visual  
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score ++
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)
                }
            })
        }

    }
    

    //doodler move 
    function jump(){
        clearInterval(downTimerId) 
        isJumping = true 
        upTimerId = setInterval(function () {
            doodlerBottomSpace += 20 
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace > startPoint + 200){  
                fall()
            }


        }, 30)

    }

    function fall(){
        clearInterval(upTimerId)//get rid uptimerid 
        isJumping = false
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0){
                gameOver()
            }

            //checking if he falls onto platform
            platforms.forEach(platform => {
                if(
                    (doodlerBottomSpace >= platform.bottom) && 
                    (doodlerBottomSpace <= platform.bottom + 15) && 
                    ((doodlerLeftSpace + 60) >= platform.left) && 
                    (doodlerLeftSpace <= (platform.left + 85)) && 
                    !isJumping
                ){
                    console.log('landed')
                    startPoint = doodlerBottomSpace //if you are on a platfrom, you overwrite startpoint
                    jump()
                }
            })
        }, 30)

    }

    function gameOver(){
        console.log('game over')
        isGameOver = true 
        while(grid.firstChild){//keep removing till grid empty 
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML = score
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)
    
    }

    //key controls
    function control(e){
        if (e.key === "ArrowLeft"){
            moveLeft()
        }else if (e.key === "ArrowRight"){
            moveRight() 
        }else if (e.key === "ArrowUp"){
            moveStraight()
        }

    }

    function moveLeft(){
        if (isGoingRight){
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        isGoingLeft = true 
        leftTimerId = setInterval(function () {
            if(doodlerLeftSpace >= 0){
                doodlerLeftSpace -= 5 
                doodler.style.left = doodlerLeftSpace + 'px'
            }else moveRight()
             
        },20)
    }

    function moveRight(){
            if (isGoingLeft){
                clearInterval(leftTimerId)
                isGoingLeft = false 
            }
            isGoingRight = true
            console.log(
            rightTimerId = setInterval(function (){
                if(doodlerLeftSpace <= 340){
                    doodlerLeftSpace += 5
                    doodler.style.left = doodlerLeftSpace + 'px'
                }else moveLeft()
    
            },20))
        }
        

    function moveStraight(){
        isGoingRight = false 
        isGoingLeft = false 
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
        
       
    }


    //what happens when game starts 
    function start(){
        if(!isGameOver){
            createPlatforms()
            createDoodler()
            setInterval(movePlatforms, 30) //platforms move every 30 ms
            jump()
            document.addEventListener('keyup', control)
        }
    }
    //attach a button 
    start()
})