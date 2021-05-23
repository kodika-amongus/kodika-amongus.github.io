class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene, customX, velocityX, angle){
        
        if (customX || customX == 0) {
            var x = customX;
        } else {
            var x = scene.player.x;
        }
            var y = scene.player.y;
               
        super(scene, x, y, "beam");
        scene.add.existing(this);
        scene.projectiles.add(this);
        
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250;
        if (velocityX) this.body.velocity.x = velocityX;
        if (angle) this.angle = angle;
        
        
    }
    
    update(){
        if(this.y < 0 ){
            this.destroy();
        }
    }
}