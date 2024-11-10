document.getElementById('deal-button').addEventListener('click', function () {
    let playerCard1 = parseInt(document.getElementById('player-card1').value);
    let playerCard2 = parseInt(document.getElementById('player-card2').value);
    
    // Provera validnosti unosa
    if (![playerCard1, playerCard2].every(card => card >= 1 && card <= 11)) {
      alert('Please enter valid numbers between 1 and 11 for each card.');
      return;
    }
  
    // Prikazivanje sekcije za dealerove karte
    document.getElementById('dealer-cards').style.display = 'block';
    document.getElementById('deal-button').style.display = 'none';
    
    // Enable "Hit" and "Stand" buttons
    document.getElementById('action-container').style.display = 'block';
  
    // Funkcija za "Hit"
    document.getElementById('player-hit').addEventListener('click', function () {
      let playerHitCard = parseInt(prompt('Enter a new card for player (1-11):'));
      if (playerHitCard < 1 || playerHitCard > 11) {
        alert('Invalid card value. Please enter a valid card.');
        return;
      }
  
      playerCard1 += playerHitCard; // Dodajemo novu kartu
  
      // Provera da li je player busta
      if (playerCard1 > 21) {
        document.getElementById('result').innerText = 'Player Busted!';
        return;
      }
  
      alert(`Player's new total: ${playerCard1}`);
    });
  
    // Funkcija za "Stand"
    document.getElementById('player-stand').addEventListener('click', function () {
      // Prikazivanje unosa za dealerov broj
      document.getElementById('dealer-action').style.display = 'block';
    });
  });
  
  document.getElementById('submit-dealer-result').addEventListener('click', function () {
    let playerCard1 = parseInt(document.getElementById('player-card1').value);
    let dealerTotal = parseInt(document.getElementById('dealer-result').value);
  
    // Validacija dealerovog broja
    if (dealerTotal < 1 || dealerTotal > 21) {
      alert('Dealer total must be between 1 and 21');
      return;
    }
  
    // Provera ko je pobedio
    if (dealerTotal > 21) {
      document.getElementById('result').innerText = 'Dealer Busted! Player Wins!';
    } else if (dealerTotal > playerCard1) {
      document.getElementById('result').innerText = 'Dealer Wins!';
    } else if (dealerTotal < playerCard1) {
      document.getElementById('result').innerText = 'Player Wins!';
    } else {
      document.getElementById('result').innerText = 'It\'s a tie!';
    }
  });
  