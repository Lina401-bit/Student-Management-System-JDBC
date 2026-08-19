package com.example.StudentManagementAPI.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;


@Component
public class JwtUtil {


    private final String SECRET_KEY =
            "mySecretKeyThatIsLongEnoughForJwtAuthentication12345";


    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username, String role){

        return Jwts.builder()

                .subject(username)
                .claim("role", role)

                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 60 * 60 * 1000
                        )
                )

                .signWith(getSigningKey())

                .compact();

    }


    public String extractUsername(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();

    }

    public String extractRole(String token) {

        return Jwts.parser()

                .verifyWith(getSigningKey())

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("role", String.class);

    }
    public boolean validateToken(String token) {

        try {

            Jwts.parser()

                    .verifyWith(getSigningKey())

                    .build()

                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;

        }

    }

}