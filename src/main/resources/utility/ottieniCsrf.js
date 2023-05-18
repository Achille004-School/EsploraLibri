var data = {
    id_libro: $0,
    valutazione: $1
}

var csfrHeader = $("meta[name='_csrf_header']").attr('content');
var csfrToken = $("meta[name='_csrf']").attr('content');

console.log('Utilizzando il token: ' + csfrHeader + '\n' + csfrToken);
$.ajaxSetup({
    beforeSend: function (xhr) {
        xhr.setRequestHeader(csfrHeader, csfrToken);
    }
});

$.ajax({
    url: 'http://localhost:8080/EsploraLibri/api/aggiungi_voto',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
        console.log('Voto aggiunto.');
    },
    error: function (data) {
        console.log("Errore durante l'invio del voto!");
    }
});