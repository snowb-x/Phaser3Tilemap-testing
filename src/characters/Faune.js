import Phaser from "phaser";



export default class Faune extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame)

        this.anims.play('faune-idle-down')
    }
}

Phaser.GameObjects.GameObjectFactory.register('faune', function(x, y, texture, frame){
    
    var sprite = new Faune(this.scene, x,y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

    return sprite

})
