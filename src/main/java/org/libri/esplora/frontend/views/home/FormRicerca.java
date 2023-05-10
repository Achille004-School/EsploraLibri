package org.libri.esplora.frontend.views.home;

import java.util.Arrays;
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
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.component.textfield.TextField;

public class FormRicerca extends FormLayout {
    private final RepositoryGeneri repositoryGeneri = EsploraLibriApplicazione.ottieniBean(RepositoryGeneri.class);
    private final RepositoryLingue repositoryLingue = EsploraLibriApplicazione.ottieniBean(RepositoryLingue.class);

    private final Label etichettaLibri;
    private final Div tuttiLibri;

    private TextField ricerca = new TextField("Ricerca", "Scrivi ean/isbn, titolo, autore o descrizione...");
    private IntegerField pagineMin = new IntegerField("Pagine");
    private IntegerField pagineMax = new IntegerField();
    private NumberField valutazioneMin = new NumberField("Valutazione minima");
    private Select<String> genere = new Select<>("Genere", e -> {});
    private Select<String> lingua = new Select<>("Lingua", e -> {});

    private IntegerField quantitaRisultati = new IntegerField("Quantità risultati");

    public FormRicerca(Label etichettaLibri, Div tuttiLibri) {
        this.etichettaLibri = etichettaLibri;
        this.tuttiLibri = tuttiLibri;
        this.setSizeUndefined();

        Button bottoneRicerca = new Button(VaadinIcon.SEARCH.create());
        bottoneRicerca.addClickListener(e -> processaForm());
        bottoneRicerca.addClickShortcut(Key.ENTER);
        ricerca.setPrefixComponent(bottoneRicerca);
        this.add(ricerca, 2);

        this.add(creaFiltri(), 2);

        this.processaForm();
    }

    private Details creaFiltri() {
        FormLayout formFiltri = new FormLayout();
        
        pagineMin.setPlaceholder("Pagine minime");
        pagineMin.setMin(1);
        pagineMin.setMax(Short.MAX_VALUE);
        formFiltri.add(pagineMin, 1);

        pagineMax.setPlaceholder("Pagine massime");
        pagineMax.setMin(1);
        pagineMax.setMax(Short.MAX_VALUE);
        formFiltri.add(pagineMax, 1);

        genere.setItems(repositoryGeneri.findAllByOrderByNomeAsc().stream().map(Generi::getNome).collect(Collectors.toList()));
        genere.setEmptySelectionAllowed(true);
        formFiltri.add(genere, 1);

        valutazioneMin.setMin(-1);
        valutazioneMin.setMax(5);
        valutazioneMin.setValue(-1d);
        valutazioneMin.setStep(0.5);
        valutazioneMin.setStepButtonsVisible(true);
        formFiltri.add(valutazioneMin, 1);

        lingua.setItems(repositoryLingue.findAllByOrderByNomeAsc().stream().map(Lingue::getNome).collect(Collectors.toList()));
        lingua.setEmptySelectionAllowed(true);
        formFiltri.add(lingua, 1);

        quantitaRisultati.setMin(5);
        quantitaRisultati.setMax(25);
        quantitaRisultati.setValue(10);
        quantitaRisultati.setStepButtonsVisible(true);
        formFiltri.add(quantitaRisultati);

        
        Details filtri = new Details("Filtri");
        filtri.setContent(formFiltri);
        return filtri;
    }

    private void processaForm() {
        String richiesta = "http://localhost:8080/EsploraLibri/api/ricerca?"
            + FormRicerca.creaParametro("valore_ricerca", ricerca.getValue())
            // TODO anno_min, anno_max, prezzo_min, prezzo_max
            + FormRicerca.creaParametro("pagine_min", pagineMin.getValue())
            + FormRicerca.creaParametro("pagine_max", pagineMax.getValue())
            + FormRicerca.creaParametro("valutazione_min", valutazioneMin.getValue())
            + FormRicerca.creaParametro("genere", genere.getValue())
            + FormRicerca.creaParametro("lingua", lingua.getValue());
            
        aggiornaRisultati(richiesta, quantitaRisultati.getValue());
    }

    private void aggiornaRisultati(String richiesta, int risultati) {
        System.out.println("Richiesta REST: " + richiesta);

        RestTemplate modelloRest = new RestTemplate();
        ResponseEntity<RisultatoRicerca[]> risposta = modelloRest.exchange(richiesta, HttpMethod.GET, null,
                new ParameterizedTypeReference<RisultatoRicerca[]>() {
                });

        tuttiLibri.removeAll();

        Div[] libri = GeneratoreCarte.ofArray(risposta.getBody());
        int indiceMassimo = (risultati < libri.length) ? risultati : libri.length;

        etichettaLibri.setText("Elenco libri (" + indiceMassimo + " risultato/i)");
        tuttiLibri.add(Arrays.copyOfRange(libri, 0, indiceMassimo));
    }

    private static String creaParametro(String nomeParametro, Object valoreParametro) {
        return (valoreParametro != null) ? "&" + nomeParametro + "=" + valoreParametro.toString() : "";
    }
}
