import Phaser from 'phaser'
import { debugDraw } from '../utils/debug'
import { createLizardAnims } from '../anims/EnemyAnims'
import { createCharacterAnims } from '../anims/CharacterAnims'

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
        createLizardAnims(this.anims)

        console.log('hello, Sandra!')
        const map = this.make.tilemap({key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16, 1, 2)

        const ground = map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true})

        //DEBUG wall layer collider
        debugDraw(wallsLayer, this)

        this.faune = this.physics.add.sprite(100,128, 'faune', 'sprites/walk-down/walk-down-3.png')
        this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8)
        
        createCharacterAnims(this.anims)

        this.faune.anims.play('faune-idle-down')

        this.physics.add.collider(this.faune, wallsLayer)

        this.cameras.main.startFollow(this.faune, true)

        //Enemies

        const lizard = this.physics.add.sprite(256, 236, 'lizard', 'lizard_m_idle_anim_f0.png')

        lizard.anims.play('lizard-run')

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
            const parts = this.faune.anims.currentAnim.key.split('-')
            parts[1] = 'idle'
            this.faune.play(parts.join('-'))
            this.faune.setVelocity(0, 0)
        }
    }
}
