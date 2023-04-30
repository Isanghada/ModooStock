package com.server.back.common.entity;


import com.server.back.common.code.commonCode.DealType;
import com.server.back.domain.user.entity.UserEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "deal_code")
@Table(name = "deal")
public class DealEntity extends CommonEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	@Column(nullable = false)
	private Long price;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private DealType dealType;

	public DealEntity(UserEntity user, DealType dealType, Long price){
		this.user=user;
		this.dealType=dealType;
		this.price=price;
	}

}
