const codingsession = document.getElementById('codingsession');

// Functie om de GET-request uit te voeren
async function fetchData() {
    try {
      // Vervang 'URL_HIER' door de werkelijke URL van je API
      const response = await fetch('https://wakatime.com/api/v1/users/jessiflessi/status_bar/today?api_key=waka_8ff54bbd-103f-4b67-9f8f-751aa74d75fb'); 
  
      // Zet de JSON-response om in een JavaScript-object
      const data = await response.json();
      
      // Haal de eerste categorie uit de 'categories' array
      const category = data.data.categories[0]; 
  
      // Haal de uren, minuten, en tekst op
      const hours = category.hours;
      const minutes = category.minutes;
      const text = category.text;
  
      // Log de opgehaalde gegevens naar de console
      console.log(`${hours} Hours & ${minutes} Minutes`);
      const formattedText = `${hours} Hours & ${minutes} Minutes`;

      codingsession.textContent = formattedText
      
    } catch (error) {
      console.error('Fout bij het ophalen van de data:', error);
    }
  }
  
  // Roep de fetchData functie aan
  fetchData();
  
