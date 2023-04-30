SELECT Libri.ID AS idLibro,
    Libri.ean AS ean,
    Libri.titolo AS titolo,
    Libri.prezzo AS prezzo,
    Libri.pagine AS pagine,
    Libri.descrizione AS descrizione,
    Libri.anno_edizione AS annoEdizione,
    Libri.volume AS volume,
    Libri.link AS link,
    CONCAT(Autori.nome, ' ', Autori.cognome) AS autore,
    Editori.nome AS editore,
    Generi.nome AS genere,
    Lingue.nome AS lingua,
    Lingue.cod_lingua AS codLingua,
    AVG(Valutazione) AS valutazioneMedia
FROM Libri
    INNER JOIN Voti ON Libri.ID = Voti.libro
    INNER JOIN Autori ON Libri.autore = Autori.ID
    INNER JOIN Editori ON Libri.editore = Editori.ID
    INNER JOIN Generi ON Libri.genere = Generi.ID
    INNER JOIN Lingue ON Libri.lingua = Lingue.ID
WHERE (
        (
            ?1 = 'ean'
            AND LOWER(Libri.ean) LIKE LOWER(CONCAT('%', ?2, '%'))
        )
        OR (
            ?1 = 'titolo'
            AND LOWER(Libri.titolo) LIKE LOWER(CONCAT('%', ?2, '%'))
        )
        OR (
            ?1 = 'autore'
            AND LOWER(CONCAT(Autori.nome, ' ', Autori.cognome)) LIKE LOWER(CONCAT('%', ?2, '%'))
        )
        OR ?1 = ''
        OR ?2 = ''
    )
    AND Libri.anno_edizione BETWEEN ?3 AND ?4
    AND Libri.prezzo BETWEEN ?5 AND ?6
    AND Libri.pagine BETWEEN ?7 AND ?8
    AND (
        Generi.nome = ?10
        OR ?10 = ''
    )
    AND (
        Lingue.nome = ?11
        OR ?11 = ''
    )
GROUP BY Libri.ID,
    Libri.ean,
    Libri.titolo,
    Libri.prezzo,
    Libri.pagine,
    Libri.descrizione,
    Libri.anno_edizione,
    Libri.volume,
    Libri.link,
    autore,
    Editori.nome,
    Generi.nome,
    Lingue.nome,
    Lingue.cod_lingua
HAVING valutazioneMedia >= ?9
ORDER BY valutazioneMedia DESC