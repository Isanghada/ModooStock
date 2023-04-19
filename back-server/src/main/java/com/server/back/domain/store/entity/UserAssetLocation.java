package com.server.back.domain.store.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name="user_asset_location")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserAssetLocation extends UserAssetEntity {

    @Column(nullable = false)
    private float posX;

    @Column(nullable = false)
    private float posY;

    @Column(nullable = false)
    private float posZ;

    @Column(nullable = false)
    private float rotX;

    @Column(nullable = false)
    private float rotY;

    @Column(nullable = false)
    private float rotZ;

    public void init(){
        this.posX=0F;
        this.posY=0F;
        this.posZ=0F;
        this.rotX=0F;
        this.rotY=0F;
        this.rotZ=0F;
    }


}
