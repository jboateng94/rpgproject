
$(document).foundation();

var playerHP = 100;
var playerMP = 100;
var playerDmg = 10;
var checkPlayerGuard = false;

var enemyHP = 100;
var enemyMP = 50;

var enemyDmg = 10;

var messageBox = $("textarea#messagebox");

var fightTest = $( "#fight" );
var guardTest = $( "#guard" );

//var playerMagicOptions = {"Glitch slap":20, "Oh damn":30};


function updateMessage(arg) {
	messageBox.html(arg);
}


function buttonInitialisers() {
	fightTest.on('click', playerAttack);
	guardTest.on('click', function() {
		if(checkPlayerGuard === false){
			checkPlayerGuard = true;
			enemyMove();
		}
	});
}

function buttonTerminators() {
	fightTest.off('click');
	guardTest.off('click');
}

updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);


buttonInitialisers();


//Player physical attack logic
function playerAttack(){
	enemyHP -= playerDmg;
	if(enemyHP <= 0){
		alert("You win!")
	}
	updateMessage("Enemy health: "+enemyHP + "   Player health: "+playerHP);
	console.log("Enemy health:"+enemyHP);
	enemyMove();
}


function enemyMove() {
	buttonTerminators();
	if(checkPlayerGuard){
		enemyDmg = Math.ceil(enemyDmg * 0.7);
	}else{
		enemyDmg = 10;
	}
	playerHP -= enemyDmg;
	checkPlayerGuard = false;
	if(playerHP <= 0){
		alert("You lose")
	}
	
	updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);
	console.log("Player health:"+playerHP);
	buttonInitialisers();
}
