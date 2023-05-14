package org.libri.esplora.backend.data;

import java.time.LocalDateTime;
import java.time.Year;
import java.util.List;
import java.util.Optional;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.entity.Voti;
import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.backend.data.service.ServizioRicerca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;

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

    @GetMapping(path = "ricerca")
    public ResponseEntity<List<RisultatoRicerca>> ricerca(
            @RequestParam(defaultValue = "") String valore_ricerca,
            @RequestParam(defaultValue = "1950") Year anno_min,         @RequestParam(defaultValue = "2050") Year anno_max,
            @RequestParam(defaultValue = "-1") Float prezzo_min,        @RequestParam(defaultValue = "9999") Float prezzo_max,
            @RequestParam(defaultValue = "-1") Short pagine_min,        @RequestParam(defaultValue = "32767") Short pagine_max,
            @RequestParam(defaultValue = "0") Double valutazione_min,
            @RequestParam(defaultValue = "") String genere,             @RequestParam(defaultValue = "") String lingua) {
        List<RisultatoRicerca> risultato = servizioRicerca.ricerca(valore_ricerca, anno_min, anno_max, prezzo_min,
                prezzo_max, pagine_min, pagine_max, valutazione_min, genere, lingua);
        return ResponseEntity.ok(risultato);
    }

    @GetMapping(path = "ricerca_id")
    public ResponseEntity<Optional<RisultatoRicerca>> ricercaId(@RequestParam Long id) {
        return ResponseEntity.ofNullable(servizioRicerca.ricercaId(id));
    }

    @GetMapping(path = "prezzo_medio")
    public ResponseEntity<Double> prezzoMedio() {
        return ResponseEntity.ok(servizioRicerca.prezzoMedio());
    }

    @GetMapping(path = "aggiungi_voto")
    public ResponseEntity<Boolean> aggiungiLibro(@RequestParam() Long id_libro, @RequestParam Byte valutazione) {
        try {
            EntityManager gestoreEntita = cratoreGestoreEntita.createEntityManager();

            Voti votoDaSalvare = new Voti();
            votoDaSalvare.setValutazione(valutazione);
            votoDaSalvare.setDataOra(LocalDateTime.now());
            votoDaSalvare.setLibro(gestoreEntita.find(Libri.class, id_libro));

            gestoreEntita.getTransaction().begin();
            gestoreEntita.persist(votoDaSalvare);
            gestoreEntita.getTransaction().commit();
            gestoreEntita.close();

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.unprocessableEntity().build();
        }
    }
}