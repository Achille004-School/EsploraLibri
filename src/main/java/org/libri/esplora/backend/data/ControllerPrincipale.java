package org.libri.esplora.backend.data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;
import java.util.Optional;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.entity.Voti;
import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.backend.data.service.ServizioRicerca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;
import lombok.Data;

@Component
@RestController // no need to specify @ResponseBody for @RequestMapping methods
@RequestMapping(path = "api")
public class ControllerPrincipale {

    @PersistenceUnit
    private EntityManagerFactory cratoreGestoreEntita;

    private final ServizioRicerca servizioRicerca;

    @Autowired
    public ControllerPrincipale(ServizioRicerca servizioRicerca) {
        this.servizioRicerca = servizioRicerca;
    }

    // @Autowired
    // private PasswordEncoder encoder;
    //
    // @PostMapping(path = "/register")
    // public String addUser(@RequestParam String username, @RequestParam String password) {
    //     if (this.userRepository.findByUsername(username) != null) {
    //         return "Username not available";
    //     }
    //
    //     User account = new User();
    //     account.setUsername(username);
    //     account.setEmail(email);
    //     account.setEncodedPassword(encoder.encode(password));
    //     account.setRoles(Set.of(Role.USER));
    //     account.setCreated(LocalDateTime.now());
    //
    //     userRepository.save(account);
    //     return "OK:" + account.getId();
    // }

    @GetMapping(path = "ricerca", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<RisultatoRicerca>> ricerca(
            @RequestParam(defaultValue = "") String valore_ricerca,
            @RequestParam(defaultValue = "1950") Year anno_min,         @RequestParam(defaultValue = "2050") Year anno_max,
            @RequestParam(defaultValue = "-1") Float prezzo_min,        @RequestParam(defaultValue = "9999") Float prezzo_max,
            @RequestParam(defaultValue = "-1") Short pagine_min,        @RequestParam(defaultValue = "32767") Short pagine_max,
            @RequestParam(defaultValue = "0") Double valutazione_min,   @RequestParam(defaultValue = "") String genere,             
            @RequestParam(defaultValue = "") String lingua,             @RequestParam(defaultValue = "10") Integer max_risultati) {
        return ResponseEntity.ok(
            servizioRicerca.ricerca(valore_ricerca, anno_min, anno_max, prezzo_min, prezzo_max, pagine_min, pagine_max, valutazione_min, genere, lingua, max_risultati)
        );
    }

    @GetMapping(path = "ricerca_id", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Optional<RisultatoRicerca>> ricercaId(@RequestParam Long id) {
        return ResponseEntity.ofNullable(servizioRicerca.ricercaId(id));
    }

    @GetMapping(path = "prezzo_medio")
    public ResponseEntity<Double> prezzoMedio() {
        return ResponseEntity.ok(servizioRicerca.prezzoMedio());
    }

    @PostMapping(path = "aggiungi_voto", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> aggiungiLibro(@RequestBody InformazioniVoto infoVoto) {
        try {
            EntityManager gestoreEntita = cratoreGestoreEntita.createEntityManager();

            Voti votoDaSalvare = new Voti();
            votoDaSalvare.setValutazione(infoVoto.getValutazione());
            votoDaSalvare.setDataOra(LocalDateTime.now());
            votoDaSalvare.setLibro(gestoreEntita.find(Libri.class, infoVoto.getIdLibro()));

            gestoreEntita.getTransaction().begin();
            gestoreEntita.persist(votoDaSalvare);
            gestoreEntita.getTransaction().commit();
            gestoreEntita.close();

            return new ResponseEntity<>(Boolean.TRUE, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Boolean.FALSE, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Data
    static class InformazioniVoto implements Serializable {
        @JsonCreator
        public InformazioniVoto(@JsonProperty("id_libro") Long idLibro, @JsonProperty("valutazione") Byte valutazione) {
            this.idLibro = idLibro;
            this.valutazione = valutazione;
        }

        private final Long idLibro;
        private final Byte valutazione;
    }
}