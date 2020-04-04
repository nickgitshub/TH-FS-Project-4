/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


 class Phrase {
 	constructor(phrase) {
 		this.phrase = phrase.toLowerCase()
 	}

 	//display phrase on game board
 	addPhraseToDisplay(){
 		const letterDisplayList = document.querySelector("#phrase ul")
 		for(let letter of this.phrase){
 			const newLi= document.createElement("LI")
 			if (/^[A-Za-z]$/.test(letter)){
 				newLi.className = "hide letter " + letter;
 				newLi.innerText = letter;
 				letterDisplayList.appendChild(newLi)
 			}else{
 				newLi.className = "space";
 				letterDisplayList.appendChild(newLi)
 			}
 		}
 	}

 	//checks whether a letter input matches a letter in the phrased displayed (the activePhrase)
 	checkLetter(letter){
	 	if (this.phrase.includes(letter)){
	 		return true;
	 	} else{
	 		return false; 
	 	}
 	}

 	//if a letter input matches a letter in the phrase displayed(the activePhrase), it shows the letter by changing the class name
 	showMatchedLetter(letter){
 		const matchesInPhrase = document.querySelectorAll('[class ="hide letter '+letter+'"]');
 		console.log('.hide '+letter, matchesInPhrase);
 		for(let m of matchesInPhrase){
 			m.className = 'show letter ' + letter;
 		}

 	}

 }