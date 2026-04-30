class Character extends GameObject
{
    #speed
    #angle 
    #walkSheet
    #attackSheet
    #damage

    constructor(x,y,walkSheet,attackSheet,damage)
    {
        super(x,y,width,height)
        this.#speed = 10;
        this.#angle = 0;
        this.#walkSheet = walkSheet
        this.#attackSheet = attackSheet
        this.#damage = damage
    }

    moveX(distance)
    {
        let val = this.getX()
        this.setX(val += (this.#speed * distance))
    }

    moveY(distance)
    {
        let val = this.getY()
        this.setY(val += (this.#speed * distance))
    }

    setAngle(value)
    {
        this.#angle = value
    }

    setSpeed(value)
    {
        this.#speed = value
    }

    setDamage(value)
    {
        this.#damage = value
    }

    getAngle()
    {
        return(this.#angle)
    }

    getWalkSheet()
    {
        return(this.#walkSheet)
    }

    getAttackSheet()
    {
        return(this.#attackSheet)
    }

    getSpeed()
    {
        return(this.#speed)
    }

    getDamage()
    {
        return(this.#damage)
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
    #damage

    constructor(x,y,attackSheet,walkSheet,damage)
    {
        super(x,y,walkSheet,attackSheet,damage)
        this.#movementState = true 
        this.#attackSheet = attackSheet
        this.#attackFrame = 0
        this.#attackTimer = 0
        this.#isAttacking = false
        this.#walkFrame = 0
        this.#walkTimer = 0
        this.#score = 0
        this.#state = false
        this.#health = 200
        this.#damage = damage
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
        swordSwoosh.play()
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
        this.setAngle(atan2(mouseY - (this.getY() + 25), mouseX - (this.getX() + 25)) - HALF_PI)
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

    healthPowerUp(healthGrid)
    {
        if (healthGrid.isOccupied(this.getX() + 25, this.getY() + 25))
        {
            this.setHealth(200)
            healthGrid.setCellFromCord(this.getX() + 25, this.getY() + 25,false)
        }
    }

    draw(grid,healthGrid) 
    {
        if(this.checkHealth())
        {
            this.healthPowerUp(healthGrid)
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
    #velX
    #velY
    #walkFrame
    #walkTimer
    #health
    #bullets
    #bulletSpeed
    #attackFrame
    #attackTimer
    #isAttacking
    #bloodSplatter
    #deadSprite
    #attackCooldown
    #damage

    constructor(x,y,speed,walkSheet,attackSheet,bloodSplatter,deadSprite,damage)
    {
        super(x,y,walkSheet,attackSheet,damage)
        this.#health = 100
        this.#state = true
        this.#walkFrame = 0
        this.#walkTimer = 0
        this.#bullets = []
        this.#bulletSpeed = 40
        this.setSpeed(speed)
        this.#damage = damage
        this.#bloodSplatter = bloodSplatter
        this.#deadSprite = deadSprite
        this.#attackCooldown = 0
        let angle = Math.random() * Math.PI * 2
        this.#velX = Math.cos(angle) * speed
        this.#velY = Math.sin(angle) * speed
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

    getHealth()
    {
        return(this.#health)
    }

    getState()
    {
        return(this.#state)
    }

    getWalkFrame()
    {
        return(this.#walkFrame)
    }

    getBloodSplatter()
    {
        return(this.#bloodSplatter)
    }

    getDead()
    {
        return(this.#deadSprite)
    }

    setEnemyHealth(input)
    {
        this.#health = input
    }

    setEnemyState(input)
    {
        this.#state = input
    }

    getAttackFrame()
    {
        return(this.#attackFrame)
    }

    getAttackState()
    {
        return(this.#isAttacking)
    }

    startAttack()
    {
        swordSwoosh.play()
        this.#isAttacking = true
        this.#attackFrame = 0
        this.#attackTimer = 0
    }

    #animateAttack()
    {    
        this.#attackTimer++
        if (this.#attackTimer >= 8)
        {
            this.#attackFrame++
            this.#attackTimer = 0
            this.damagePlayer(player, this.getDamage())
            if (this.#attackFrame >= 7)
            {
                this.#attackFrame = 0
                this.#isAttacking = false
                this.#attackCooldown = 120
            }
        }
    }

    checkDamage(player)
    {
        if (player.getAttackFrame() === 4 && dist(player.getX(), player.getY(), this.getX(), this.getY()) < 80)
        {
            this.#health -= 10;
            if (this.#health <= 0)
            {
                grunt.play()
                enemyCount--
                this.#state = false;
                player.setScore(player.getScore() + 1)
            }
        }
    }

    shoot()
    {
        if (frameCount % 10 === 0)
        {
            gunShot.play()
            let bullet = new Bullet(this.getX(), this.getY() + 15, this.getAngle(), this.#bulletSpeed)
            this.#bullets.push(bullet)
        }
    }

    drawBullets(player,colGrid)
    {
        for (let i = this.#bullets.length - 1; i >= 0; i--)
        {
            this.#bullets[i].draw()
            if (dist(this.#bullets[i].getX(), this.#bullets[i].getY(), player.getX(), player.getY()) < 50)
            {
                this.damagePlayer(player, this.getDamage())
                this.#bullets.splice(i, 1)
            }
            else if (colGrid.isOccupied(this.#bullets[i].getX(),this.#bullets[i].getY()))
            {
                this.#bullets.splice(i,1)
            }
        }
    }

    draw(player, colGrid)
    {   
        if (this.#state)
        {
            this.checkDamage(player)
            this.patrol(colGrid, player)
            this.#animateWalk()
            this.setAngle(atan2(this.#velY, this.#velX) - HALF_PI)
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
                    rect(-32.5, 0, 7, this.#health / 2)
                    if (this.#isAttacking)
                    {
                        this.#animateAttack()
                        let sx = this.#attackFrame * 58
                        image(this.getAttackSheet(), -75, -75, 150, 150, sx, 0, 58, 60)
                    }
                    else
                    {
                        let sx = this.#walkFrame * 60
                        image(this.getWalkSheet(), -75, -75, 150, 150, sx, 0, 60, 60)
                    }
                pop()
            pop()
        }
        else
        {
            image(this.getBloodSplatter(),this.getX(),this.getY(),150,150)
            image(this.getDead(),this.getX(),this.getY(),125,125)
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

        if (blockedLeft || blockedRight) this.#velX *= -1
        if (blockedUp   || blockedDown)  this.#velY *= -1

        this.setX(this.getX() + this.#velX)
        this.setY(this.getY() + this.#velY)

        if (this.lookForPlayer(colGrid, player))
        {
            this.#velX += (player.getX() - this.getX()) * 0.005
            this.#velY += (player.getY() - this.getY()) * 0.005
            let currentSpeed = Math.sqrt(this.#velX ** 2 + this.#velY ** 2)
            if (currentSpeed > s * 1.3)
            {
                this.#velX = (this.#velX / currentSpeed) * s * 1.3
                this.#velY = (this.#velY / currentSpeed) * s * 1.3
            }
        }
    }

    triggerAttack(player)
    {
        if (this.#attackCooldown > 0) { this.#attackCooldown--; return }
        if (abs(this.getX() - player.getX()) < 50 && abs(this.getY() - player.getY()) < 50)
        {
            if (!this.#isAttacking)
            {
                this.startAttack()
            }  
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

    logic(player,colGrid)
    {
        this.triggerAttack(player)
        this.draw(player,colGrid)
    }

    damagePlayer(player, damage)
    {
        player.setHealth(player.getHealth() - damage)
    }
}

class ShootingEnemy extends Enemy
{
    constructor(x,y,speed,walkSheet,bloodSplatter,deadSprite,damage)
    {
        super(x,y,speed,walkSheet,walkSheet,bloodSplatter,deadSprite,damage)
    }

    logic(player, colGrid)
    {
        if (this.getState())
        {
            if (this.lookForPlayer(colGrid, player))
            {
                this.setAngle(atan2(player.getY() - (this.getY() + 25), player.getX() - (this.getX() + 25)) - HALF_PI)
                this.shoot()
            }
            this.checkDamage(player)
            this.drawBullets(player,colGrid)
        }
        this.draw(player, colGrid)
    }
}

