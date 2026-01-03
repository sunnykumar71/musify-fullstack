package in.sunny.musifyapi.dto;

import lombok.Data;

@Data
public class AuthRequest {

    private String email;
    private String password;
    private String portal;
}
