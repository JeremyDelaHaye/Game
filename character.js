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

    getAngle()
    {
        return(this.#angle)
    }

    getWalkSheet()
    {
        return(this.#walkSheet)
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

        
    
                                
    draw(grid) 
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

class Enemy extends Character
{
    #state
    #size
    #destX
    #destY
    #walkFrame
    #walkTimer

    constructor(x,y,speed,sprite,angle,size,walkSheet)
    {
        super(x,y,walkSheet)
        this.#state = true;
        this.#size = size
        this.#walkFrame = 0
        this.#walkTimer = 0
        this.#setPoint()
    }

    #setPoint()
    {
        this.#destX = random(width)
        this.#destY = random(height)
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
            this.#state = false;
            let score = player.getScore()
            player.setScore(score++)
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
                    let sx = this.#walkFrame * 60
                    image(this.getWalkSheet(), -75, -75, 150, 150, sx, 0, 60, 60)
                pop()
            pop()
        }
    }

   


    patrol(colGrid,player) 
    {
        let s = 5
        if (this.#destX > this.getX()) this.setX(this.getX() + s);
        else this.setX(this.getX() - s);

        if (this.#destY > this.getY()) this.setY(this.getY() + s);
        else this.setY(this.getY() - s);
        
        if (this.getX() === player.getX() && this.getY() === player.getY())
        {
            player.setState(false)
        }
        this.lookForPlayer(colGrid,player)
        const arrived = dist(this.getX(), this.getY(), this.#destX, this.#destY) < s;
        if (arrived || colGrid.isOccupied(this.getX(), this.getY())) 
        {
            this.#setPoint();
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
                this.#followPlayer(player)
                return true
            }
        }
        return false
    } 
}