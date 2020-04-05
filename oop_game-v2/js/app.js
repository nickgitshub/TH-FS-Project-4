/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//listen to the start button and starts the game when clicked
startButton = document.getElementById('btn__reset')
startButton.addEventListener('click', (e)=> {
	game = new Game();
	game.startGame();
})

//assign an event handler to every letter button and send the event to game.handleInteraction once it's been pressed
const letterButtons = document.querySelectorAll('#qwerty button')
for (let letter of letterButtons){
	letter.addEventListener('click', (e)=>{
			const letterPressed = e.target.innerText
			game.handleInteraction(letter, letterPressed);
	});
}	

//Enables the keyboard to be used instead of clicking
document.addEventListener('keypress', (e)=>{
	const overlayHidden = document.getElementById('overlay').style.display === "none"; 
	const keyPressed = e.key 
	//if game has started, you can press a key on the keyboard and it will respond in the same way as if you clicked it
	if (overlayHidden){
		for (let letter of letterButtons){
			if(letter.innerText === e.key && letter.disabled === false){
				game.handleInteraction(letter, keyPressed);
			}
		}

	//if the overlay is present(start, lose, or win screen), you can press 'Enter' to start a new game
	}else if (keyPressed === 'Enter'){
		game = new Game();
		game.startGame();
	}
})


