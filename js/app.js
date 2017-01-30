
$(document).foundation();

var playerHP = 100;
var playerMP = 100;

var enemyHP = 100;
var enemyMP = 50;

var messageBox = $("textarea#messagebox");

var fightTest = $( "#fight" );

//var playerMagicOptions = {"Glitch slap":20, "Oh damn":30};


function updateMessage(arg) {
	messageBox.html(arg);
}



function buttonInitialisers() {
	fightTest.on('click', playerAttack);
}

updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);

buttonInitialisers();

//Player physical attack logic
function playerAttack(){
	enemyHP -= 20;
	if(enemyHP <= 0){
		alert("You win!")
	}
	updateMessage("Enemy health: "+enemyHP + "   Player health: "+playerHP);
	console.log("Enemy health:"+enemyHP);
	enemyMove();
}



function enemyMove() {
	fightTest.off('click');
	playerHP -= 15;
	if(playerHP <= 0){
		alert("You lose")
	}
	updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);
	console.log("Player health:"+playerHP);
	buttonInitialisers();
}
