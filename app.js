// Funkcija za prikazivanje odgovarajućeg taba
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');
  
    // Skriva sve tabove
    tabs.forEach(tab => tab.classList.remove('active'));
  
    // Skida aktivnu klasu sa svih dugmadi
    buttons.forEach(button => button.classList.remove('active'));
  
    // Prikazuje odabrani tab i dodaje aktivnu klasu na dugme
    document.getElementById(tabName).classList.add('active');
    document.getElementById(tabName + 'Tab').classList.add('active');
  }
  