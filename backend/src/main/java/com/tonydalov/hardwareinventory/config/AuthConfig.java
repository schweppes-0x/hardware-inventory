package com.tonydalov.hardwareinventory.config;

import com.tonydalov.hardwareinventory.security.JwtFilter;
import com.tonydalov.hardwareinventory.model.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class AuthConfig {
    private final JwtFilter securityFilter;


    private static final String[] WHITELISTED_ENDPOINTS = new String[] {
            "/api/v1/auth/*"
    };

    private static final String[] HARDWARE_ENDPOINTS = new String[]{
            "/api/v1/hardware",
            "/api/v1/hardware/*"
    };

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, WHITELISTED_ENDPOINTS).permitAll()

                        .requestMatchers(HttpMethod.GET,HARDWARE_ENDPOINTS).hasAuthority(UserRole.ADMIN.getRole())
                        .requestMatchers(HttpMethod.POST,HARDWARE_ENDPOINTS).hasAuthority(UserRole.ADMIN.getRole())
                        .requestMatchers(HttpMethod.PUT,HARDWARE_ENDPOINTS).hasAuthority(UserRole.ADMIN.getRole())
                        .requestMatchers(HttpMethod.DELETE,HARDWARE_ENDPOINTS).hasAuthority(UserRole.ADMIN.getRole())
                        .anyRequest().authenticated())

                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}