package com.server.back.domain.store.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="user_asset_location")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserAssetLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private UserAssetEntity userAsset;

    private float posX;
    private float posY;
    private float posZ;
    private float rotX;
    private float rotY;
    private float rotZ;


}
