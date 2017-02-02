
$(document).foundation();

let playerHP = 250;
let playerMP = 100;
let playerDmg = 10;
let checkPlayerGuard = false;
let playerInventoryPotion = ['p','p','p'];
let playerInventoryEther = ['e','e','e'];


let enemyHP = 400;
let enemyMP = 50;
let enemyDmg = 5;
let enemyInventory = ['p','e','p','e'];


let messageBox = $("textarea#messagebox");


let firstMenu = $('#first-menu');

let fightTest = $( "#fight" );

let guardTest = $( "#guard" );

let magicTest = $( "#magic" );
let magicMenu = $('#magic-menu');

let itemTest = $( "#item" );
let itemMenu = $('#item-menu');

let enemyMoves = [enemyAttack,enemyItems,enemyMagic];
let displayEnemy = $('img#display-enemy');



$(".hover").mouseenter(function() {
	var audio = $("audio")[0];
	audio.play();
});

$(".enter").click(function() {
	var enter = $("#audio9")[0];
	enter.play();
});

magicButtonInitialisers();
itemButtonInitialisers();

//let playerMagicOptions = {"Glitch slap":20, "Oh damn":30};


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

function valueReset() {
	playerDmg = 10;
	checkPlayerGuard = false;
	enemyDmg = 10;
}



$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

updateMessage("Player health: "+playerHP+"  Player MP: "+playerMP+"	 Enemy health: "+enemyHP+"  Enemy MP: "+enemyMP);

buttonInitialisers();


//Player physical attack logic
function playerAttack(){
	enemyHP -= playerDmg;
	var hit = $("#audio2")[0];
	hit.play();
	displayEnemy.animateCss('shake');
	winLogic();
	console.log("playerAttack Enemy health:"+enemyHP);
	enemyTurn();
}

function playerGuard() {
	if(checkPlayerGuard === false){
		checkPlayerGuard = true;
		enemyTurn();
	}

}

// Adds magic system, allows player to access magic submenu
// and access spells, or go back to the main battle menu

function playerMagic() {
	
	firstMenu.css('display','none');
	magicMenu.css('display','inline');
}

function magicButtonInitialisers() {
	$('#magic-menu').on('click', '#glitch-slap', () => {
		spellCast('g');
		
	});

	$('#magic-menu').on('click', '#ora', () => {
		spellCast('o');
	});

	$('#magic-menu').on('click', '#magic-back',()  => {
		magicReset();
	});
}

function magicButtonTerminators(){
	$('#magic-menu').off('click')
}
function itemButtonTerminators(){}


function magicReset() {
	console.log("magicReset Player health:"+playerHP);
	magicMenu.css('display','none');
	firstMenu.css('display','inline');
}

function spellCast(arg) {
	//magicButtonTerminators();
	if(playerMP <= 0){
		updateMessage("Can't cast, need MP");
	}else{
		if(arg === 'g'){
			mpCost = 20;
			if(playerMP - mpCost <= 0){
				updateMessage('Not enough MP');
			}else{
				var slap = $("#audio3")[0];
				slap.play();
				displayEnemy.animateCss('swing');
				console.log('glitch-slap')
				playerDmg = 30;
				playerMP  = playerMP-20;
				dmgResetNextTurn();
			}
		}else if(arg === 'o'){
			var yes = $("#audio6")[0];
			yes.play();
			console.log('ora');
			playerDmg = 20;
			playerMP = playerMP-10;
			dmgResetNextTurn();
		}
	}
}

function dmgResetNextTurn() {
	enemyHP -= playerDmg;
	winLogic();
	magicReset();
	enemyTurn();
}



//let test = [0,1,2,3,2,5,8,2,9];

function playerItem() {

	firstMenu.css('display','none');
	itemMenu.css('display','inline');
}

function itemButtonInitialisers() {
	$('#potion').on('click', () => {
		inventoryCheck('p');
	});

	$('#ether').on('click', () => {
		inventoryCheck('e');
		
	});

	$('a#item-back').on('click',() => {
		itemReset();
	});	
}

function itemButtonTerminators() {
	$('#potion').off('click');
	$('#ether').off('click');	
}

function itemReset() {
	itemMenu.css('display','none');
	firstMenu.css('display','inline');
}

function inventoryCheck(arg) {

	if(arg === 'p'){
		console.log("Potions: "+playerInventoryPotion);
		console.log('potion index: '+playerInventoryPotion.indexOf('p'));
		if(playerInventoryPotion.indexOf('p') === -1){
			updateMessage('No potions left...');
		}else{
			var pot = $("#audio7")[0];
			pot.play();
			playerHP += 20;
			updateMessage('Used 1 potion, restored 10HP');
			console.log("potion use player health: " +playerHP);
			playerInventoryPotion.pop();
			itemReset();
			enemyTurn();
		}
	}else if(arg === 'e'){
		console.log("Ether: "+playerInventoryEther);
		console.log('ether index: '+playerInventoryEther.indexOf('e'));
		if(playerInventoryEther.indexOf('e') === -1){
			updateMessage('No ethers left...');
		}else{
			var eth = $("#audio8")[0];
			eth.play();
			playerMP += 10;
			updateMessage('Used 1 ether, restored 10MP');
			console.log("ether used player magic: " +playerMP);
			playerInventoryEther.pop();
			itemReset();
			enemyTurn();
		}
	}
}

function enemyTurn() {
	buttonTerminators();

	let move = randomizeForEnemy(enemyMoves);
	move();
	

	winLogic();

	updateMessage("Player health: "+playerHP+"  Player MP: "+playerMP+"	 Enemy health: "+enemyHP+"  Enemy MP: "+enemyMP);
	console.log("enemyTurn Enemy health: "+enemyHP+"  Player HP: "+playerHP);

	if(move === enemyItems && checkPlayerGuard){
		updateMessage('You tried to guard, but the enemy used an item.');
	}
	winLogic();
	valueReset();
	buttonInitialisers();
}
var block = $("#audio5")[0];
	
function enemyAttack() {
	console.log('enemyAttack');
	if(checkPlayerGuard){
		block.play();
		enemyDmg = Math.ceil(enemyDmg * 0.4);
	}else{
		enemyDmg = enemyDmg = 5;
	}
	return playerHP -= enemyDmg;
}

function enemyMagic() {
	console.log('enemyMagic');
	let mpCost = 20;
	if(enemyMP - mpCost < 0){
		updateMessage('Enemy has no MP...')
		enemyDmg = 0;
		return playerHP -= enemyDmg;
	}else{
		if(checkPlayerGuard){
			block.play();
			enemyDmg = Math.ceil(mpCost * 0.4);
			enemyMP = enemyMP - mpCost;
		}else{
			enemyDmg = mpCost;
			enemyMP = enemyMP - mpCost;
		}
	}
	
	return playerHP -= enemyDmg;
}

function enemyItems() {
	console.log('enemyItems');
	
	let randItem = randomizeForEnemy(enemyInventory);
	if(enemyInventory === 0){
		updateMessage('Enemy has not items...');
	}else if(randItem === 'p'){
		enemyHP = enemyHP + 20;
		enemyInventory.splice(enemyInventory.indexOf(randItem),1);
	}else if(randItem === 'e'){
		enemyMP = enemyMP + 10;
		enemyInventory.splice(enemyInventory.indexOf(randItem),1);
	}
}

function randomizeForEnemy(arg) {
	return arg[Math.floor(Math.random() * arg.length)];
}

function winLogic() {
	if(enemyHP <= 0){

		setTimeout(displayEnemy.animateCss('fadeOut'), 3000);
		updateMessage("You win! Please refresh to play again");
		var win = $("#audio11")[0];
		win.play();
		winEndValues();
	}else if(playerHP <= 0){
		
		updateMessage("You lose...please refersh to try again");
		var lose = $("#audio10")[0];
		lose.play();
		loseEndValues();
	}

}

function terminateAllButtons() {
	buttonTerminators();
	magicButtonTerminators();
	itemButtonTerminators();
}

function winEndValues() {
	playerMP = 0;
	enemyHP = 0;
	enemyMP =0;
	enemyInventory = [];

	terminateAllButtons();
}

function loseEndValues() {
	
	playerHP = 0;
	playerMP = 0;
	enemyMP =0;

	terminateAllButtons();
}


// change all vars to lets and consts (lets can change, consts can't)
// anonymous functions use arrow syntax
// 
