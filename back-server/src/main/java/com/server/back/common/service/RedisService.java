package com.server.back.common.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;


@RequiredArgsConstructor
@Service
public class RedisService {

	private final StringRedisTemplate stringRedisTemplate;


	// key를 통해 value 리턴
	public String getData(String key) {
		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
		return valueOperations.get(key);
	}


	// 유효 시간 동안(key, value)저장
	public void setDataExpire(String key, String value, long duration) {
		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
		Duration expireDuration = Duration.ofSeconds(duration);
		valueOperations.set(key, value, expireDuration);
	}


	// 유효 시간 동안(key, value)저장
	public void setDataExpireMilliseconds(String key, String value, long duration) {
		ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
		valueOperations.set(key, value, duration, TimeUnit.MILLISECONDS);
	}


	public void deleteData(String key) {
		stringRedisTemplate.delete(key);
	}

}