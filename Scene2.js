class Scene2 extends Phaser.Scene{
    constructor() {
        super("playGame");
    }
    create() {   
     this.background = this.add.image(0,0,"background");  
     this.background.setOrigin(0,0); 
        
        
        
        
      this.ship1 = this.add.sprite(config.width/2 - 50, config.height/2-100, "ship");  
     this.ship2 = this.add.sprite(config.width/2, config.height/2-100, "ship2");          
    this.ship3 = this.add.sprite(config.width/2 + 50, config.height/2-100, "ship3"); 
        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1)
        this.enemies.add(this.ship2)
        this.enemies.add(this.ship3)
        
         this.powerUps = this.physics.add. group();
    var maxObjests = 40;
        for (var i = 0; i <= maxObjests; i++) {
            var  powerUp = this.physics.add.sprite(16, 16, "power-up");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
             if (Math.random() > 0.5) {
                powerUp.play("red");
            } else {
                powerUp.play("gray")
            }
            powerUp.setVelocity(50, 10);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
            
            
            
            
        }
            
        
       this.ship1.play("ship1_anim"); 
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");
        
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();
    
        this.input.on('gameobjectdown', this.destroyShip, this);
        
        
        
        this.score = 0;
        this.scoreLabel = this.add.text(10,5, "Очки",{font: "12px arial", fill: "white"});
        
        this.player = this.physics.add.sprite(config.width / 2, config.height - 64, "player");
        this.player.play("thrust");
        this.cursorKeys = this.input.keyboard.createCursorKeys();
         this.player.setCollideWorldBounds(true);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();
      this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
          projectile.destroy();
      });
        
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
      
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        
      this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
        
        
        
    }
    pickPowerUp(player, powerUp){
        powerUp.disableBody(true, true);
     this.ultraShoot();
    }
     hurtPlayer(player, enemy){
        this.resetShipPos(enemy);
         if(this.player.alpha<1){
             return;
         }
        var explosion = new Explosion(this, player.x, player.y);
         player.disableBody(true, true);
         this.time.addEvent({
            delay:1000,
            callback:this.resetPlayer,
            callbackScope:this,
            loop:false
         });
     }
    hitEnemy(projectile, enemy) {
        var explosion = new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.resetShipPos(enemy);
        this.score = this.score + 1500000000000000000000000000000000000000000000000000000000000000000000;
        this.scoreLabel.text = "Очки " + this.score;
    }
    
    
    moveShip(ship, speed) {
    ship.y += speed;
     if (ship.y > config.height) { 
     this.resetShipPos(ship);  
     }
    }
    
resetShipPos(ship){
ship.y = 0;
var randomX = Phaser.Math.Between(0,config.width)
ship.x = randomX;
}
    
  destroyShip(pointer, gameObject) { 
  gameObject.setTexture("explosion");  
   gameObject.play("explode"); 
  }
    
    
update(){
 this.moveShip(this.ship1, 3);   
  this.moveShip(this.ship2, 2);  
   this.moveShip(this.ship3, 1); 
    
    this.movePlayerManager();
    
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
        if (this.player.active) {
            this.shootBeam();
        }
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
        var beam = this.projectiles.getChildren()[i];
        beam.update();
    }
}
    movePlayerManager(){
        
        
        
        
        this.player.setVelocity(0);
        
        if(this.cursorKeys.left.isDown){
            this.player.setVelocityX(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.right.isDown){
            this.player.setVelocityX(gameSettings.playerSpeed);
        }
        
        if(this.cursorKeys.up.isDown){
            this.player.setVelocityY(-gameSettings.playerSpeed);
        }else if(this.cursorKeys.down.isDown){
            this.player.setVelocityY(gameSettings.playerSpeed);
        }
        
        
    
            
        }
    
    shootBeam(){
        var beam = new Beam(this);
    }
    
    ultraShoot(){
        var beam = new Beam(this, this.player.x);
        for (var i = 0; i < 10; i++) {
            var beam = new Beam(this, this.player.x+i, 30*i, i*5);
            var beam = new Beam(this, this.player.x-i, -30*i, i*(-5));
        }  
    }
    
  resetPlayer(){
      var x = config.width / 2;
      var y = config.height / 2 + 64;
      this.player.enableBody(true, x, y, true, true);
  this.player.alpha = 0.5;
   var.tween=this.tweens.add({
       targets:this. player,
       y:config.height-64,
       ease:"Power1",
       duration:1500,
       repeat:0
       onCompete:function(){
       this.player.alpha=1
       },
       callbackScope:this                      
   });   
     
                                                                                                                
  }  
}

    
