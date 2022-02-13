import Phaser from "phaser"

const debugDraw = (layer, scene) => {
      //DEBUG wall collider 
      const debugGraphics = scene.add.graphics().setAlpha(0.75)
      layer.renderDebug(debugGraphics, {
          tileColor: null, //Colour of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255) //Colour of colliding face edges
      })

}

export {
    debugDraw
}