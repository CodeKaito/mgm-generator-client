const apiUrl = 'http://localhost:5001/api/get/';
const apiSaveUrl = 'http://localhost:5001/api/save/';

let createCode = document.getElementById('createCode');
let getCode = document.getElementById('getCode');

async function generaCodiceMGM() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);

    // Verifica che ci siano dati disponibili
    if (data) {
      // Estrai casualmente un valore dall'array di dati
      const valoreCasuale = data[Math.floor(Math.random() * data.length)].mgmData;

      // Assegna il valore all'input desiderato
      getCode.value = valoreCasuale;

    } else {
      console.error('Nessun dato disponibile per generare il codice MGM.');
    }
  } catch (error) {
    // Gestisci gli errori durante la richiesta o la generazione del codice
    console.error('Errore durante la generazione del codice MGM:', error.message);
  }
}

async function inviaCodiceMGM() {
  try {
    const postData = {
        mgmData: createCode.value, // Ottieni il valore dall'input utente
    };

    const response = await fetch(apiSaveUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData), // Invia direttamente l'oggetto postData invece di {postData}
    });

    const newMGMCode = await response.json();

    console.log('Nuovo codice MGM generato:', newMGMCode);
    alert("Nuovo codice MGM generato");
  } catch (error) {
    console.error('Errore durante l\'invio del codice MGM:', error.message);
  }
}

// Chiamata alla funzione asincrona
generaCodiceMGM();
