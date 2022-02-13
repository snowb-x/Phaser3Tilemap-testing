import Phaser from "phaser";

const  IDEL = 'IDEL'
const  DAMAGE = 'DAMAGE'

export default class Faune extends Phaser.Physics.Arcade.Sprite
{
    healthState = 'IDEL'
    damageTime = 0
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('faune-idle-down')

    }

    handledamage(dir)
    {
        if(this.healthState === 'DAMAGE')
        {
            return
        }
        this.setVelocity(dir.x, dir.y)
        this.setTint(0xff0000)
        this.healthState = 'DAMAGE'
        this.damageTime = 0
    }

    preUpdate(t, dt)
    {
        switch (this.healthState)
        {
            case 'IDLE':
                break
            case 'DAMAGE':
                console.log(this.damageTime)
                this.damageTime += dt 
                if(this.damageTime >= 250)
                {
                    this.healthState = 'IDEL'
                    this.setTint(0xffffff)
                    this.damageTime = 0
                }
                break
        }
    }

    update(cursors)
    {
        if(this.healthState === 'DAMAGE')
        {
            return
        }
        if(!cursors || !this)
        {
            return
        }

        const speed = 100

        if (cursors.left.isDown)
        {
            this.anims.play('faune-run-side', true)
            this.setVelocity(-speed, 0)

            this.scaleX = -1
            this.body.setOffset(24,4)
        }
        else if (cursors.right.isDown)
        {
            this.anims.play('faune-run-side', true)
            this.setVelocity(speed, 0)

            this.scaleX = 1
            this.body.setOffset(8,4)
        }
        else if (cursors.up.isDown)
        {
            this.anims.play('faune-run-up', true)
            this.setVelocity(0, -speed)
        }
        else if (cursors.down.isDown)
        {
            this.anims.play('faune-run-down', true)
            this.setVelocity(0, speed)
        }
        else
        {
            const parts = this.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.play(parts.join('-'))
            this.setVelocity(0, 0)
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('faune', function(x, y, texture, frame){
    
    var sprite = new Faune(this.scene, x,y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    return sprite

})
