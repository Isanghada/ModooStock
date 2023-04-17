package com.server.back.domain.user.service;

import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.domain.user.entity.UserEntity;
import com.server.back.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("[loadUserByUsername] username: {}", username);

		Optional<UserEntity> user = userRepository.findByIdAndIsDeleted(Long.parseLong(username), IsDeleted.N);
		if (user.isEmpty()) {
			throw new UsernameNotFoundException(username);
		}
		return user.get();
	}

}
