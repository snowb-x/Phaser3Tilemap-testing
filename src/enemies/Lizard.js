import Phaser from "phaser";

const randomDirection = (exclude) => {
    let newDirection = Phaser.Math.Between(0,3)
    while (newDirection === exclude)
    {
        newDirection = Phaser.Math.Between(0,3)
    }
    return newDirection
}

export default class Lizard extends Phaser.Physics.Arcade.Sprite
{
    direction = 2
    moveEvent

    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('lizard-idle')
        
        scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleTileCollision, this)
        
        this.moveEvent = scene.time.addEvent({
            delay: Phaser.Math.Between(2000,3500),
            callback: () => {
                this.direction = randomDirection(this.direction)  
            },
            loop: true
        })
   }

   destroy(fromscene)
   {
       this.moveEvent.destroy()
       super.destroy(fromscene)
   }

    handleTileCollision(go, tile)
    {
        if (go !== this)
        {
            return
        }
   
        this.direction = randomDirection(this.direction)
    }

    preUpdate(t, dt)
    {
        this.body.onCollide = true
        super.preUpdate(t, dt)
 
        const speed = 50

        switch (this.direction)
        {
            case 0: //up
                this.setVelocity(0, -speed)
                break
            
            case 1: //down
                this.setVelocity(0, speed)
                break
        
            case 2: //left
                this.setVelocity(-speed, 0)
                break
    
            case 3: //right
                this.setVelocity(speed, 0)
                break
                
        }

    }

  
}