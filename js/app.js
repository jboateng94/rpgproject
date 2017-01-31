
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
var magicTest = $( "#magic" );

//var playerMagicOptions = {"Glitch slap":20, "Oh damn":30};


function updateMessage(arg) {
	messageBox.html(arg);
}


function buttonInitialisers() {
	fightTest.on('click', playerAttack);
	guardTest.on('click', playerGuard);
	magicTest.on('click', playerMagic);
}

function buttonTerminators() {
	fightTest.off('click');
	guardTest.off('click');
	magicTest.off('click');
}

function variableReset() {
	playerDmg = 10;
	checkPlayerGuard = false;
	enemyDmg = 10;
}

updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);


buttonInitialisers();


//Player physical attack logic
function playerAttack(){
	enemyHP -= playerDmg;
	
	//updateMessage("Enemy health: "+enemyHP + "   Player health: "+playerHP);
	console.log("Enemy health:"+enemyHP);
	enemyMove();
}

function playerGuard() {
	if(checkPlayerGuard === false){
		checkPlayerGuard = true;
		enemyMove();
	}
}

// Adds magic system, allows player to access magic submenu
// and access spells, or go back to the main battle menu

function playerMagic() {
	var firsMenu = $('#first-menu');
	firsMenu.css('display','none');

	var magicMenu = $('#magic-menu');
	magicMenu.css('display','inline');

	$('a#glitch-slap').on('click',function(){
		playerDmg = 30;
		playerMP  = playerMP-20;
		enemyHP -= playerDmg;
		updateMessage("Player health: "+playerHP+
			"	Enemy health: "+enemyHP+'	Player MP: '+playerMP);
		console.log("Player health:"+playerHP);
		magicMenu.css('display','none');
		firsMenu.css('display','inline');
		winLogic();
		enemyMove();
	});

	$('a#ora').on('click',function(){
		playerDmg = 20;
		playerMP = playerMP-10;
		enemyHP -= playerDmg;
		updateMessage("Player health: "+playerHP+
			"	Enemy health: "+enemyHP+'	Player MP: '+playerMP);
		console.log("Player health:"+playerHP);
		magicMenu.css('display','none');
		firsMenu.css('display','inline');
		winLogic();
		enemyMove();
	});

	$('a#magic-back').on('click',function() {
		magicMenu.css('display','none');
		firstMenu.css('display','inline');
	});
}

	

function enemyMove() {
	buttonTerminators();
	if(checkPlayerGuard){
		enemyDmg = Math.ceil(enemyDmg * 0.4);
	}else{
		enemyDmg = 10;
	}
	playerHP -= enemyDmg;
	
	
	updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);
	console.log("Player health:"+playerHP);
	variableReset();
	buttonInitialisers();
}

function winLogic() {
	if(enemyHP <= 0){
		alert("You win!");
		return true;
	}else if(playerHP <= 0){
		alert("You lose");
		return true
	}else{
		return false;
	}
}
