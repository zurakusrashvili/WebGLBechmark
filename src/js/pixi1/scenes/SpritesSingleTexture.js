import IScene from './IScene.js';
import * as PIXI from 'pixi.js'; // Import PIXI

export default class SpritesSingleTexture extends IScene {
    constructor(app, gui) {
        super(app, gui);
        this.title = 'Sprites: Single Texture';
        this.description = 'A single bunny texture is used; this scene should test the basic raw sprite rendering power.';
    }

    _create(objectCount) {
        for (let i = 0; i < objectCount; ++i) {
            const sprite = PIXI.Sprite.from('images/bunny1.png');
            sprite.anchor.set(0.5);
            sprite.position.set(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
            this._app.stage.addChild(sprite);
        }
    }

    _destroy() {
        while (this._app.stage.children.length > 0) {
            this._app.stage.removeChildAt(0); // Remove children from the stage
        }
    }

    // Inherit 'start' and 'stop' methods from IScene without changes
}
