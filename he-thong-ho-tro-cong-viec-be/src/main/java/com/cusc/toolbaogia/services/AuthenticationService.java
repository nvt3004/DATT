package com.cusc.toolbaogia.services;

import com.cusc.toolbaogia.dto.request.IntrospectRequest;
import com.cusc.toolbaogia.dto.response.IntrospectResponse;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();

        byte[] decodedKey = Base64.getDecoder().decode(SIGNER_KEY);
        if (decodedKey.length < 32) {
            decodedKey = Arrays.copyOf(decodedKey, 32);
        }

        JWSVerifier verifier = new MACVerifier(decodedKey);
        SignedJWT signedJWT = SignedJWT.parse(token);

        boolean isSignatureValid = signedJWT.verify(verifier);
        JWTClaimsSet claimsSet = signedJWT.getJWTClaimsSet();
        Date expiration = claimsSet.getExpirationTime();
        boolean isTokenNotExpired = expiration != null && expiration.after(new Date());

        boolean isTokenValid = isSignatureValid && isTokenNotExpired;

        return IntrospectResponse.builder()
                .valid(isTokenValid)
                .build();
    }

//     public AuthenticationResponse authenticate(AuthenticationRequest request) {
//         PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
//
//         var nguoiDung = nguoiDungRepository.findNguoiDungByDangnhap(request.getDangnhap())
//                 .orElseThrow(() -> new AppException(ErrorCode.OBJECT_NOT_EXISTED, "Người dùng"));
//
//         boolean authenticated = passwordEncoder.matches(request.getMatkhau(), nguoiDung.getMatkhau());
//
//         if(!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);
//
//         var token = generateToken(request.getDangnhap());
//
//         return AuthenticationResponse.builder()
//                 .token(token)
//                 .authenticated(true)
//                 .build();
//     }

//     public String generateToken(String dangnhap) {
//         JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
//
//         JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
//                 .subject(dangnhap)
//                 .issuer("kido.com")
//                 .issueTime(new Date())
//                 .expirationTime(new Date(
//                         Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
//                 ))
//                 .claim("userId", "Custom")
//                 .build();
//
//         Payload payload = new Payload(jwtClaimsSet.toJSONObject());
//
//         JWSObject jwsObject =   new JWSObject(header, payload);
//
//         try {
//             jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
//             return jwsObject.serialize();
//         } catch (JOSEException e) {
//             log.error("Can't create token",e);
//             throw new RuntimeException(e);
//         }
//     }

}
