package org.libri.esplora.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.XorCsrfTokenRequestAttributeHandler;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class ConfigurazioneSicurezza {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(requests -> { requests
                .requestMatchers("/actuator/**", "/h2-console/**").permitAll()
                .requestMatchers("/VAADIN/**").permitAll() // Perette a Vaadin di caricare il frontend
                .requestMatchers("/", "/home", "/libro/**").permitAll() // Pagine
                .requestMatchers("/api/**").permitAll() // Richieste REST
                .anyRequest().denyAll();
            })
            .csrf(requests -> requests
                .csrfTokenRepository(new CookieCsrfTokenRepository())
                .csrfTokenRequestHandler(new XorCsrfTokenRequestAttributeHandler())
                .ignoringRequestMatchers("/", "/home", "/libro/**", "/actuator/**", "/h2-console/**")
            )
            .headers(requests -> requests    
                .xssProtection().and()
                .frameOptions().disable()
            );

        return http.build();
    }

    // @Bean
    // public WebSecurityCustomizer ignoringCustomizer() {
    //     return (web) -> web.ignoring().requestMatchers("");
    // }

    @Bean
    public WebMvcConfigurer getWebMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow our client (on localhost:63343) to take resources from our backend
                registry.addMapping("/**").allowedOrigins("http://localhost:63343");
            }
        };
    }
}