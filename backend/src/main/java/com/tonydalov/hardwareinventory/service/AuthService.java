package com.tonydalov.hardwareinventory.service;

import com.tonydalov.hardwareinventory.model.User;
import com.tonydalov.hardwareinventory.repository.UserRepository;
import com.tonydalov.hardwareinventory.rest.auth.SignUpDto;
import com.tonydalov.hardwareinventory.security.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return repository.findByUsername(username);
    }

    public void signUp(SignUpDto data) throws RuntimeException {
        if (repository.findByUsername(data.username()) != null) {
            throw new RuntimeException("Username already exists");
        }

        String encryptedPassword = passwordEncoder.encode(data.password());
        User newUser = new User(data.username(), encryptedPassword, data.role());
        repository.save(newUser);
    }

    public String login(User user){
        return tokenProvider.generateAccessToken(user);
    }
}
