package com.server.back.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.entity.CommonEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "user_table")
public class UserEntity extends CommonEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String account;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String profileImagePath;

    @Column(nullable = false)
    private String introduction;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IsDeleted isDeleted;

    @Column(nullable = false)
    @Builder.Default
    private Integer currentMoney = 0;


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

}
