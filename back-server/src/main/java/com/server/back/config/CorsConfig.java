package com.server.back.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		//todo
		registry.addMapping("/**")
			.allowedOrigins("http://localhost:8080", "http://localhost:3000", "https://k8e206.p.ssafy.io", "https://modoostock.com")
			.allowedMethods("GET", "POST", "PUT", "DELETE")
			.exposedHeaders("Access-Control-Allow-Headers, Authorization, X-Refresh-Token")
			.allowCredentials(true);
	}

}

