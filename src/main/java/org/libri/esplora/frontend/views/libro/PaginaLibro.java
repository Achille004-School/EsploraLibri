package org.libri.esplora.frontend.views.libro;

import java.text.DecimalFormat;

import org.libri.esplora.backend.data.service.RisultatoRicerca;
import org.libri.esplora.frontend.views.ImpaginazionePrincipale;
import org.libri.esplora.frontend.views.home.GeneratoreCarte;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dependency.JavaScript;
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
import com.vaadin.flow.server.VaadinSession;
import com.vaadin.flow.theme.lumo.LumoIcon;

@PageTitle("Libro")
@Route(value = "libro/:idLibro?", layout = ImpaginazionePrincipale.class)
@CssImport("./css/home.css")
@JavaScript("https://code.jquery.com/jquery-3.7.0.js")
public class PaginaLibro extends VerticalLayout implements HasUrlParameter<Long> {
    private static final DecimalFormat FORMATTATORE_EURO = new DecimalFormat("#.00");

    public PaginaLibro() {
        super();

        this.setHeightFull();
        this.setPadding(false);
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
        VerticalLayout layoutLibro = new VerticalLayout();
        layoutLibro.setClassName("libro_visualizza");
        layoutLibro.setAlignItems(Alignment.CENTER);
        if (libro != null) {
            VaadinSession sessione = VaadinSession.getCurrent();
            sessione.lock();
            sessione.setAttribute("ultimo_libro", libro);
            sessione.unlock();

            layoutLibro.add(new H1(
                    libro.getTitolo() + (libro.getVolume() != null ? " (" + libro.getVolume() + "° vol.)" : "")));
            layoutLibro.add(new H2(libro.getAutore()));
            layoutLibro.add(new H3(libro.getGenere()));

            if (!libro.getLink().equals("?")) {
                layoutLibro.add(new Paragraph(
                        new Anchor(libro.getLink(), "Clicca qui per andare al sito"),
                        new Span(" " + (libro.getPrezzo() != -1
                                ? FORMATTATORE_EURO.format(libro.getPrezzo()).replace(".", ",") + " €"
                                : "Prezzo non disponibile"))));
            } else {
                layoutLibro.add(new Paragraph("Link e prezzo non disponibili"));
            }

            layoutLibro.add(new Paragraph(libro.getEditore() + " (" + libro.getAnnoEdizione() + ") - "
                    + (libro.getPagine() != -1 ? libro.getPagine() + " pagine" : "Pagine non disponibili")));
            layoutLibro.add(new Paragraph(libro.getLingua() + " (" + libro.getCodLingua() + ")"));
            layoutLibro.add(new Paragraph(libro.getEan()));

            Paragraph descrizione = new Paragraph(
                    (!libro.getDescrizione().equals("?") ? libro.getDescrizione() : "Descrizone non disponibile"));
            descrizione.setWidth("80%");
            layoutLibro.add(descrizione);

            Paragraph voto = new Paragraph(
                    GeneratoreCarte.creaStelle(libro.getValutazioneMedia()).toArray(new Icon[5]));
            voto.add(" (" + libro.getNumeroValutazioni() + ")");
            layoutLibro.add(voto);

            IntegerField campoVoto = new IntegerField("Dacci la tua opinione su questo libro!",
                    "Scrivi il voto da 1 a 5");
            campoVoto.setWidth("20em");
            campoVoto.setMin(1);
            campoVoto.setMax(5);
            Button bottoneConferma = new Button(LumoIcon.CHECKMARK.create());
            bottoneConferma.addClickListener(evento -> {
                Integer valoreVoto = campoVoto.getValue();
                if (valoreVoto != null && valoreVoto >= 1 && valoreVoto <= 5) {
                    UI.getCurrent().getPage().executeJs("""
                        var data = {
                            id_libro: $0,
                            valutazione: $1
                        }
                        
                        var csfrHeader = $(\"meta[name='_csrf_header']\").attr('content');
                        var csfrToken = $(\"meta[name='_csrf']\").attr('content');
                        
                        console.log('Utilizzando il token: ' + csfrHeader + '\\n' + csfrToken);
                        $.ajaxSetup({
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader(csfrHeader, csfrToken);
                            }
                        });
                        
                        $.ajax({
                            url: 'http://localhost:8080/EsploraLibri/api/aggiungi_voto',
                            type: 'POST',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            success: function (data) {
                                console.log('Voto aggiunto.');
                            },
                            error: function (data) {
                                console.log(\"Errore durante l'invio del voto!\");
                            }
                        });
                        """, libro.getIdLibro().toString(), valoreVoto.toString());

                    bottoneConferma.setEnabled(false);
                    // UI.getCurrent().getPage().reload();
                }
            });
            campoVoto.setSuffixComponent(bottoneConferma);
            layoutLibro.add(campoVoto);
        } else {
            layoutLibro.add(new H1("Libro non trovato"));
        }
        this.add(layoutLibro);

        RestTemplate modelloRest = new RestTemplate();
        Double prezzoMedio = modelloRest.getForObject("http://localhost:8080/EsploraLibri/api/prezzo_medio", Double.class);
        this.add(ImpaginazionePrincipale.creaFooter(prezzoMedio));
    }
}
