package com.server.back.common.code.commonCode;


import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Getter
public enum TypeGroup {
	Deal(Arrays.stream(DealType.values()).collect(Collectors.toList()));
	private final List<TypeModel> typeList;

	TypeGroup(List<TypeModel> typeList) {
		this.typeList = typeList;
	}
}
