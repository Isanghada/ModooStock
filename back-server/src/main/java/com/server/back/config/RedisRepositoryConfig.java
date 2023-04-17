package com.server.back.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.StringRedisSerializer;


@RequiredArgsConstructor
@Configuration
@EnableRedisRepositories//Redis Repository 활성화
public class RedisRepositoryConfig {

	//lettuce
	@Value("${spring.redis.host}")
	private String redisHost;//redist host

	@Value("${spring.redis.port}")
	private int redisPort;//redist 포트 번호

	@Value("${spring.redis.password}")
	private String redisPassword;


	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		RedisStandaloneConfiguration redisStandaloneConfiguration = new RedisStandaloneConfiguration();
		redisStandaloneConfiguration.setHostName(redisHost);
		redisStandaloneConfiguration.setPort(redisPort);
		redisStandaloneConfiguration.setPassword(redisPassword);
		return new LettuceConnectionFactory(redisStandaloneConfiguration);//RedisConnectionFactory를 통해 내장 혹은 외부의 Redis를 연결한다.
	}


	@Bean
	public RedisTemplate<String, Object> redisTemplate() {
		RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
		redisTemplate.setConnectionFactory(redisConnectionFactory());//redis와 스프링 연결관리
		//밑에 메소드를 설정하지 않으면 스프링 값들이 redis에 바이트 값으로 저장된다.
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new StringRedisSerializer());
		return redisTemplate;
	}

}