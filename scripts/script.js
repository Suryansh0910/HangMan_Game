const hangman_image = document.querySelector(".box img");
const wordDisplay = document.querySelector(".word_display");
const guessText = document.querySelector(".guess b");
const keybordDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".pop_up_end");
const playAgainBtn = document.querySelector(".restart");
let currWord ,correct_list , count ;
const m_guesses = 6 ; 
const resetGame = ()=>{
    correct_list = [];
    count = 0;
    hangman_image.src = `images/hangman-${count}.svg`;
    guessText.innerText = `${count} / ${m_guesses}`;
    keybordDiv.querySelectorAll("button").forEach(btn => {btn.disabled = false});
    wordDisplay.innerHTML = currWord.split("").map(()=>`<li class="letters"></li>`).join("");
    gameModal.classList.remove("show")

}
const get_random_words = () =>{
    const {word,hint} = random_words_list[Math.floor(Math.random()*random_words_list.length)];
    currWord = word
    console.log(word)
    document.querySelector(".hint b").innerText = hint ;
    resetGame()
}
const gameOver = (isVictory) => {
    setTimeout(()=>{
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h3").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currWord}</b>`;
        gameModal.classList.add("show")
    },300)
}
const initGame = (button , clickedLetter) =>{
    if (currWord.includes(clickedLetter)){
        [...currWord].forEach((letter,index)=>{
            if (letter === clickedLetter){
                correct_list.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter ;
                wordDisplay.querySelectorAll("li")[index].classList.add("gussed");
            }
        })
    }
    else {
        count++;
        hangman_image.src = `images/hangman-${count}.svg`;
    }
    button.disabled = true;
    guessText.innerText = `${count} / ${m_guesses}`;

    if(count === m_guesses){
        return gameOver(false);
    }
    if(correct_list.length === currWord.length){
        return gameOver(true);
    }
}
for (let i = 97; i < 123; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i) ;
    keybordDiv.appendChild(button);
    button.addEventListener("click",e=> initGame(e.target , String.fromCharCode(i)))
}
get_random_words();
playAgainBtn.addEventListener("click",get_random_words);