package com.server.back.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.JwtException;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Log4j2
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		try {
			filterChain.doFilter(request, response); // JwtAuthenticationFilter로 이동
		} catch (JwtException ex) {
			// JwtAuthenticationFilter에서 예외 발생하면 바로 setErrorResponse 호출
			setErrorResponse(request, response, ex);
		}
	}


	public void setErrorResponse(HttpServletRequest req, HttpServletResponse res, Throwable ex) throws IOException {

		res.setContentType(MediaType.APPLICATION_JSON_VALUE);

		final Map<String, Object> body = new HashMap<>();
		body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
		body.put("error", "Unauthorized");
		// ex.getMessage() 에는 jwtException을 발생시키면서 입력한 메세지가 들어있다.
		body.put("message", ex.getMessage());
		body.put("path", req.getServletPath());
		final ObjectMapper mapper = new ObjectMapper();
		mapper.writeValue(res.getOutputStream(), body);
		res.setStatus(HttpServletResponse.SC_OK);
	}

}
