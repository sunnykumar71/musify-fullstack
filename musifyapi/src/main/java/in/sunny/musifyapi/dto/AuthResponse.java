package in.sunny.musifyapi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {

    private Boolean success;
    private String message;
    private String token;
    private String email;
    private String role;

    public static AuthResponse success(String token, String email, String role){
        return new AuthResponse(true, "Authentication Successful", token, email, role);
    }

    public static AuthResponse error(String message){
        return new AuthResponse(false, message, null, null, null);
    }
}
