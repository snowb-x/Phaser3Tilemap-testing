import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super('game')
	}

	preload()
    {
        
    }

    create()
    {
        console.log('hello, Sandra!')
        const map = this.make.tilemap({key: 'dungeon' })
        const tileset = map.addTilesetImage('dungeon', 'tiles')

        const ground = map.createLayer('Ground', tileset)
        const wallsLayer = map.createLayer('Walls', tileset)

        wallsLayer.setCollisionByProperty({ collides: true})

        const debugGraphics = this.add.graphics().setAlpha(0.75)
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null, //Colour of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) //Colour of colliding face edges
        })
    }
}
