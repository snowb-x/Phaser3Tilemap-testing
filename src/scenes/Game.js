import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
    
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors 

    /** @type {Phaser.Physics.Arcade.Sprite} */
    faune

	constructor()
	{
		super('game')
	}

	preload()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        
    }

    create()
    {
        console.log('hello, Sandra!')
        const map = this.make.tilemap({key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')

        const ground = map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true})

        //DEBUG wall collider 
        const debugGraphics = this.add.graphics().setAlpha(0.75)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null, //Colour of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) //Colour of colliding face edges
        })

        this.faune = this.physics.add.sprite(100,128, 'faune', 'sprites/walk-down/walk-down-3.png')
        this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8)
        
        this.anims.create({
            key: 'faune-idle-down',
            frames: [{ key: 'faune', frame: 'sprites/walk-down/walk-down-3.png'}]
        })

        this.anims.create({
            key: 'faune-idle-up',
            frames: [{ key: 'faune', frame: 'sprites/walk-up/walk-up-3.png'}]
        })

        this.anims.create({
            key: 'faune-idle-side',
            frames: [{ key: 'faune', frame: 'sprites/walk-side/walk-side-3.png'}]
        })

        this.anims.create({
            key: 'faune-run-down',
            frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'sprites/run-down/run-down-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'faune-run-up',
            frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'sprites/run-up/run-up-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.anims.create({
            key: 'faune-run-side',
            frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'sprites/run-side/run-side-', suffix: '.png'}),
            repeat: -1,
            frameRate: 15
        })

        this.faune.anims.play('faune-idle-down')

        this.physics.add.collider(this.faune, wallsLayer)
    }

    update(t, dt)
    {
        if(!this.cursors || !this.faune)
        {
            return
        }

        const speed = 100

        if (this.cursors.left.isDown)
        {
            this.faune.anims.play('faune-run-side', true)
            this.faune.setVelocity(-speed, 0)

            this.faune.scaleX = -1
            this.faune.body.setOffset(24,4)
        }
        else if (this.cursors.right.isDown)
        {
            this.faune.anims.play('faune-run-side', true)
            this.faune.setVelocity(speed, 0)

            this.faune.scaleX = 1
            this.faune.body.setOffset(8,4)
        }
        else if (this.cursors.up.isDown)
        {
            this.faune.anims.play('faune-run-up', true)
            this.faune.setVelocity(0, -speed)
        }
        else if (this.cursors.down.isDown)
        {
            this.faune.anims.play('faune-run-down', true)
            this.faune.setVelocity(0, speed)
        }
        else
        {
            this.faune.anims.play('faune-idle-down', true)
            this.faune.setVelocity(0, 0)

            this.faune.scaleX = 1
            this.faune.body.setOffset(8,4)
        }
    }
}
