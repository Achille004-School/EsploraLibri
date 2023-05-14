import requests
import math

# Definisci l'URL di destinazione
url = "http://localhost:8080/EsploraLibri/api/aggiungi_voto"

# Genera le coppie di numeri casuali e invia le richieste
for i in range(int(input('Quante richieste? '))):
    import random

    primo_numero = random.randint(1, 5)
    secondo_numero = random.randint(1, 22)
    terzo_numero = random.randint(1, 10)

    # Esegui operazioni basate sull'ID per generare valutazioni dimostrative
    valutazione = 1 + abs(round(secondo_numero * terzo_numero / 25))

    # Verifica se la valutazione intera supera il limite superiore
    if valutazione > 5:
        valutazione=5

    # Costruisci i parametri della richiesta
    params={
        "id_libro": secondo_numero,
        "valutazione": valutazione
    }

    # Invia la richiesta GET
    response = requests.get(url, params=params)

    # Stampa la risposta
    print(str(i + 1) + '° fatto: ' + str(valutazione))
