package org.libri.esplora.frontend.views;

import java.text.DecimalFormat;

import org.libri.esplora.frontend.VaadinComponents.Italic;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;

@CssImport("./css/root.css")
public class ImpaginazionePrincipale extends AppLayout {
    private static final DecimalFormat FORMATTATORE_EURO = new DecimalFormat("#.00");
    private final H2 titoloVista;

    public ImpaginazionePrincipale() {
        titoloVista = new H2();
        titoloVista.addClassNames("titolo-vista");

        // Use the drawer for the menu
        this.setPrimarySection(Section.DRAWER);

        // Make the nav bar a header
        this.addToNavbar(false, createHeaderContent());
    }

    private Component createHeaderContent() {
        VerticalLayout intestazione = new VerticalLayout();
        // Configure styling for the header
        intestazione.setId("intestazione");
        intestazione.setWidthFull();
        intestazione.setPadding(false);
        intestazione.setSpacing(false);
        intestazione.setAlignItems(Alignment.CENTER);

        Div separatore = new Div();
        separatore.setClassName("separatore");
        separatore.setHeight("5px");
        separatore.setWidthFull();

        intestazione.add(getTitoloPagina(), separatore);
        return intestazione;
    }

    private VerticalLayout getTitoloPagina() {
        VerticalLayout titoloPagina = new VerticalLayout();

        H1 nomeApp = new H1("Esplora Libri");
        nomeApp.addClassName("nome-app");

        titoloPagina.setWidthFull();
        titoloPagina.setSpacing(false);
        titoloPagina.add(nomeApp, titoloVista);
        return titoloPagina;
    }

    @Override
    protected void afterNavigation() {
        super.afterNavigation();

        // Set the view title in the header
        titoloVista.setText(this.getTitoloPaginaCorrente());
    }

    private String getTitoloPaginaCorrente() {
        PageTitle titolo = getContent().getClass().getAnnotation(PageTitle.class);
        return titolo == null ? "" : titolo.value();
    }

    public static Footer creaFooter(Double votoMedio) {
        Footer footer = new Footer();

        Image logoCopyright = new Image("https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg", "Licenza Creative Commons");
        Anchor linkCopyright = new Anchor("https://creativecommons.org/licenses/by-nc-sa/4.0", logoCopyright);

        footer.add(new Paragraph("Creato da Francesco Marras e Paolo Andreotti"), new Span(linkCopyright));
        footer.add(new Italic("Lo sapevi che i nostri libri hanno un prezzo medio di " + FORMATTATORE_EURO.format(votoMedio).replace(".", ",") + " €?"));

        return footer;
    }
}