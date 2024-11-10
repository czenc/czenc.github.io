let playerCards = [];
let dealerCards = [];
let isGameStarted = false;

// Funkcija koja automatski prebacuje fokus na input za dilera nakon što unesete karte za igrača
function autoMoveToDealer() {
    const playerInput = document.getElementById("player-cards").value;
    if (playerInput.split(',').length >= 2) {
        document.getElementById("dealer-cards").focus();
    }
}

// Funkcija koja prebacuje na sledeći unos
function autoMoveToNext() {
    const dealerInput = document.getElementById("dealer-cards").value;
    if (dealerInput.split(',').length >= 2) {
        document.getElementById("deal-button").focus();
    }
}

// Funkcija koja pokreće igru
function dealGame() {
    const playerInput = document.getElementById("player-cards").value;
    const dealerInput = document.getElementById("dealer-cards").value;

    playerCards = playerInput.split(',').map(Number);
    dealerCards = dealerInput.split(',').map(Number);

    if (playerCards.length === 2 && dealerCards.length === 2) {
        isGameStarted = true;
        document.getElementById("game-status").innerHTML = "Game started! Did the player Hit or Stand?";
        document.getElementById("deal-button").style.display = "none";
        createHitOrStandButtons();
    } else {
        alert("Please enter 2 cards for both player and dealer.");
    }
}

// Funkcija za prikaz Hit/Stand dugmadi
function createHitOrStandButtons() {
    const hitButton = document.createElement("button");
    hitButton.innerHTML = "Hit";
    hitButton.onclick = hitPlayer;
    document.body.appendChild(hitButton);

    const standButton = document.createElement("button");
    standButton.innerHTML = "Stand";
    standButton.onclick = standPlayer;
    document.body.appendChild(standButton);
}

// Funkcija za "Hit" igrača
function hitPlayer() {
    const card = prompt("Enter the card number (1-11):");
    if (card) {
        playerCards.push(Number(card));
        checkPlayerStatus();
    }
}

// Funkcija za "Stand" igrača
function standPlayer() {
    dealerTurn();
}

// Funkcija za proveru statusa igrača
function checkPlayerStatus() {
    const playerTotal = playerCards.reduce((acc, card) => acc + card, 0);
    if (playerTotal > 21) {
        document.getElementById("result").innerHTML = "Player Busted! Dealer Wins!";
        isGameStarted = false;
    } else {
        document.getElementById("game-status").innerHTML = "Did the player Hit or Stand?";
    }
}

// Funkcija za dealerov potez
function dealerTurn() {
    let dealerTotal = dealerCards.reduce((acc, card) => acc + card, 0);

    while (dealerTotal < 17) {
        const newCard = Math.floor(Math.random() * 11) + 1;  // Simulacija nasumičnog izvlačenja karte
        dealerCards.push(newCard);
        dealerTotal = dealerCards.reduce((acc, card) => acc + card, 0);
    }

    const playerTotal = playerCards.reduce((acc, card) => acc + card, 0);

    if (dealerTotal > 21) {
        document.getElementById("result").innerHTML = "Dealer Busted! Player Wins!";
    } else if (dealerTotal > playerTotal) {
        document.getElementById("result").innerHTML = "Dealer Wins!";
    } else if (dealerTotal < playerTotal) {
        document.getElementById("result").innerHTML = "Player Wins!";
    } else {
        document.getElementById("result").innerHTML = "It's a tie!";
    }
}
