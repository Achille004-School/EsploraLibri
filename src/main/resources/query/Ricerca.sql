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
WHERE Libri.annoEdizione BETWEEN ?2 AND ?3
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
HAVING COALESCE(AVG(Voti.valutazione), -1) >= ?8
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
                                CONCAT(Autori.nomeAutore, ' ', Autori.cognomeAutore)
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
                            CONCAT(Autori.nomeAutore, ' ', Autori.cognomeAutore)
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
    COALESCE(AVG(Voti.valutazione), -1) DESC