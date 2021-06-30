class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
        player1 = createSprite(200,500,30,30);
        //player1.addImage("player1",player_img);
    
        player2 = createSprite(800,500,30,30);
        //player2.addImage("player2", player_img);
        players=[player1,player2];

        health1 = createSprite(10,10,100,10);
        health1.visible = true;

        health2 = createSprite(10,10,100,10);
        health2.visible = true;

        healths = [health1,health2];
    }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                var x = 0;
                var y = 0, w =30,h=30;
                var index = 0;

                for(var plr in allPlayers){
                    players[index].shapeColor = allPlayers[plr].color;
                    x = allPlayers[plr].x;
                    y = allPlayers[plr].y;
                    w = allPlayers[plr].w;
                    h = allPlayers[plr].h;
                    players[index].x = x;
                    players[index].y = y;
                    players[index].width = w;
                    players[index].height = h;
                    healths[index].x = x;
                    healths[index].y = y-100;

                    if(frameCount === 2000){
                        obsGroup.destroyEach();
                    }
                    else {
                        if(index+1 === player.index){
                            for(var i =0;i< 100; i++){ 
                                //obs[i].check(); 
                                if(obs[i].flag === true && 
                                    player.color === obs[i].sprite.shapeColor && 
                                    players[index].isTouching(obs[i].sprite) ){
                                    obs[i].sprite.remove(); 
                                    obs[i].flag = false;
                                    player.w +=5;
                                    player.h +=5;
                                }   
                              }
                        }
                    }
                    index++;
                    
                }
                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.x += 10;
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.x -= 10;
                }
                if (keyIsDown(UP_ARROW) && player.index !== null) {
                    player.y -= 10;   
                }
                if (keyIsDown(DOWN_ARROW) && player.index !== null) {
                    player.y += 10;   
                }
                player.update();

                
                drawSprites();
    }
}
