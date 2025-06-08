const codingsession = document.getElementById('codingsession');

async function fetchData() {
    try {
      const response = await fetch('https://wakatime-api-website.vercel.app/api/wakatime'); 
      const data = await response.json();

      const hours = data.hours;
      const minutes = data.minutes;

      const formattedText = `${hours} Hours & ${minutes} Minutes`;

      if (hours === 0 && minutes === 0) {
        codingsession.textContent = 'Not coded today';
        return;
      }

      codingsession.textContent = formattedText;

    } catch (error) {
      console.error('Error while fetching the wakatime data from api:', error);
    }
}
fetchData();
  
