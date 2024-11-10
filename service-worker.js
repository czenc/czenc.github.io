let playerHand = [];
let dealerHand = [];

const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 10, // Jack
    12: 10, // Queen
    13: 10, // King
    14: 11 // Ace
};

const dealButton = document.getElementById("deal-button");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const playerCardsInput = document.getElementById("player-cards");
const dealerCardsInput = document.getElementById("dealer-cards");
const resultDiv = document.getElementById("result");

dealButton.addEventListener("click", dealCards);
hitButton.addEventListener("click", hit);
standButton.addEventListener("click", stand);

function dealCards() {
    const playerCards = playerCardsInput.value.split(" ").map(Number);
    const dealerCards = dealerCardsInput.value.split(" ").map(Number);

    if (playerCards.length !== 2 || dealerCards.length !== 2) {
        resultDiv.innerText = "Please enter two cards for both player and dealer.";
        return;
    }

    playerHand = playerCards;
    dealerHand = dealerCards;

    updateUI();
}

function hit() {
    const newCard = parseInt(prompt("Enter card value for Player"));
    playerHand.push(newCard);
    updateUI();

    if (getTotal(playerHand) > 21) {
        resultDiv.innerText = "Player Busted!";
        hitButton.disabled = true;
        standButton.disabled = true;
    }
}

function stand() {
    while (getTotal(dealerHand) < 17) {
        const newCard = getRandomCard();
        dealerHand.push(newCard);
    }
    updateUI();

    const playerTotal = getTotal(playerHand);
    const dealerTotal = getTotal(dealerHand);

    if (dealerTotal > 21) {
        resultDiv.innerText = "Dealer Busted! You Win!";
    } else if (playerTotal > dealerTotal) {
        resultDiv.innerText = "You Win!";
    } else if (playerTotal < dealerTotal) {
        resultDiv.innerText = "You Lost!";
    } else {
        resultDiv.innerText = "It's a Tie!";
    }

    hitButton.disabled = true;
    standButton.disabled = true;
}

function getTotal(hand) {
    let total = 0;
    let aces = 0;

    hand.forEach(card => {
        total += cardValues[card];
        if (card === 14) aces++;
    });

    // Adjust for aces if total > 21
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}

function getRandomCard() {
    const card = Math.floor(Math.random() * 13) + 2; // Random card between 2 and 14
    return card;
}

function updateUI() {
    document.getElementById("player-hand").innerText = playerHand.join(" ");
    document.getElementById("dealer-hand").innerText = dealerHand.join(" ");
    document.getElementById("player-total").innerText = getTotal(playerHand);
    document.getElementById("dealer-total").innerText = getTotal(dealerHand);
}
