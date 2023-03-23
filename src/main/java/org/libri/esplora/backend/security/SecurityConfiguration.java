package org.libri.esplora.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests()
                .anyRequest().permitAll()
                .and()
            .csrf().disable().authorizeHttpRequests() //.ignoringRequestMatchers("/h2-console/**")
                .and()
            .headers().frameOptions().disable()
                .and()
            .httpBasic();

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