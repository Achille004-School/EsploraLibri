package org.libri.esplora.backend.handlers;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GestoreErrori implements ErrorController {
    private static final String PATH = "/errore";

    @RequestMapping(value = PATH)
    public String error() {
        return "C'è stato un errore nell'elaborazione della richiesta";
    }

    public String getErrorPath() {
        return PATH;
    }
}
