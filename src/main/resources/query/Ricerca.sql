SELECT Libri.ID,
    Libri.isbn13,
    Libri.titolo,
    Libri.prezzo,
    Libri.pagine,
    Libri.descrizione,
    Libri.edizione,
    Libri.anno_edizione,
    Libri.volume,
    Autori.Nome
    Editori.nome,
    Generi.nome,
    Lingue.nome,
    Lingue.cod_lingua,
    AVG(Valutazione) AS valutazione_media
FROM Libri
    INNER JOIN Voti ON Libri.ID = Voti.libro
    INNER JOIN Autori ON Libri.autore = Autori.ID
    INNER JOIN Editori ON Libri.editore = Editori.ID
    INNER JOIN Generi ON Libri.genere = Generi.ID
    INNER JOIN Lingue ON Libri.lingua = Lingue.ID
WHERE
    (?1 = 'isbn13' AND LOWER(isbn13) LIKE LOWER(CONCAT('%', ?2, '%')))
    OR (?1 = 'titolo' AND LOWER(titolo) LIKE LOWER(CONCAT('%', ?2, '%')))
    OR (?1 = 'autore' AND LOWER(autore) LIKE LOWER(CONCAT('%', ?2, '%')))
    OR ?1 IS NULL
    AND (Libri.anno_edizione BETWEEN ?3 AND ?4 OR ?3 IS NULL OR ?4 IS NULL)
    AND (Libri.prezzo BETWEEN ?5 AND ?6 OR ?5 IS NULL OR ?6 IS NULL)
    AND (Libri.pagine BETWEEN ?7 AND ?8 OR ?7 IS NULL OR ?8 IS NULL)
    AND (valutazione_media >= ?9 OR ?9 IS NULL)
    AND (Generi.nome = '?10' OR '?10' = '')
    AND (Lingue.nome = '?11' OR '?11' = '')
GROUP BY Libri.ID
ORDER BY VotoMedio;