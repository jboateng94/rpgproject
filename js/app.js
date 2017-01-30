
$(document).foundation();

var playerHP = 100;
var enemyHP = 100;
var messageBox = $("textarea#messagebox");

var fightTest = $( "#fight" );

var enemyOptions = [];


function updateMessage(arg) {
	messageBox.html(arg);
}

updateMessage("Enemy health:"+enemyHP);

fightTest.on('click', playerMove);

function playerMove(){
	enemyHP -= 10;
	if(enemyHP <= 0){
		alert("You win!")
	}
	updateMessage("Enemy health:"+enemyHP);
	console.log("Enemy health:"+enemyHP);
	//setTimeout(enemyMove(), 3000);
}

function enemyMove() {
	fightTest.off('click');
	playerHP -= 15;
	if(playerHP <= 0){
		alert("You lose")
	}
	updateMessage("Player health:"+playerHP);
	console.log("Player health:"+playerHP);
	fightTest.on('click', playerMove);
}
