SELECT Libri.ID
FROM Libri
    LEFT JOIN Voti ON Libri.ID = Voti.libro
    INNER JOIN Autori ON Libri.autore = Autori.ID
    INNER JOIN Editori ON Libri.editore = Editori.ID
    INNER JOIN Generi ON Libri.genere = Generi.ID
    INNER JOIN Lingue ON Libri.lingua = Lingue.ID
WHERE Libri.anno_edizione BETWEEN ?2 AND ?3
    AND Libri.prezzo BETWEEN ?4 AND ?5
    AND Libri.pagine BETWEEN ?6 AND ?7
    AND (
        Generi.nome = ?9
        OR ?9 = ''
    )
    AND (
        Lingue.nome = ?10
        OR ?10 = ''
    )
GROUP BY Libri.ID
HAVING COALESCE(AVG(Voti.valutazione), 0) >= ?8
    AND (
        ?1 = ''
        OR (
            CASE
                WHEN ?1 <> '' THEN (
                    (
                        CASE
                            WHEN Libri.ean = ?1 THEN 20
                            ELSE 0
                        END
                    ) + (
                        CASE
                            WHEN LOWER(Libri.titolo) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 5
                            ELSE 0
                        END
                    ) + (
                        CASE
                            WHEN LOWER(
                                CONCAT(Autori.nome, ' ', Autori.cognome)
                            ) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 3
                            ELSE 0
                        END
                    ) + (
                        CASE
                            WHEN LOWER(Libri.descrizione) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 1
                            ELSE 0
                        END
                    )
                )
                ELSE 0
            END
        ) > 0
    )
ORDER BY (
        CASE
            WHEN ?1 <> '' THEN (
                (
                    CASE
                        WHEN Libri.ean = ?1 THEN 20
                        ELSE 0
                    END
                ) + (
                    CASE
                        WHEN LOWER(Libri.titolo) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 5
                        ELSE 0
                    END
                ) + (
                    CASE
                        WHEN LOWER(
                            CONCAT(Autori.nome, ' ', Autori.cognome)
                        ) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 3
                        ELSE 0
                    END
                ) + (
                    CASE
                        WHEN LOWER(Libri.descrizione) LIKE LOWER(CONCAT('%', ?1, '%')) THEN 1
                        ELSE 0
                    END
                )
            )
            ELSE 0
        END
    ) DESC,
    COALESCE(AVG(Voti.valutazione), 0) DESC
LIMIT ?11