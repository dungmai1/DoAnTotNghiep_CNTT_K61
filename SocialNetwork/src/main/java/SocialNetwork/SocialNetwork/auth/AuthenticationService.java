package SocialNetwork.SocialNetwork.auth;
import SocialNetwork.SocialNetwork.config.JwtService;
import SocialNetwork.SocialNetwork.domain.entities.Role;
import SocialNetwork.SocialNetwork.domain.entities.User;
import SocialNetwork.SocialNetwork.exception.CustomException;
import SocialNetwork.SocialNetwork.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.http.HttpRequest;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        User checkUser = userRepository.findByPhone(request.getPhone()).orElse(null);
        if(checkUser!=null){
            throw new CustomException("User with this phone number already exists");
        }
        var user = User.builder()
                .username(request.getUsername())
                .displayname(request.getDisplayname())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        User checkUser = userRepository.findByPhone(request.getPhone()).orElse(null);
        if(checkUser==null){
            throw new CustomException("User with this phone number not exists");
        }
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getPhone(),
                    request.getPassword()
            )
        );
        var user = userRepository.findByPhone(String.valueOf(request.getPhone()))
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
