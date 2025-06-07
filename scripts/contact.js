document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Voorkom de standaard formulierverzending

    // Verkrijg de waarden van de formulierinvoervelden
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const sendconfirm = document.getElementById('sendconfirm');
    const loader = document.getElementById('loader');
    loader.style.display = "block"
    sendconfirm.style.display = "none"
    // Zet de gegevens om naar een object
    const data = {
      name: name,        // Verkrijg waarde van het invoerveld met id 'name'
      email: email,      // Verkrijg waarde van het invoerveld met id 'email'
      message: message   // Verkrijg waarde van het invoerveld met id 'message'
    };

    console.log('Formuliergegevens:', data);

    // Optioneel: Verstuur de gegevens naar een server
    fetch('https://contactmin.jessehoekema.com/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Netwerkreactie was niet ok.');
      }
        sendconfirm.style.display = "block"
        loader.style.display = "none"
      return response.text(); // Of response.json() als je server JSON terugstuurt
    })
    .catch(error => console.error('Fout:', error));
  });
