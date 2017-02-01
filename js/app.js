
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

let fightTest = $( "#fight" );
let guardTest = $( "#guard" );
let magicTest = $( "#magic" );
let itemTest = $( "#item" );

let firstMenu = $('#first-menu');

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
	console.log("player attack Enemy health:"+enemyHP);
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

	buttonTerminators();
	
	firstMenu.css('display','none');

	let magicMenu = $('#magic-menu');
	magicMenu.css('display','inline');

	function magicButtonInitialisers() {
		$('a#glitch-slap').on('click', () => {
			spellCast('g');
			magicReset();
		});

		$('a#ora').on('click', () => {
			spellCast('o');
			magicReset();
		});

		$('a#magic-back').on('click', ()  => {
			magicReset();
		});
	}

	function magicButtonTerminators() {
		$('a#glitch-slap').off('click');
		$('a#ora').off('click');
	}

	function magicReset() {
		// updateMessage("Player health: "+playerHP+
		// 	"	Enemy health: "+enemyHP+'	Player MP: '+playerMP);
		console.log("magicReset Player health:"+playerHP);
		magicMenu.css('display','none');
		firstMenu.css('display','inline');
		buttonInitialisers();
	}


	function spellCast(arg) {
		magicButtonTerminators();
		if(playerMP <= 0){
			updateMessage("Can't cast, need MP");
		}else{
			if(arg === 'g'){
				
				playerDmg = 30;
				playerMP  = playerMP-20;
				enemyHP -= playerDmg;
				winLogic();
				enemyTurn()
				//dmgCheckReset();
				
				//magicButtonInitialisers();
				
			}else if(arg === 'o'){

				playerDmg = 20;
				playerMP = playerMP-10;
				enemyHP -= playerDmg;
				winLogic();
				enemyTurn();
				//dmgCheckReset();		
			}
		}
	}

	magicButtonInitialisers();
}


//let test = [0,1,2,3,2,5,8,2,9];

function playerItem() {

	buttonTerminators();

	firstMenu.css('display','none');

	let itemMenu = $('#item-menu');
	itemMenu.css('display','inline');


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
		buttonInitialisers();
	}

	function inventoryCheck(arg) {

		itemButtonTerminators();
		for (let i of playerInventory) {

			let index = playerInventory.indexOf(i);

			if(i === arg){
				if(i === 'p'){
					playerHP += 20;
					updateMessage('Used 1 potion, restored 10HP');
					console.log("potion use Used 1 potion, restored 10HP, player health: " +playerHP);
					playerInventory.splice(index,1);
					enemyTurn();
					break;
				}if(i === 'e'){
					playerMP += 10;
					updateMessage('Used 1 ether, restored 10MP');
					console.log("ether used Used 1 ether, restored 10MP, player magic: " +playerMP);
					playerInventory.splice(index,1);
					enemyTurn();
					break;
				}
			console.log(playerInventory);
			}else if(index === -1){
				updateMessage('None left...');
				console.log('invcheck else No '+arg+' available...');
				//break;
			}
		}
		itemReset();
	}
	itemButtonInitialisers();
}

let enemyMoves = [enemyMagic,enemyItems];

function enemyTurn() {
	buttonTerminators();
	//put move here
	playerHP -= enemyDmg;
	winLogic();
	updateMessage("Player health: "+playerHP+"	Player MP: "+playerMP+"	Enemy health: "+enemyHP+" Enemy MP: "+enemyMP);
	console.log("enemyTurn Enemy health: "+enemyHP);
	valueReset();
	buttonInitialisers();
}

function enemyAttack() {
	if(checkPlayerGuard){
		return Math.ceil(enemyDmg * 0.4);
	}else{
		return 5;
	}
}

function enemyMagic() {
	if(checkPlayerGuard){
		enemyDmg = Math.ceil(50 * 0.4);
	}else{
		return 50;
	}
}

function enemyItems() {
	let enemyInventory = [p,e,p,e];
	let randItem = randomizeForEnemy(enemyInventory);
	if(randItem === 'p'){
		enemyHP = enemyHP + 20;
	}else if(){}
}

function randomizeForEnemy(arg) {
	return arg[Math.floor(Math.random() * arg.length)]
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
