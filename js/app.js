
$(document).foundation();

var playerHP = 100;
var playerMP = 100;
var playerDmg = 10;
var checkPlayerGuard = false;
var playerInventory = ['p','e','p','e','e'];


var enemyHP = 100;
var enemyMP = 50;

var enemyDmg = 10;

var messageBox = $("textarea#messagebox");

var fightTest = $( "#fight" );
var guardTest = $( "#guard" );
var magicTest = $( "#magic" );
var itemTest = $( "#item" );

var firstMenu = $('#first-menu');

//var playerMagicOptions = {"Glitch slap":20, "Oh damn":30};


function updateMessage(arg) {
	messageBox.html(arg);
}


function buttonInitialisers() {
	fightTest.on('click', playerAttack);
	guardTest.on('click', playerGuard);
	magicTest.on('click', playerMagic);
	itemTest.on('click', playerItem);
}

function buttonTerminators() {
	fightTest.off('click');
	guardTest.off('click');
	magicTest.off('click');
	itemTest.off('click');
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
	winLogic();
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
	
	firstMenu.css('display','none');

	var magicMenu = $('#magic-menu');
	magicMenu.css('display','inline');

	function magicReset() {
		updateMessage("Player health: "+playerHP+
			"	Enemy health: "+enemyHP+'	Player MP: '+playerMP);
		console.log("Player health:"+playerHP);
		magicMenu.css('display','none');
		firstMenu.css('display','inline');
	}

	$('a#glitch-slap').on('click', () => {
		playerDmg = 30;
		playerMP  = playerMP-20;
		enemyHP -= playerDmg;
		winLogic();
		magicReset();
		enemyMove();
	});

	$('a#ora').on('click',function(){
		playerDmg = 20;
		playerMP = playerMP-10;
		enemyHP -= playerDmg;
		winLogic();
		magicReset();
		enemyMove();
	});

	$('a#magic-back').on('click',function() {
		magicReset();
	});
}



function playerItem() {

	firstMenu.css('display','none');

	var itemMenu = $('#item-menu');
	itemMenu.css('display','inline');

	function itemReset() {
		itemMenu.css('display','none');
		firstMenu.css('display','inline');
	}

	$('#potion').on('click', () =>{
		// for (var i of playerInventory) {
		// 	var index = playerInventory.indexOf(i);
		// 	if(i === 'p'){
		// 		playerHP += 10;
		// 		updateMessage('Used 1 potion, restored 10HP');
		// 		console.log("Used 1 potion, restored 10HP, player health: " +playerHP)
		// 		playerInventory.splice(index,1);
		// 		break;
		// 	}else{
		// 		updateMessage('No potions available...');
		// 		console.log('No potions available...');
		// 	}
		// }
		inventoryCheck('p');
		itemReset();
	});

	$('#ether').on('click', () =>{
		inventoryCheck('e');
		itemReset();
	});

	function inventoryCheck(arg) {
		for (var i of playerInventory) {
			var index = playerInventory.indexOf(i);
			if(i === arg){
				if(i === 'p'){
					playerHP += 10;
					updateMessage('Used 1 potion, restored 10HP');
					console.log("Used 1 potion, restored 10HP, player health: " +playerHP);
					playerInventory.splice(index,1);
					break;
				}else if(i === 'e'){
					playerMP += 10;
					updateMessage('Used 1 ether, restored 10MP');
					console.log("Used 1 ether, restored 10MP, player magic: " +playerMP);
					playerInventory.splice(index,1);
					break;
				}
			}else{
				updateMessage('None left...');
				console.log('No '+arg+' available...');
			}
		}
		itemReset();
	}

	$('a#item-back').on('click',function() {
		itemReset();
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
	winLogic();
	updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);
	console.log("Enemy health: "+enemyHP);
	variableReset();
	buttonInitialisers();
}

function winLogic() {
	if(enemyHP <= 0){
		alert("You win!");
		endValues();
		// return true;
	}else if(playerHP <= 0){
		alert("You lose");
		endValues();
		// return true
	}else{
		// return false;
	}
}

function endValues() {
	playerHP = 0;
	playerMP = 0;
	enemyHP = 0;
	enemyMP =0;
}


// change all vars to lets and consts (lets can change, consts can't)
// anonymous functions use arrow syntax
// 
