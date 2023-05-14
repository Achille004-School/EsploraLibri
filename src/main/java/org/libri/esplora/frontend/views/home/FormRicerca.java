package org.libri.esplora.frontend.views.home;

import java.time.Year;
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
    public static final Year ANNO_MIN = Year.of(1950);
    public static final Year ANNO_MAX = Year.of(2050);

    private final RepositoryGeneri repositoryGeneri = EsploraLibriApplicazione.ottieniBean(RepositoryGeneri.class);
    private final RepositoryLingue repositoryLingue = EsploraLibriApplicazione.ottieniBean(RepositoryLingue.class);

    private final Label etichettaLibri;
    private final Div tuttiLibri;

    private TextField ricerca = new TextField("Ricerca", "Scrivi ean/isbn, titolo, autore o descrizione...");
    private Button bottoneRicerca;
    private Details filtri;

    private IntegerField annoMin = new IntegerField("Anno");
    private IntegerField annoMax = new IntegerField();
    private NumberField prezzoMin = new NumberField("Prezzo");
    private NumberField prezzoMax = new NumberField();
    private IntegerField pagineMin = new IntegerField("Pagine");
    private IntegerField pagineMax = new IntegerField();
    private NumberField valutazioneMin = new NumberField("Valutazione minima");
    private Select<String> genere = new Select<>("Genere", evento -> {});
    private Select<String> lingua = new Select<>("Lingua", evento -> {});

    private IntegerField quantitaRisultati = new IntegerField("Quantità risultati");

    public FormRicerca(Label etichettaLibri, Div tuttiLibri) {
        super();

        this.etichettaLibri = etichettaLibri;
        this.tuttiLibri = tuttiLibri;
        this.setSizeUndefined();

        bottoneRicerca = new Button(VaadinIcon.SEARCH.create());
        bottoneRicerca.addClickListener(evento -> processaForm());
        bottoneRicerca.addClickShortcut(Key.ENTER);
        ricerca.setPrefixComponent(bottoneRicerca);

        this.add(ricerca, 2);
        
        filtri = this.creaFiltri();
        this.add(filtri, 2);

        this.processaForm();
    }

    private Details creaFiltri() {
        FormLayout formFiltri = new FormLayout();

        annoMin.setPlaceholder("Anno minimo");
        annoMin.setMin(1950);
        annoMin.setMax(2050);
        annoMin.addValueChangeListener(evento -> annoMax.setMin((evento.getValue() != null) ? evento.getValue() : 1950));
        annoMin.setSuffixComponent(VaadinIcon.CALENDAR.create());
        formFiltri.add(annoMin, 1);

        annoMax.setPlaceholder("Anno massimo");
        annoMax.setMin(1950);
        annoMax.setMax(2050);
        annoMax.addValueChangeListener(evento -> annoMin.setMax((evento.getValue() != null) ? evento.getValue() : 2050));
        annoMax.setSuffixComponent(VaadinIcon.CALENDAR.create());
        formFiltri.add(annoMax, 1);

        // Riga

        prezzoMin.setPlaceholder("Prezzo minimo");
        prezzoMin.setMin(0);
        prezzoMin.setMax(9999);
        prezzoMin.addValueChangeListener(evento -> prezzoMax.setMin((evento.getValue() != null) ? evento.getValue() : 0));
        prezzoMin.setSuffixComponent(VaadinIcon.MONEY.create());
        formFiltri.add(prezzoMin, 1);

        prezzoMax.setPlaceholder("Prezzo massimo");
        prezzoMax.setMin(0);
        prezzoMax.setMax(9999);
        prezzoMax.addValueChangeListener(evento -> prezzoMin.setMax((evento.getValue() != null) ? evento.getValue() : 9999));
        prezzoMax.setSuffixComponent(VaadinIcon.MONEY.create());
        formFiltri.add(prezzoMax, 1);
        
        // Riga

        pagineMin.setPlaceholder("Pagine minime");
        pagineMin.setMin(1);
        pagineMin.setMax(Short.MAX_VALUE);
        pagineMin.addValueChangeListener(evento -> pagineMax.setMin((evento.getValue() != null) ? evento.getValue() : 1));
        pagineMin.setSuffixComponent(VaadinIcon.OPEN_BOOK.create());
        formFiltri.add(pagineMin, 1);

        pagineMax.setPlaceholder("Pagine massime");
        pagineMax.setMin(1);
        pagineMax.setMax(Short.MAX_VALUE);
        pagineMax.addValueChangeListener(evento -> pagineMin.setMax((evento.getValue() != null) ? evento.getValue() : Short.MAX_VALUE));
        pagineMax.setSuffixComponent(VaadinIcon.OPEN_BOOK.create());
        formFiltri.add(pagineMax, 1);

        // Riga

        genere.setItems(repositoryGeneri.findAllByOrderByNomeAsc().stream().map(Generi::getNome).collect(Collectors.toList()));
        genere.setEmptySelectionAllowed(true);
        genere.setPrefixComponent(VaadinIcon.BOOKMARK.create());
        formFiltri.add(genere, 1);

        valutazioneMin.setMin(0);
        valutazioneMin.setMax(5);
        valutazioneMin.setStep(0.5);
        valutazioneMin.setStepButtonsVisible(true);
        formFiltri.add(valutazioneMin, 1);

        // Riga

        lingua.setItems(repositoryLingue.findAllByOrderByNomeAsc().stream().map(Lingue::getNome).collect(Collectors.toList()));
        lingua.setEmptySelectionAllowed(true);
        lingua.setPrefixComponent(VaadinIcon.FLAG.create());
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
        String richiesta = "http://localhost:8080/EsploraLibri/api/ricerca"
            + "?valore_ricerca=" + ricerca.getValue()
            + FormRicerca.creaParametro("anno_min", annoMin.getValue())
            + FormRicerca.creaParametro("anno_max", annoMax.getValue())
            + FormRicerca.creaParametro("prezzo_min", prezzoMin.getValue())
            + FormRicerca.creaParametro("prezzo_max", prezzoMax.getValue())
            + FormRicerca.creaParametro("pagine_min", pagineMin.getValue())
            + FormRicerca.creaParametro("pagine_max", pagineMax.getValue())
            + FormRicerca.creaParametro("valutazione_min", valutazioneMin.getValue())
            + FormRicerca.creaParametro("genere", genere.getValue())
            + FormRicerca.creaParametro("lingua", lingua.getValue());

            
        aggiornaRisultati(richiesta, quantitaRisultati.getValue());
        filtri.setOpened(false);
    }

    private void aggiornaRisultati(String richiesta, int risultati) {
        // DEBUG System.out.println("Richiesta REST: " + richiesta);

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
