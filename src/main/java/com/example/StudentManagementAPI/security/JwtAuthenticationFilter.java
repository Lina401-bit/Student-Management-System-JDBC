package com.example.StudentManagementAPI.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;
import java.util.Collections;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtUtil jwtUtil;


    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println(request.getMethod() + " " + request.getServletPath());

        if (request.getServletPath().equals("/login")) {
            filterChain.doFilter(request, response);
            return;
        }


        String authHeader = request.getHeader("Authorization");


        String username = null;
        String token = null;


        if(authHeader != null && authHeader.startsWith("Bearer ")){

            token = authHeader.substring(7);

            try {

                username = jwtUtil.extractUsername(token);

            } catch(Exception e){

                System.out.println("Invalid JWT Token");
            }
        }


        if(username != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null){


            if(jwtUtil.validateToken(token)){
                System.out.println("JWT VALID USER: " + username);
                String role = jwtUtil.extractRole(token);
                System.out.println("JWT ROLE: " + role);
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                Collections.singleton(
                                        new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())
                                )
                        );


                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );


                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

            }

        }


        filterChain.doFilter(request, response);

    }
}