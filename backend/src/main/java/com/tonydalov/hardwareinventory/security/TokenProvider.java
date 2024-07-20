package com.tonydalov.hardwareinventory.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.tonydalov.hardwareinventory.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenProvider {
    @Value("${security.jwt.token.secret-key}")
    private String jwtSecret;
    @Value("${security.jwt.token.expiration-hours}")
    private long expirationHours;

    public String generateAccessToken(User user){
        try{
            return JWT.create()
                    .withSubject(user.getUsername())
                    .withClaim("username", user.getUsername())
                    .withExpiresAt(genExpirationDate())
                    .sign(Algorithm.HMAC256(jwtSecret));
        }catch (JWTCreationException exception){
            throw new JWTCreationException("Could not generate access token", exception);
        }
    }

    public String extractUsernameFromToken(String token) {
        try {
            return JWT.require(Algorithm.HMAC256(jwtSecret))
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception) {
            throw new JWTVerificationException("Error while validating token", exception);
        }
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        if (authHeader == null)
            return null;
        return authHeader.replace("Bearer ", "");
    }

    private Date genExpirationDate() {
        long expirationMillis = expirationHours * 1000 * 60 * 60; // Convert hours to milliseconds
        return new Date(System.currentTimeMillis() + expirationMillis);
    }
}
