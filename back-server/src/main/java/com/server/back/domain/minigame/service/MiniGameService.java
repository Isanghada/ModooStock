package com.server.back.domain.minigame.service;

import com.server.back.domain.minigame.dto.MiniGameResDto;

public interface MiniGameService {
    MiniGameResDto createBrightLotto();

    MiniGameResDto createDarkLotto();
}
