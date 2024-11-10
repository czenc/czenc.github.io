document.addEventListener('DOMContentLoaded', () => {
    let playerCards = [];
    let dealerCards = [];
  
    const playerCard1 = document.getElementById('player-card1');
    const playerCard2 = document.getElementById('player-card2');
    const dealerCard1 = document.getElementById('dealer-card1');
    const playerCard3 = document.getElementById('player-card3');
    const dealButton = document.getElementById('deal-button');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const hitStandDiv = document.getElementById('hit-stand');
    const playerHandDiv = document.getElementById('player-hand');
  
    let playerTurn = false;
    let gameStarted = false;
  
    const disableInput = (input) => {
      input.disabled = true;
    }
  
    const enableInput = (input) => {
      input.disabled = false;
    }
  
    const updatePlayerHand = (cardValue) => {
      playerCards.push(cardValue);
      if (playerCards.length >= 2) {
        enableInput(dealerCard1);
        playerCard3.disabled = false;
      }
    }
  
    const checkBust = () => {
      const playerTotal = playerCards.reduce((acc, card) => acc + card, 0);
      if (playerTotal > 21) {
        alert('Player Busted!');
        return true;
      }
      return false;
    }
  
    // Function to handle the 'Deal' button
    dealButton.addEventListener('click', () => {
      if (playerCard1.value && playerCard2.value) {
        playerCards = [parseInt(playerCard1.value), parseInt(playerCard2.value)];
        dealerCards = [parseInt(dealerCard1.value)];
        hitStandDiv.style.display = 'block';
        gameStarted = true;
      }
    });
  
    hitButton.addEventListener('click', () => {
      playerCard3.disabled = false;
      if (playerCard3.value) {
        updatePlayerHand(parseInt(playerCard3.value));
        checkBust();
      }
    });
  
    standButton.addEventListener('click', () => {
      alert('Player chose to stand!');
      // Now prompt for dealer's hand and calculate the winner
      let dealerTotal = dealerCards.reduce((acc, card) => acc + card, 0);
      while (dealerTotal < 17) {
        let newCard = prompt("Dealer needs to hit! Enter card (1-11):");
        dealerCards.push(parseInt(newCard));
        dealerTotal = dealerCards.reduce((acc, card) => acc + card, 0);
      }
      // Show the final result
      if (dealerTotal > 21) {
        alert('Dealer Busted! Player Wins!');
      } else {
        if (dealerTotal > playerCards.reduce((acc, card) => acc + card, 0)) {
          alert('Dealer Wins!');
        } else {
          alert('Player Wins!');
        }
      }
    });
  });
  