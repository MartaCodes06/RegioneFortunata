document.addEventListener("DOMContentLoaded", function () {
  // Lista delle regioni con i rispettivi ID
  const regioni = [
    "aosta", "piemonte", "lombardia", "liguria", "friuli",
    "trentino", "veneto", "emilia", "toscana", "umbria",
    "marche", "abruzzo", "lazio", "sardegna", "sicilia",
    "calabria", "basilicata", "puglia", "campania", "molise"
  ];

  // Popola il div con le regioni
  const regioniDiv = document.getElementById("region");
  regioni.forEach(id => {
    const span = document.createElement("span");
    span.id = `${id}`;
    span.textContent = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
    regioniDiv.appendChild(span);
  });

  // Scegliere una regione casuale
  const regioneCasuale = regioni[Math.floor(Math.random() * regioni.length)];
  console.log("Regione fortunata:", regioneCasuale); // Debug in console

  let tentativiIniziali = 2; // Numero massimo di tentativi
  let tentativi = tentativiIniziali;

  // Aggiungere event listener a ogni regione
  regioni.forEach(id => {
    const regione = document.getElementById(id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());
    
    regione.addEventListener("click", function () {
      if (id === regioneCasuale) {
        alert("🎉 Complimenti! Hai indovinato la regione fortunata!");
        disabilitaTutteLeRegioni();
      } 
      else {
        tentativi--;
        alert(`❌ Sbagliato! Ti restano ${tentativi} tentativi.`);
        regione.style.pointerEvents = "none"; // Disattiva il click su questa regione
        regione.classList.add("selezionato");
        const regionListItem = document.getElementById(`${id}`);
        regionListItem.classList.add("sbarrato");

        // rimuovo la metà dei tentativi
        if(tentativi!=0) {
          rimuoviRegioniCasuali();
        } 
      }

      if (tentativi === 0) {
        alert(`😢 Hai esaurito i tentativi! La regione corretta era: ${regioneCasuale}`);
        disabilitaTutteLeRegioni();
        disabilitaRegioneFortunata();
      }
    });
  });

  // Funzione per rimuovere il 15% delle regioni in modo casuale
  function rimuoviRegioniCasuali() {
    let numeroRegioniDaRimuovere = Math.ceil(regioni.length * 0.5); // numero delle regioni da rimuovere
    let regioniDisponibili = regioni.filter(id => id !== regioneCasuale); // Escludi la regione fortunata
    
    // Mischia e prendi le prime "n" regioni da rimuovere
    let regioniDaRimuovere = regioniDisponibili
      .sort(() => Math.random() - 0.5)
      .slice(0, numeroRegioniDaRimuovere);

    // Disabilita e "nasconde" le regioni scelte
    regioniDaRimuovere.forEach(id => {
      let regione = document.getElementById(id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());
      if (regione) {
        regione.style.pointerEvents = "none";
        regione.classList.add("selezionato");
        const regionListItem = document.getElementById(`${id}`);
        regionListItem.classList.add("sbarrato");
      }
    });

    alert("🛑 La meta' delle regioni sono state rimosse per aiutarti!");
  }

  // Funzione per disabilitare tutte le regioni
  function disabilitaTutteLeRegioni() {
    regioni.forEach(id => {
      // Controlla se l'ID della regione non è quello fortunato
      if (id !== regioneCasuale) {
        const regione = document.getElementById(id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());
        regione.style.pointerEvents = "none";
        regione.classList.add("selezionato");
        const regionListItem = document.getElementById(`${id}`);
        regionListItem.classList.add("sbarrato");
      }
    });
  }

  function disabilitaRegioneFortunata() {
    const regioneFort = document.getElementById(regioneCasuale.charAt(0).toUpperCase() + regioneCasuale.slice(1).toLowerCase());
    regioneFort.style.pointerEvents = "none";
  }
});