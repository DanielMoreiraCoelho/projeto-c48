var player, playerIMG
var obstaculos, grupoDeObstaculos;
var aveIMG1, aveIMG2, pocaAguaIMG, fuscaAzulIMG;
var ground, groundIMG;
var button, jogarDNV;
var estadoDejogo = 0;
var fundoIMG;
var life = 1;
var score = 0;
var framePonto = 0;

function preload(){
  aveIMG1 = loadImage("./imagens/gaivota.png");

  fundoIMG = loadImage("./imagens/cidade.jpg");

  playerIMG = loadImage("./imagens/meninoCorrendo.png");

  aveIMG2 = loadImage("./imagens/aguiaDeRapina.png");

  pocaAguaIMG = loadImage("./imagens/poçaDeAgua.png");

  fuscaAzulIMG = loadImage("./imagens/fusca azul.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  player = createSprite(50, height-120, 25, 50);
  //player.setCollider("rectangle", 0, 0, 1150, 1800);
  player.debug = true
  player.shapeColor = "red";
  player.addImage(playerIMG);
  player.scale = 0.1;

  ground = createSprite(40, height-50, 600, 25);
  ground.visible = false;


  button = createButton("jogar");
  button.position(width/2, height/2);

  jogarDNV = createButton("jogar novamente");
  jogarDNV.position(width/2, height/2);
  jogarDNV.hide();

  grupoDeObstaculos= new Group();
}

function draw(){
  background("gray");

  if(estadoDejogo === 0){
    background("white");
    textSize(75);
    text("clique para jogar", width/2, height/2 -20);
    button.mousePressed(() =>{
      button.hide();
      estadoDejogo = 1;
    })
  }

  if(estadoDejogo === 1){
    background(fundoIMG);
    textSize(30);
    text("pontos:"+score, 50, 50);
    gerarObstaculos();
    console.log(framePonto)


    player.x = 50;

    //pulo do jogador
    if(keyDown("space") && player.y > 600){
      player.velocityY = -15;
    }

    //detectar a colisao
    if(grupoDeObstaculos.isTouching(player)){
      grupoDeObstaculos.destroyEach();

      life = 0;
      estadoDejogo = 2;
      player.velocityY = 0;

    }

    //quando o jogador ganha
    if(score === 100000){
      grupoDeObstaculos.destroyEach();
      estadoDejogo = 3;
      player.velocityY = 0;
    }

    //contagem de pontos
    score = frameCount - framePonto;

    player.velocityY = player.velocityY +0.5;
    player.collide(ground);
    drawSprites();
  }

  if(estadoDejogo === 2){
    framePonto = frameCount;

    background("black");
    textSize(75);
    text("voce perdeu", width/2, height/2 -20);

    jogarDNV.show();
    jogarDNV.mousePressed(() => {
      jogarDNV.hide();

      estadoDejogo = 1;
      life = 1;
      score = 0;
    })
  }

  if(estadoDejogo === 3){
    framePonto = frameCount;

    background("white");
    textSize(75);
    text("voce chegou em casa", width/2, height/2 -20);

    jogarDNV.show();
    jogarDNV.mousePressed(() => {
      jogarDNV.hide();

      estadoDejogo = 1;
      life = 1;
      score = 0;
    })
  }
}

function gerarObstaculos(){
 
    
    //gerar gaivotas
    if(frameCount% 250 === 0){
      obstaculos = createSprite(width, random(150, height-100), 15, 15);
      obstaculos.scale = 0.1;
      obstaculos.velocityX = -5;
      obstaculos.addImage(aveIMG1);
      obstaculos.debug = true;
      
      grupoDeObstaculos.add(obstaculos);
    }
    
    //gerar aguia
    if(frameCount% 1550 === 0){
      obstaculos = createSprite(width, height-300, 15, 15);
      obstaculos.scale = 0.1;
      obstaculos.addImage(aveIMG2);
      obstaculos.velocityX = -25;
      obstaculos.debug = true;
      
      grupoDeObstaculos.add(obstaculos);
    }

        //gerar fusca
        if(frameCount% 100 === 0){
          obstaculos = createSprite(width, height-150, 15, 15);
          obstaculos.scale = 0.3;
          obstaculos.addImage(fuscaAzulIMG);
          obstaculos.velocityX = -10;
          obstaculos.debug = true;
          
          grupoDeObstaculos.add(obstaculos);
        }


}