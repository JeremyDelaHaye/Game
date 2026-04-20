class Character extends GameObject
{
    
    #speed;
    #angle 
    #walkSheet

    constructor(x,y,walkSheet)
    {
        super(x,y,width,height)
        this.#speed = 10;
        this.#angle = 0;
        this.#walkSheet = walkSheet
    }

    moveX(distance)
    {
        let val = this.getX()
        this.setX(val += (this.#speed * distance)) ;
    }

    moveY(distance)
    {
        let val = this.getY()
        this.setY(val += (this.#speed * distance)) ; 
    }

    setAngle(value)
    {
        this.#angle = value
    }

    setSpeed(value)
    {
        this.#speed = value
    }

    getAngle()
    {
        return(this.#angle)
    }

    getWalkSheet()
    {
        return(this.#walkSheet)
    }

    getSpeed()
    {
        return(this.#speed)
    }



    
}

class Player extends Character
{
    #movementState
    #attackSheet
    #attackFrame
    #attackTimer
    #isAttacking
    #walkFrame
    #walkTimer
    #score
    #state
    #health

    constructor(x,y,attackSheet,walkSheet)
    {
        super(x,y,walkSheet)
        this.#movementState = true 
        this.#attackSheet = attackSheet
        this.#attackFrame = 0
        this.#attackTimer = 0
        this.#isAttacking = false
        this.#walkFrame = 0
        this.#walkTimer = 0
        this.#score = 0
        this.#state = true;
        this.#health = 100 //max
    }

    getHealth()
    {
        return(this.#health)
    }

    getAttackFrame()
    {
        return(this.#attackFrame)
    }

    getAttackState()
    {
        return(this.#isAttacking)
    }

    getScore()
    {
        return(this.#score)
    }

    getState()
    {
        return(this.#state)
    }

    setState(input)
    {
        this.#state = input
    }

    setHealth(input)
    {
        this.#health = input
    }

    setScore(score)
    {
        this.#score = score
    }

    startAttack()
    {
        this.#isAttacking = true
        this.#attackFrame = 0
        this.#attackTimer = 0
    }

    animateAttack()
    {
       
        this.#attackTimer++
        if (this.#attackTimer >= 8)
        {
            this.#attackFrame++
            this.#attackTimer = 0
            if (this.#attackFrame >= 7)
            {
                this.#attackFrame = 0
                this.#isAttacking = false  
            }
        }
    }

    animateWalk()
    {
        this.#walkTimer++
        if(this.#walkTimer >= 8)
        {
            this.#walkFrame = (this.#walkFrame + 1) % 8 
            this.#walkTimer = 0
        }
    }


    updateRotation()
    {
        this.setAngle(atan2(mouseY - (this.getY()+ 25), mouseX - (this.getX() + 25))- HALF_PI)
        
    }

    movement(grid)
    {
        const A = 65, D = 68, W = 87, S = 83;
        this.#movementState = false;

        const speed = 10 * 0.3;
        let s = 0.3
        const size = 50;

        const left  = () => grid.isOccupied(this.getX() - speed, this.getY()) || grid.isOccupied(this.getX() - speed, this.getY() + size);
        const right = () => grid.isOccupied(this.getX() + size + speed, this.getY()) || grid.isOccupied(this.getX() + size + speed, this.getY() + size);
        const up    = () => grid.isOccupied(this.getX(), this.getY() - speed) || grid.isOccupied(this.getX() + size, this.getY() - speed);
        const down  = () => grid.isOccupied(this.getX(), this.getY() + size + speed) || grid.isOccupied(this.getX() + size, this.getY() + size + speed);

        if (keyIsDown(SHIFT)){s = 0.65}
        if (keyIsDown(A) && !left())  { this.moveX(-s); this.#movementState = true; }
        if (keyIsDown(D) && !right()) { this.moveX(s);  this.#movementState = true; }
        if (keyIsDown(W) && !up())    { this.moveY(-s); this.#movementState = true; }
        if (keyIsDown(S) && !down())  { this.moveY(s);  this.#movementState = true; }
    }

    checkHealth()
    {
        if (this.#health <= 0)
        {
            this.#state = false
            return false;
        }

        return true
    }

        
    
                                
    draw(grid) 
    {
        if(this.checkHealth())
        {
            this.updateRotation()
            this.movement(grid)
            push();
                translate(this.getX() + 25, this.getY() + 25); 
                rotate(this.getAngle());
                rotate(PI)
                noStroke();

            
                if (this.#isAttacking)
                {
                    this.animateAttack()
                    let sx = this.#attackFrame * 58
                    push()
                        rotate(-HALF_PI)
                        image(this.#attackSheet, -75, -75, 150, 150, sx, 0, 58, 60)
                    pop()    
                }
                else if (this.#movementState)
                {
                    this.animateWalk()
                    let sx = this.#walkFrame * 60
                    push()
                        rotate(-HALF_PI)
                        image(this.getWalkSheet(), -75, -75, 150, 150, sx, 0, 60, 60)
                    pop()
                }
                else
                {
                    push()
                   rotate(-HALF_PI)
                    image(this.getWalkSheet(), -75, -75, 150, 150, 1, 0, 60, 60)
                    pop()
                }
            pop();
        }
        
    }

}

class Enemy extends Character
{
    #state
    #destX
    #destY
    #walkFrame
    #walkTimer
    #health
    

    constructor(x,y,speed,walkSheet,attackSheet)
    {
        super(x,y,walkSheet,attackSheet)
        this.#health = 100
        this.#state = true;
        this.#walkFrame = 0
        this.#walkTimer = 0
        this.setSpeed(speed)  
        this.#setRandomPoint()
    }

    #setRandomPoint()
    {
        this.#destX = random(width)
        this.#destY = random(height)
    }

    #setCustomPoint(x,y)
    {
        this.#destX = x
        this.#destY = y
    }

    #followPlayer(player)
    { 
        this.#destX = player.getX()
        this.#destY = player.getY()
    }

    #animateWalk()
    {
        this.#walkTimer++
        if (this.#walkTimer >= 8)
        {
            this.#walkFrame = (this.#walkFrame + 1) % 8
            this.#walkTimer = 0
        }
    }

    draw(player,colGrid)
    {   
        if (player.getAttackFrame() === 4 && dist(player.getX(), player.getY(), this.getX(), this.getY()) < 80)
        {
            this.#health -= 10;
            if (this.#health <= 0)
            {
                
                this.#state = false;
                let score = player.getScore()
                player.setScore(score++)
                
            }
        }
        if (this.#state)
        {
            this.patrol(colGrid,player)
            this.#animateWalk()
            this.setAngle(atan2(this.#destY - (this.getY() + 25), this.#destX - (this.getX() + 25)) - HALF_PI)
            push()
                translate(this.getX() + 25, this.getY() + 25)
                rotate(this.getAngle())
                rotate(PI)
                noStroke()
                push()
                    rotate(-HALF_PI)
                    rectMode(CENTER)
                    fill(155)
                    rect(-32.5, 0, 15, 50)
                    fill(255, 0, 0)
                    rect(-32.5, 0, 7, this.#health /2)
                    let sx = this.#walkFrame * 60
                    image(this.getWalkSheet(), -75, -75, 150, 150, sx, 0, 60, 60)
                pop()
            pop()
        }
    }

   


    patrol(colGrid, player)
    {
        let s = this.getSpeed()
        const size = 50

        const blockedLeft  = colGrid.isOccupied(this.getX() - s, this.getY()) || colGrid.isOccupied(this.getX() - s, this.getY() + size)
        const blockedRight = colGrid.isOccupied(this.getX() + size + s, this.getY()) || colGrid.isOccupied(this.getX() + size + s, this.getY() + size)
        const blockedUp    = colGrid.isOccupied(this.getX(), this.getY() - s) || colGrid.isOccupied(this.getX() + size, this.getY() - s)
        const blockedDown  = colGrid.isOccupied(this.getX(), this.getY() + size + s) || colGrid.isOccupied(this.getX() + size, this.getY() + size + s)

        if (this.#destX < this.getX() && !blockedLeft)  this.setX(this.getX() - s)
        if (this.#destX > this.getX() && !blockedRight) this.setX(this.getX() + s)
        if (this.#destY < this.getY() && !blockedUp)    this.setY(this.getY() - s)
        if (this.#destY > this.getY() && !blockedDown)  this.setY(this.getY() + s)

        if (this.getX() === player.getX() && this.getY() === player.getY())
        {
            player.setState(false)
        }

        if (this.lookForPlayer(colGrid, player))
        {
            this.#followPlayer(player)
        }   

        if (abs(this.getX() - player.getX()) < 50 && abs(this.getY() - player.getY()) < 50)
        {
            this.attackPlayer(player)
        }
        
        const arrived = dist(this.getX(), this.getY(), this.#destX, this.#destY) < s
        if (arrived || blockedLeft || blockedRight || blockedUp || blockedDown)
        {
            this.#setRandomPoint()
        }
    }

    lookForPlayer(grid, player)
    {
        let enemyGridX = grid.getGridPosX(this.getX())
        let enemyGridY = grid.getGridPosY(this.getY())
        let playerGridX = grid.getGridPosX(player.getX())
        let playerGridY = grid.getGridPosY(player.getY())

        const steps = Math.ceil(dist(enemyGridX, enemyGridY, playerGridX, playerGridY))

        for (let i = 1; i <= steps; i++)
        {
            let t = i / steps
            let checkX = Math.round(lerp(enemyGridX, playerGridX, t))
            let checkY = Math.round(lerp(enemyGridY, playerGridY, t))

            if (grid.getCell(checkY, checkX) === true)
            {
                return false
            }

            if (checkX === playerGridX && checkY === playerGridY)
            {
                return true
            }
        }
        return false
    } 

    attackPlayer(player)
    {
        let input = player.getHealth()-1
        player.setHealth(input)
    }

}

class FixedEnemy extends Enemy
{
    #health
    #walkFrame
    #state
    

    constructor(x,y,walkSheet,attackSheet)
    {
        super(x,y,walkSheet,attackSheet)
        this.#health = 100;
        this.#state = true
    }

    draw(player,colGrid)
    {
        if (this.lookForPlayer(colGrid,player))
        {
            this.setAngle(atan2(player.getY() - (this.getY() + 25), player.getX() - (this.getX() + 25)))
            this.shoot()
        }

        if (player.getAttackFrame() === 4 && dist(player.getX(), player.getY(), this.getX(), this.getY()) < 80)
        {
            this.#health -= 10;
            console.log(this.#health)
            if (this.#health <= 0)
            {
                
                this.#state = false;
                let score = player.getScore()
                player.setScore(score++)
                
            }
        }   
        
        if (this.#state)
        {
            push()
            translate(this.getX() + 25, this.getY() + 25)
            rotate(this.getAngle())
            rotate(PI)
            noStroke()
            push()
                rotate(PI)
                rectMode(CENTER)
                fill(155)
                rect(-32.5, 0, 15, 50)
                fill(255, 0, 0)
                rect(-32.5, 0, 7, this.#health /2)
                let sx = this.#walkFrame * 60
                image(this.getWalkSheet(), -75, -75, 150, 150, sx, 0, 60, 60)
                pop()
            pop()
        }
                 
    }

    shoot()
    {
        bullet = new bullet(this.getX(),this.getY(),this.getAngle())
    }
}