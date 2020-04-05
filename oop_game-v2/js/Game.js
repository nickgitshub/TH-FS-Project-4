/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


 class Game {
 	//sets some initial fields for the Game object
 	constructor (){
 		this.missed = 0;
 		this.phrases = [];
 		this.activePhrase = null;
 	}

 	//creates the phrases list that will be randomly cycled through each time a game is started.
 	createPhrases(){
 		const samplePhrases = ["I love lamp", "You stay classy San Diego", "Great Odens Raven", "By the beard of Zeus", "Cannon ball!"]
 		for (let p of samplePhrases){
 			const newPhrase = new Phrase(p)
 			this.phrases.push(newPhrase)
 		}
 	}

 	//grabs a random phrase out of the phrases list
 	getRandomPhrase(){
 		const randomIndex = Math.floor(Math.random()*this.phrases.length)
 		return this.phrases[randomIndex];
 	}

 	//initialized a new game by hiding the overlay div, getting a random phrase, and then adding it to the display
 	//if not the first game that has been played, it also calls a gameReset() function
 	startGame(){
		const  divOverlay = document.getElementById('overlay')
 		if (divOverlay.className === 'lose' || divOverlay.className === 'win'){
 			console.log('Reset', divOverlay)
 			this.gameReset()
 		}

 		this.createPhrases();
 		divOverlay.style.display = 'None'
 		this.activePhrase = this.getRandomPhrase();
 		this.activePhrase.addPhraseToDisplay();
 	}

 	//event handler passed into event listeners for buttons clicked and keys pressed
 	//if letter selected, it changes the class of the letter so that it is shown as having already been clicked
 	//if the letter matches a letter in the phrase, it checks to see if the user has won
 	//if the letter doesn't match the phrase, it removes a life
 	handleInteraction(letter, eventText){
		letter.disabled = true; 
		const letterClicked = eventText;
		const inPhrase = this.activePhrase.checkLetter(letterClicked);
		if(inPhrase){
			letter.className = "key chosen";
			this.activePhrase.showMatchedLetter(letterClicked);
			if(this.checkForWin()){
				this.gameOver(true);
			}
		}else{
			letter.className = "key wrong";
			this.removeLife()
		};
	}

	//checks for win by seeing if all the letters are now showing
 	checkForWin(){
 		const remainingHiddenLetters = document.querySelectorAll(".hide").length
 		if (remainingHiddenLetters === 0){
 			return true;
 		} else {
 			return false; 
 		}
 	}

 	//removes a life whem you guess wrong
 	//ends game once you run out of lives
 	removeLife(){
 		const remainingTries = document.querySelectorAll('[src="images/liveHeart.png"]')
 		const remainingTriesIndex = remainingTries.length-1

 		if(this.missed < 4){
 			this.missed += 1
 			remainingTries[remainingTriesIndex].src="images/lostHeart.png"
 		}else{
 			this.gameOver(false);
 		}
 	}

 	//brings up the divOverlay once a game is finished
 	gameOver(gameWon){
 		const  divOverlay = document.getElementById('overlay')

 		//display the divOverlay
 		divOverlay.style.display = '';

 		//changes the h1 message depending on the outcome of the game
 		if(gameWon === true){
 			divOverlay.className = 'win';
 			divOverlay.querySelector('h1').innerText = "By the bear of Zeus, you did it!";
 		}else{
 			divOverlay.className = 'lose';
 			divOverlay.querySelector('h1').innerText = "Stay classy by trying again.";
 		}

 		//Give the button on div overlay a 'Play Again?' message
 		document.getElementById('btn__reset').innerText = 'Play Again?';


 	}

 	//reset the game after a prior game has concluded
 	gameReset(){
 		const currentLettersDisplay = document.querySelectorAll("#phrase li");
 		const currentButtons = document.querySelectorAll('#qwerty button');
 		const allTries = document.querySelectorAll('.tries img');

 		//remove all letters from phrase display
 		for (let l of currentLettersDisplay){
 			l.remove();
 		}

 		 //resets the buttons to their initial state
 		for (let b of currentButtons){
 			b.disabled = false;
 			b.className = "key";
 		}

 		//resets the tries images to full heart pictures (liveHeart.png)
 		for (let t of allTries){
 			t.src="images/liveHeart.png";
 		}
 	}


 }