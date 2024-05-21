package SocialNetwork.SocialNetwork.auth;

import SocialNetwork.SocialNetwork.common.ApiResponse;
import SocialNetwork.SocialNetwork.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (CustomException e) {
            return new ResponseEntity<>(new AuthenticationResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        try{
            return ResponseEntity.ok(service.authenticate(request));
        }catch (CustomException e){
            return new ResponseEntity<>(new AuthenticationResponse(e.getMessage()), HttpStatus.FORBIDDEN);
        }
    }
}