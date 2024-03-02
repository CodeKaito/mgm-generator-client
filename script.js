const apiUrl = 'https://mgm-generator-api.onrender.com/api/get';
const apiSaveUrl = 'https://mgm-generator-api.onrender.com/api/save/';

let createCode = document.getElementById('createCode');
let getCode = document.getElementById('getCode');

async function getData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('Dati ricevuti:', data);
    return data; // Restituisci i dati ricevuti
  } catch (error) {
    console.error('Errore durante la richiesta API:', error.message);
    throw error; // Rilancia l'errore per gestirlo in modo appropriato
  }
}

async function generaCodiceMGM() {
  try {
    const data = await getData();

    // Verifica che ci siano dati disponibili
    if (data && data.length > 0) {
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
  } catch (error) {
    console.error('Errore durante l\'invio del codice MGM:', error.message);
  }
}

// Chiamata alla funzione asincrona
generaCodiceMGM();
