function updateTime() {
    const formatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Europe/Amsterdam",
    });
    const time = Date.now();
    const formattedTime = formatter.format(time).replace("at", "•");
    const clockText = document.getElementById("clock");
    clockText.classList.remove("fade-in"); // Verwijder de fade-in klasse
    void clockText.offsetWidth; // Forceer een reflow
    clockText.textContent = formattedTime; // Update de tekst
    clockText.classList.add("fade-in"); // Voeg de fade-in klasse weer toe voor een vloeiende overgang
  }

  setInterval(updateTime, 1000); // Update tijd elke seconde
  updateTime(); // Zorg ervoor dat de tijd meteen wordt bijgewerkt