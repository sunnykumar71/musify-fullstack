package in.sunny.musifyapi.controller;

import in.sunny.musifyapi.document.User;
import in.sunny.musifyapi.dto.AuthRequest;
import in.sunny.musifyapi.dto.AuthResponse;
import in.sunny.musifyapi.dto.RegisterRequest;
import in.sunny.musifyapi.dto.UserResponse;
import in.sunny.musifyapi.service.AppUserDetailsService;
import in.sunny.musifyapi.service.UserService;
import in.sunny.musifyapi.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request){
        try{
            User existingUser=userService.findByEmail(request.getEmail());
            if(request.getPortal().equalsIgnoreCase("admin") &&
                                    existingUser.getRole().name().equalsIgnoreCase("USER")){
                return ResponseEntity.badRequest().body("Email/Password is incorrect");
            }
            //Authenticate the user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));

            // Load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());


            //Generate jwt token
            String token = jwtUtil.generateToken(userDetails, existingUser.getRole().name());

            return ResponseEntity.ok(AuthResponse.success( token, request.getEmail(), existingUser.getRole().name()));
        }catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body("Email/Password is incorrect");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        try{
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);
        }catch(RuntimeException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}
