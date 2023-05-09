package org.libri.esplora.frontend.views.home;

import java.util.stream.Collectors;

import org.libri.esplora.EsploraLibriApplicazione;
import org.libri.esplora.backend.data.entity.Generi;
import org.libri.esplora.backend.data.entity.Lingue;
import org.libri.esplora.backend.data.repository.RepositoryGeneri;
import org.libri.esplora.backend.data.repository.RepositoryLingue;
import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.TextField;

public class FormRicerca extends FormLayout {
    private final RepositoryGeneri repositoryGeneri = EsploraLibriApplicazione.ottieniBean(RepositoryGeneri.class);
    private final RepositoryLingue repositoryLingue = EsploraLibriApplicazione.ottieniBean(RepositoryLingue.class);

    private final Div tuttiLibri;

    private TextField ricerca = new TextField("Ricerca", "Scrivi ean/isbn, titolo, autore o descrizione...");
    private Select<String> genere = new Select<>("Genere", e -> {});
    private Select<String> lingua = new Select<>("Lingua", e -> {});

    public FormRicerca(Div tuttiLibri) {
        this.tuttiLibri = tuttiLibri;
        this.aggiornaRisultati("http://localhost:8080/EsploraLibri/api/ricerca");

        this.setSizeUndefined();
        
        Button bottoneRicerca = new Button(VaadinIcon.SEARCH.create());
        bottoneRicerca.addClickListener(e -> processaForm());
        bottoneRicerca.addClickShortcut(Key.ENTER);
        ricerca.setPrefixComponent(bottoneRicerca);
        this.add(ricerca, 2);

        genere.setItems(repositoryGeneri.findAllByOrderByNomeAsc().stream().map(Generi::getNome).collect(Collectors.toList()));
        genere.setEmptySelectionAllowed(true);
        this.add(genere, 1);

        lingua.setItems(repositoryLingue.findAllByOrderByNomeAsc().stream().map(Lingue::getNome).collect(Collectors.toList()));
        lingua.setEmptySelectionAllowed(true);
        this.add(lingua, 1);
    }

    public void processaForm() {
        String richiesta = "http://localhost:8080/EsploraLibri/api/ricerca?valore_ricerca=" + ricerca.getValue();

        // TODO mettere gli altri parametri

        String valGenere = genere.getValue();
        if(valGenere != null) {
            richiesta += "&genere=" + valGenere;
        }

        String valLingua = lingua.getValue();
        if(valLingua != null) {
            richiesta += "&lingua=" + valLingua;
        }

        aggiornaRisultati(richiesta);
    }

    private void aggiornaRisultati(String richiesta) {
        System.out.println("Richiesta: " + richiesta);

        RestTemplate modelloRest = new RestTemplate();
        ResponseEntity<RisultatoRicerca[]> risposta = modelloRest.exchange(richiesta, HttpMethod.GET, null,
                new ParameterizedTypeReference<RisultatoRicerca[]>() {
                });

        tuttiLibri.removeAll();

        Div[] carte = GeneratoreCarte.ofArray(risposta.getBody());
        // TODO Avvertire in caso di no risultati
        tuttiLibri.add(carte);
    }
}
