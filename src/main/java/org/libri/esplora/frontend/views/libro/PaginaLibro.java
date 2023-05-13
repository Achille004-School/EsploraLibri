package org.libri.esplora.frontend.views.libro;

import java.text.DecimalFormat;
import java.time.LocalDateTime;

import org.libri.esplora.backend.data.entity.Libri;
import org.libri.esplora.backend.data.entity.Voti;
import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.views.ImpaginazionePrincipale;
import org.libri.esplora.frontend.views.home.GeneratoreCarte;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.theme.lumo.LumoIcon;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.PersistenceUnit;

@PageTitle("Libro")
@Route(value = "libro/:idLibro?", layout = ImpaginazionePrincipale.class)
public class PaginaLibro extends VerticalLayout implements HasUrlParameter<Long> {
    private static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("#.00");

    @PersistenceUnit
    private EntityManagerFactory cratoreGestoreEntita;

    public PaginaLibro() {
        super();
        this.setAlignItems(Alignment.CENTER);
    }

    @Override
    public void setParameter(BeforeEvent evento, Long idLibro) {
        RestTemplate modelloRest = new RestTemplate();
        ResponseEntity<RisultatoRicerca> risposta = modelloRest.exchange(
                "http://localhost:8080/EsploraLibri/api/ricerca_id?id=" + idLibro, HttpMethod.GET, null,
                new ParameterizedTypeReference<RisultatoRicerca>() {
                });

        this.agggiungiLibro(risposta.getBody());
    }

    private void agggiungiLibro(RisultatoRicerca libro) {
        if (libro != null) {
            this.add(new H1(libro.getTitolo() + (libro.getVolume() != null ? " (" + libro.getVolume() + "° vol.)" : "")));
            this.add(new H2(libro.getAutore()));
            this.add(new H3(libro.getGenere()));

            if(!libro.getLink().equals("?")) {
                this.add(new Paragraph(
                    new Anchor(libro.getLink(), "Clicca qui per andare al sito "), 
                    new Span(libro.getPrezzo() != -1 ? DECIMAL_FORMAT.format(libro.getPrezzo()).replace(".", ",") + " €" : "Prezzo non disponibile")));
            } else {
                this.add(new Paragraph("Link e prezzo non disponibili"));
            }

            this.add(new Paragraph(libro.getEditore() + " (" + libro.getAnnoEdizione() + ") - " + (libro.getPagine() != -1 ? libro.getPagine() + " pagine" : "Pagine non disponibili")));
            this.add(new Paragraph(libro.getLingua() + " (" + libro.getCodLingua() + ")"));
            this.add(new Paragraph(libro.getEan()));

            Paragraph descrizione = new Paragraph((!libro.getDescrizione().equals("?") ? libro.getDescrizione() : "Descrizone non disponibile"));
            descrizione.setWidth("50em");
            this.add(descrizione);

            Paragraph voto = new Paragraph(GeneratoreCarte.creaStelle(libro.getValutazioneMedia()).toArray(new Icon[5]));
            voto.add(" (" + libro.getNumeroValutazioni() + ")");
            this.add(voto);

            IntegerField campoVoto = new IntegerField("Dacci la tua opinione su questo libro!", "Scrivi il voto da 1 a 5");
            campoVoto.setWidth("20em");
            Button bottoneConferma = new Button(LumoIcon.CHECKMARK.create());
            bottoneConferma.addClickListener(evento -> {
                Integer valoreVoto = campoVoto.getValue();
                if(valoreVoto != null && valoreVoto >= 0 && valoreVoto <= 5){
                    EntityManager gestoreEntita = cratoreGestoreEntita.createEntityManager();

                    Voti votoDaSalvare = new Voti();
                    votoDaSalvare.setValutazione((byte) valoreVoto.intValue());
                    votoDaSalvare.setDataOra(LocalDateTime.now());
                    votoDaSalvare.setLibro(gestoreEntita.find(Libri.class, libro.getIdLibro()));

                    gestoreEntita.getTransaction().begin();
                    gestoreEntita.persist(votoDaSalvare);
                    gestoreEntita.getTransaction().commit();
                    gestoreEntita.close();

                    bottoneConferma.setEnabled(false);
                }
            });
            campoVoto.setSuffixComponent(bottoneConferma);
            this.add(campoVoto);
        } else {
            this.add(new H1("Libro non trovato"));
        }
    }
}
