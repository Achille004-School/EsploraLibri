package org.libri.esplora.frontend.VaadinComponents;

import com.vaadin.flow.component.ClickNotifier;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.HtmlContainer;
import com.vaadin.flow.component.Tag;

/**
 * @author Francesco Marras
 */
@Tag("B")
public class Bold extends HtmlContainer
        implements ClickNotifier<Italic> {

    /**
     * Creates a new empty italic text.
     */
    public Bold() {
        super();
    }

    /**
     * Creates a new paragraph with the given child components.
     *
     * @param components the child components
     */
    public Bold(Component... components) {
        super(components);
    }

    /**
     * Creates a new italic text with the given text.
     *
     * @param text the text
     */
    public Bold(String text) {
        super();
        setText(text);
    }
}