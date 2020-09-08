/**
 * Challenge 4
 */
var all_buttons = document.getElementsByTagName("button");
console.log(all_buttons);

var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingly) {
    if (buttonThingly.value === 'red') {
        buttonsRed();
    } else if (buttonThingly.value === 'green') {
        buttonsGreen();
    } else if (buttonThingly.value === 'random') {
        buttonsRandom();

    } else if (buttonThingly.value === 'reset') {
        buttonsReset();
    }
}

function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonsRandom() {
    let choice = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success']
    for (let i = 0; i < all_buttons.length; i++) {
        let random = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choice[random]);
    }

}
/**
 * Challenge 5 Black Jack
 */

let blackJackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'k', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'k': 10, 'Q': 10, 'J': 10, 'A': [1, 11] }
};
const You = blackJackGame['you'];
const Dealer = blackJackGame['dealer'];

const hitSound = new Audio('sounds/swish.mp3');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', balckjackDeal);

function blackjackHit() {
    let card = randomCard();
    console.log(card);
    ShowCard(card, You);
    upDateScore(card, You);
    ShowScore(You);
    console.log(You['score']);
}

function randomCard() {
    let randomCard = Math.floor(Math.random() * (13));
    return blackJackGame['cards'][randomCard];
}

function ShowCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let CardImage = document.createElement('img');
        CardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(CardImage);
        hitSound.play();
    }

}

function balckjackDeal() {
    let winner = computeWinner;
    showResult(winner);
    let yourImage = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImage = document.querySelector('#dealer-box').querySelectorAll('img');
    for (i = 0; i < yourImage.length; i++) {
        yourImage[i].remove();
    }
    for (i = 0; i < dealerImage.length; i++) {
        dealerImage[i].remove();
    }
    You['score'] = 0;
    Dealer['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#ffffff';
    document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

}


function upDateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackJackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackJackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackJackGame['cardsMap'][card];

    }
}

function ShowScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';

    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic() {
    let card = randomCard();
    console.log(card);
    ShowCard(card, Dealer);
    upDateScore(card, Dealer);
    ShowScore(Dealer);
    console.log(Dealer['score']);

}
// compute winner and return who just won

function computeWinner() {
    let winner;
    if (You['score'] <= 21) {
        // condition:higher score than dealer or ...
        if (You['score'] > Dealer['score'] || (Dealer['score'] > 21)) {
            console.log('You Win');
            winner = You;
        } else if (You) {
            console.log('You lost!');
            winner = Dealer;
        } else if (You['score'] === Dealer['score']) {
            console.log('You drew!');
        }
    }
    // condition: when user busts but dealer doesn't 
    else if (You['score'] > 21 && Dealer['score'] <= 21) {
        console.log('You lost');
        winner = Dealer;
    } else if (You['score'] > 21 && Dealer['score'] > 21) {
        console.log('You drew!');
    }
    console.log("winner is:", winner)
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (winner === You) {
        message = 'You Win！';
        messageColor = 'green';
        winSound.play();
    } else if (winner == Dealer) {
        message = 'You lost!';
        messageColor = 'red';
        lossSound.play();
    } else {
        message = 'You drew';
        messageColor = 'black';

    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
}