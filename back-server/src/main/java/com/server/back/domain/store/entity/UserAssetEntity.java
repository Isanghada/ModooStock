package com.server.back.domain.store.entity;

import com.server.back.common.code.commonCode.IsAuctioned;
import com.server.back.common.code.commonCode.IsDeleted;
import com.server.back.common.code.commonCode.IsInRespository;
import com.server.back.domain.user.entity.UserEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name="user_asset")
@Getter
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserAssetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name="asset_id",nullable = false)
    private AssetEntity asset;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IsDeleted isDeleted;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IsInRespository isInRepository;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IsAuctioned isAuctioned;

    //룸에 배치 or repository에 넣기
    public void update(IsInRespository isInRespository){
        this.isInRepository=isInRespository;
    }

    //경매장에 내놓을 때 or 취소할 때
    public void update(IsAuctioned isAuctioned){
        this.isAuctioned=isAuctioned;
    }

    //되팔기
    public void update(){
        this.isDeleted=IsDeleted.Y;
    }

    //경매 참여했을 때
    public void update(UserEntity user){
        this.user=user;
        this.isAuctioned=IsAuctioned.N;
    }

}
