SELECT new org.libri.esplora.backend.data.service.RisultatoRicerca(
        Libri.id,
        Libri.ean,
        Libri.titolo,
        Libri.prezzo,
        Libri.pagine,
        Libri.descrizione,
        Libri.annoEdizione,
        Libri.volume,
        Libri.link,
        CONCAT(Autori.nomeAutore, ' ', Autori.cognomeAutore),
        Editori.nome,
        Generi.nome,
        Lingue.nome,
        Lingue.codLingua,
        COALESCE(AVG(Voti.valutazione), -1)
    )
FROM Libri Libri
    LEFT JOIN Libri.voti Voti
    INNER JOIN Libri.autore Autori
    INNER JOIN Libri.editore Editori
    INNER JOIN Libri.genere Generi
    INNER JOIN Libri.lingua Lingue
WHERE Libri.id = ?1
GROUP BY Libri.id