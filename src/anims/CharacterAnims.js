import Phaser from "phaser";

const createCharacterAnims = (anims) => {
    anims.create({
        key: 'faune-idle-down',
        frames: [{ key: 'faune', frame: 'sprites/walk-down/walk-down-3.png'}]
    })

    anims.create({
        key: 'faune-idle-up',
        frames: [{ key: 'faune', frame: 'sprites/walk-up/walk-up-3.png'}]
    })

    anims.create({
        key: 'faune-idle-side',
        frames: [{ key: 'faune', frame: 'sprites/walk-side/walk-side-3.png'}]
    })

    anims.create({
        key: 'faune-run-down',
        frames: anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'sprites/run-down/run-down-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'faune-run-up',
        frames: anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'sprites/run-up/run-up-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'faune-run-side',
        frames: anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'sprites/run-side/run-side-', suffix: '.png'}),
        repeat: -1,
        frameRate: 15
    })

}

export {
    createCharacterAnims
}