package com.server.back.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.entity.CommonEntity;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SuperBuilder
@Table(name = "user_table")
public class UserEntity extends CommonEntity implements UserDetails {

    private static String PROFILE_IMAGE_PATH_DEFAULT = "/user/default.jpg";
    private static String INTRODUCTION_DEFAULT= "때가 올때까지 기다리는 사람이 성공한다!";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 15)
    private String account;

    @Column(nullable = false, unique = true, length = 6)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    @Builder.Default
    private String profileImagePath= PROFILE_IMAGE_PATH_DEFAULT;

    @Column(nullable = false)
    @Builder.Default
    private String introduction= INTRODUCTION_DEFAULT;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private IsDeleted isDeleted = IsDeleted.N;

    @Column(nullable = false)
    @Builder.Default
    private Long currentMoney = 10000_0000L;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


    /**
     * 계정의 고유한 값을 리턴
     *
     * @return
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.id.toString();
    }


    /**
     * 계정 만료 여부
     * true : 만료 안됨
     * false : 만료
     *
     * @return
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }


    /**
     * 계정 잠김 여부
     * true : 잠기지 않음
     * false : 잠김
     *
     * @return
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return isDeleted == IsDeleted.N;
    }


    /**
     * 비밀번호 만료 여부
     * true : 만료 안됨
     * false : 만료
     *
     * @return
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    /**
     * 사용자 활성화 여부
     * ture : 활성화
     * false : 비활성화
     *
     * @return
     */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isEnabled() {
        return isDeleted == IsDeleted.N;
    }

    public void setIsDeleted(IsDeleted isDeleted) {
        this.isDeleted = isDeleted;
    }

    public void increaseCurrentMoney(Long money) {
        this.currentMoney += money;
    }

    public void decreaseCurrentMoney(Long money) {
        this.currentMoney -= money;
    }
}
