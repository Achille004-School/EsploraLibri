package org.libri.esplora.backend.data;

import java.time.Year;
import java.util.List;
import java.util.Optional;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.backend.data.service.ServizioRicerca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Component
@RestController // no need to specify @ResponseBody for @RequestMapping methods
@RequestMapping(path = "api")
public class ControllerPrincipale {

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
            @RequestParam(defaultValue = "-999999999") Year anno_min,  @RequestParam(defaultValue = "999999999") Year anno_max,
            @RequestParam(defaultValue = "0") Float prezzo_min,        @RequestParam(defaultValue = "999999999") Float prezzo_max,
            @RequestParam(defaultValue = "1") Short pagine_min,        @RequestParam(defaultValue = "32767") Short pagine_max,
            @RequestParam(defaultValue = "-1") Byte valutazione_min,
            @RequestParam(defaultValue = "") String genere,            @RequestParam(defaultValue = "") String lingua) {
        // TODO Controlli sui valori

        List<RisultatoRicerca> risultato = servizioRicerca.ricerca(valore_ricerca, anno_min, anno_max, prezzo_min, prezzo_max, pagine_min, pagine_max, valutazione_min, genere, lingua);
        return ResponseEntity.ofNullable(risultato);
    }

    @GetMapping(path = "ricercaId")
    public ResponseEntity<Optional<RisultatoRicerca>> ricercaId(@RequestParam Long id) {
        return ResponseEntity.ofNullable(servizioRicerca.ricercaId(id));
    }
}