package in.sunny.musifyapi.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    // Generate JWT token
    public String generateToken(UserDetails userDetails, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", role);
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSigningKey())
                .compact();
    }

    // Convert secret to signing key
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // Extract email (subject) from token
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract any claim using resolver
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract all claims (updated for JJWT 0.11.5)
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()           // 🔹 Use parserBuilder
                .setSigningKey(getSigningKey()) // 🔹 Provide Key object
                .build()
                .parseClaimsJws(token)         // 🔹 parseClaimsJws returns Jws<Claims>
                .getBody();                     // 🔹 get the payload (Claims)
    }

    public boolean validateToken(String jwtToken, UserDetails userDetails) {
        final String email = extractEmail(jwtToken);          // extract subject
        return (email.equals(userDetails.getUsername())    // match user
                && !isTokenExpired(jwtToken));
    }
    // Helper method to check expiration
    private boolean isTokenExpired(String jwttoken) {
        return extractClaim(jwttoken, Claims::getExpiration).before(new Date());
    }


}
