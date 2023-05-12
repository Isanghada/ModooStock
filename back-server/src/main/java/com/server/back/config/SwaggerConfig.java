package com.server.back.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.spi.service.contexts.SecurityContext;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;
import java.util.List;


@Configuration
public class SwaggerConfig implements WebMvcConfigurer {

	@Bean
	public Docket apiServer() {
		//        return new Docket(DocumentationType.SWAGGER_2);
		return new Docket(DocumentationType.SWAGGER_2)
			.host("k8e206.p.ssafy.io")
			.useDefaultResponseMessages(true) // Swagger 에서 제공해주는 기본 응답 코드를 표시할 것이면 true
			.apiInfo(apiInfo())
			.groupName("api-server")
			.select()
			.apis(RequestHandlerSelectors.basePackage(
				"com.server.back")) // Controller가 들어있는 패키지. 이 경로의 하위에 있는 api만 표시됨.
			.paths(PathSelectors.any()) // 위 패키지 안의 api 중 지정된 path만 보여줌. (any()로 설정 시 모든 api가 보여짐)
			.build().securitySchemes(Arrays.asList(apiKey())).securityContexts(Arrays.asList(securityContext()));
		//			.pathMapping("/api/v1");
	}

	@Bean
	public Docket apiLocal() {
		//        return new Docket(DocumentationType.SWAGGER_2);
		return new Docket(DocumentationType.SWAGGER_2)
				.useDefaultResponseMessages(true) // Swagger 에서 제공해주는 기본 응답 코드를 표시할 것이면 true
				.apiInfo(apiInfo())
				.groupName("api-local")
				.select()
				.apis(RequestHandlerSelectors.basePackage(
						"com.server.back")) // Controller가 들어있는 패키지. 이 경로의 하위에 있는 api만 표시됨.
				.paths(PathSelectors.any()) // 위 패키지 안의 api 중 지정된 path만 보여줌. (any()로 설정 시 모든 api가 보여짐)
				.build().securitySchemes(Arrays.asList(apiKey())).securityContexts(Arrays.asList(securityContext()));
		//			.pathMapping("/api/v1");
	}

	public ApiInfo apiInfo() {
		return new ApiInfoBuilder()
			.title("SpringBoot Rest API Documentation")
			.description("modoo-stock")
			.version("1.0")
			.build();
	}
	private ApiKey apiKey() {
		return new ApiKey("JWT", "Authorization", "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).build();
	}

	private List<SecurityReference> defaultAuth(){
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] auth = new AuthorizationScope[1];
		auth[0] = authorizationScope;
		return Arrays.asList(new SecurityReference("JWT", auth));
	}

}