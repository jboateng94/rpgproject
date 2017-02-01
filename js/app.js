
$(document).foundation();

let playerHP = 250;
let playerMP = 100;
let playerDmg = 10;
let checkPlayerGuard = false;
let playerInventory = ['p','e','p','e','e','p'];


let enemyHP = 500;
let enemyMP = 50;

let enemyDmg = 5;

let messageBox = $("textarea#messagebox");

let firstMenu = $('#first-menu');

let fightTest = $( "#fight" );

let guardTest = $( "#guard" );

let magicTest = $( "#magic" );
let magicMenu = $('#magic-menu');

let itemTest = $( "#item" );
let itemMenu = $('#item-menu');

let enemyMoves = [enemyAttack,enemyItems,enemyMagic];


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

updateMessage("Player health: "+playerHP+"	Enemy health: "+enemyHP);


buttonInitialisers();


//Player physical attack logic
function playerAttack(){
	enemyHP -= playerDmg;
	winLogic();
	updateMessage("Enemy health: "+enemyHP + "   Player health: "+playerHP);
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

function magicReset() {
	// updateMessage("Player health: "+playerHP+
	// 	"	Enemy health: "+enemyHP+'	Player MP: '+playerMP);
	console.log("magicReset Player health:"+playerHP);
	magicMenu.css('display','none');
	firstMenu.css('display','inline');
	//buttonInitialisers();
}

function spellCast(arg) {
	//magicButtonTerminators();
	if(playerMP <= 0){
		updateMessage("Can't cast, need MP");
	}else{
		if(arg === 'g'){
			console.log('glitch-slap')
			playerDmg = 30;
			playerMP  = playerMP-20;
			enemyHP -= playerDmg;
			winLogic();
			enemyTurn()
			
		}else if(arg === 'o'){
			console.log('ora');
			playerDmg = 20;
			playerMP = playerMP-10;
			enemyHP -= playerDmg;
			winLogic();
			enemyTurn();
			//dmgCheckReset();		
		}
	}
}

function magicButtonInitialisers() {
	$('#magic-menu').on('click', '#glitch-slap', () => {
		spellCast('g');
		magicReset();
	});

	$('#magic-menu').on('click', '#ora', () => {
		spellCast('o');
		magicReset();
	});

	$('#magic-menu').on('click', '#magic-back',()  => {
		magicReset();
	});
}


//let test = [0,1,2,3,2,5,8,2,9];

function playerItem() {

	firstMenu.css('display','none');

	itemMenu.css('display','inline');
}

function itemButtonInitialisers() {
	$('#potion').on('click', () => {
		inventoryCheck('p');
		itemReset();
	});

	$('#ether').on('click', () => {
		inventoryCheck('e');
		itemReset();
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
	//buttonInitialisers();
}

function inventoryCheck(arg) {
	
	for (let i of playerInventory) {

		let index = playerInventory.indexOf(i);

		if(i === arg){
			if(i === 'p'){
				playerHP += 20;
				updateMessage('Used 1 potion, restored 10HP');
				console.log("potion use player health: " +playerHP);
				playerInventory.splice(index,1);
				itemButtonTerminators();
				enemyTurn();
				break;
			}if(i === 'e'){
				playerMP += 10;
				updateMessage('Used 1 ether, restored 10MP');
				console.log("ether used player magic: " +playerMP);
				playerInventory.splice(index,1);
				enemyTurn();
				break;
			}
		console.log("Player inventory: "+playerInventory);
		}else if(index === -1){
			updateMessage('None left...');
			console.log('invcheck else No '+arg+' available...');
			//break;
		}
	}
	itemReset();
}

function enemyTurn() {
	buttonTerminators();

	let move = randomizeForEnemy(enemyMoves);
	move();
	
	winLogic();

	updateMessage("Player health: "+playerHP+"	Player MP: "+playerMP+"	Enemy health: "+enemyHP+" Enemy MP: "+enemyMP);
	console.log("enemyTurn Enemy health: "+enemyHP+"  Player HP: "+playerHP);

	valueReset();
	buttonInitialisers();
}

function enemyAttack() {
	console.log('enemyAttack');
	if(checkPlayerGuard){
		enemyDmg = Math.ceil(enemyDmg * 0.4);
	}else{
		enemyDmg = enemyDmg = 5;
	}
	return playerHP -= enemyDmg;
}

function enemyMagic() {
	console.log('enemyMagic');
	if(enemyMP <= 0){
		updateMessage()
		enemyDmg = 0;
	}else{
		if(checkPlayerGuard){
			enemyDmg = Math.ceil(20 * 0.4);
			enemyMP = enemyMP - 20;
		}else{
			enemyDmg = 20;
			enemyMP = enemyMP - 20;
		}
	}
	
	return playerHP -= enemyDmg;
}

function enemyItems() {
	console.log('enemyItems');
	let enemyInventory = ['p','e','p','e'];
	let randItem = randomizeForEnemy(enemyInventory);
	if(randItem === 'p'){
		enemyHP = enemyHP + 20;
		enemyInventory.splice(enemyInventory.indexOf(randItem),1);
	}else if(randItem === 'e'){
		enemyMP = enemyMP + 10;
	}
}

function randomizeForEnemy(arg) {
	return arg[Math.floor(Math.random() * arg.length)];
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
	}
	// else{
	// 	return false;
	// }
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
