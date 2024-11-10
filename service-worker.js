document.addEventListener('DOMContentLoaded', () => {
    let playerCards = [];
    let dealerCards = [];
    let gameStarted = false;
    let playerTurn = false;
  
    // HTML elementi
    const playerCard1 = document.getElementById('player-card1');
    const playerCard2 = document.getElementById('player-card2');
    const dealerCard1 = document.getElementById('dealer-card1');
    const playerCard3 = document.getElementById('player-card3');
    const dealButton = document.getElementById('deal-button');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const hitStandDiv = document.getElementById('hit-stand');
    const playerHandDiv = document.getElementById('player-hand');
  
    const disableInput = (input) => input.disabled = true;
    const enableInput = (input) => input.disabled = false;
  
    // Funkcija za validaciju i automatski prebacivanje
    const handlePlayerCardInput = (cardInput, nextCardInput) => {
      cardInput.addEventListener('input', () => {
        let value = parseInt(cardInput.value);
  
        if (value > 11) {
          cardInput.value = 11; // Postavljanje na maksimalni broj 11
        }
  
        if (value === 11) {
          nextCardInput.focus(); // Fokusiraj sledeći input
        }
      });
    };
  
    // Funkcija za 'Deal' dugme
    dealButton.addEventListener('click', () => {
      // Osiguraj da su oba broja uneta
      if (playerCard1.value && playerCard2.value) {
        playerCards = [parseInt(playerCard1.value), parseInt(playerCard2.value)];
        dealerCards = [parseInt(dealerCard1.value)];
        hitStandDiv.style.display = 'block';
        playerHandDiv.style.display = 'block';
        gameStarted = true;
  
        // Onemogući unos na prvi karticu igrača i omogućiti unos na drugi
        disableInput(playerCard1);
        enableInput(playerCard2);
        handlePlayerCardInput(playerCard2, playerCard3);
      }
    });
  
    // Funkcija za 'Hit' dugme
    hitButton.addEventListener('click', () => {
      if (playerTurn && playerCard3.value) {
        playerCards.push(parseInt(playerCard3.value));
        checkBust();
      }
    });
  
    // Funkcija za 'Stand' dugme
    standButton.addEventListener('click', () => {
      alert('Player chose to stand!');
      dealerPlay();
    });
  
    // Funkcija za validaciju da li je igrač "Busted"
    const checkBust = () => {
      const playerTotal = playerCards.reduce((acc, card) => acc + card, 0);
      if (playerTotal > 21) {
        alert('Player Busted!');
      }
    };
  
    // Funkcija za igru dilera
    const dealerPlay = () => {
      let dealerTotal = dealerCards.reduce((acc, card) => acc + card, 0);
      while (dealerTotal < 17) {
        let newCard = prompt("Dealer needs to hit! Enter card (1-11):");
        dealerCards.push(parseInt(newCard));
        dealerTotal = dealerCards.reduce((acc, card) => acc + card, 0);
      }
  
      if (dealerTotal > 21) {
        alert('Dealer Busted! Player Wins!');
      } else {
        const playerTotal = playerCards.reduce((acc, card) => acc + card, 0);
        if (dealerTotal > playerTotal) {
          alert('Dealer Wins!');
        } else {
          alert('Player Wins!');
        }
      }
    };
  });
  