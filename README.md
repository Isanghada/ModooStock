<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239406992-dd215029-ffd7-40e7-bb72-fe9a8398052c.png"  width="450"/>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239470612-eebb549c-d64b-4775-b6c1-5675b85648de.gif"  width="450"/>

<br>

# 📈 모두의 주식
> ⚡말랑말랑 (부울경 2반 6조)
>
> 모의주식투자게임
>
> 프로젝트 기간 : 2023.04.10 - 2023.05.19 (6주)

<br>

## :deciduous_tree: 프로젝트 개요

### 프로젝트 기간

-   기획 및 설계 :  2023.04.10 - 2023.04.15
-   프로젝트 개발 : 2023.04.17 - 2023.05.19

### 구성원

-   백엔드 4명
-   프론트엔드 2명

<br/>

## 👍 서비스 소개
- 주식에 관심은 있지만 주식이 어려운 사람들을 위한 가상 주식 게임입니다.
- 뉴스, 주가, 환율 등의 정보를 토대로 주가 변동을 예측하여 매도 및 매수를 할 수 있습니다.
- 이 게임으로 재미는 물론이고 경제적 흐름과 주식에 대한 접근성을 높일 수 있습니다.
- 이를 통해 사용자들은 가상의 돈을 이용하여 실제 주식시장의 동향과 투자 전략을 경험하고, 경쟁적인 요소를 가지고 다른 사용자들과 함께 공부할 수 있습니다.

<br/>

## 🔨 주요 기술 스택

### ✔️ Frontend

-   `Node JS`
-   `React`
-   `TypeScript`
-   `Tailwind`
-   `styled-components`
-   `Redux-toolkit`
-   `RTK Query`
-   `Toastify-js`
-   `Redux-toolkit`
-   `ThreeJS`

### ✔️ Backend

-   `Java`
-   `Spring Boot`
-   `Spring Security`
-   `Spring Data JPA`
-   `Swagger-ui`
-   `JWT`
-   `Gradle`
-   `bs4`

### ✔️ DB

-   `MySQL`
-   `Redis`
-   `Firebase`

### ✔️ Deploy

-   `AWS EC2`
-   `Docker`
-   `Docker-compose`
-   `Nginx`
-   `Jenkins`

### ✔️ Communication

-   형상 관리 - `Gitlab`
-   이슈 및 스크럼 관리 - `Jira`
-   `Notion`
-   `Discord`
-   `Mattermost`
-   `Figma`
  
<br>

## **📚 목차**  

1️⃣ [타겟층](#-타겟층)   
2️⃣ [주요 기능](#-주요-기능)  
3️⃣ [모두의 주식 서비스](#-모두의-주식-서비스)  
4️⃣ [실행방법](#-실행방법)  
5️⃣ [팀 구성](#-팀-구성)  
6️⃣ [기술 아키텍쳐](#-기술-아키텍쳐)  
7️⃣ [ERD 다이어그램](#-erd-다이어그램)  
8️⃣ [API 명세서](#-api-명세서)   

<br>

## 😮 타겟층
    ✔ 주식시장에 대한 기본적인 이해와 경험이 부족한 초보 투자자인 전 연령층
    ✔ 게임을 통해 쉽고 재미있게 주식투자에 대한 기본 개념을 배우고 싶은 학생 및 초보 투자자들
   
<br>

## 👍 주요 기능
|구분|기능|설명|비고|
|:---|:---|:---|:---|
|1|주식 거래소| - 회원이 시장 지표와 정보를 이용해 원하는 주식을 매도/매수 할 수 있다.<br> - 뉴스스크랩(보유 뉴스) 조회 가능|SSE로 주식 차트 반환|
|2|정보 거래소| - 회원이 주식에 대한 정보를 게임 머니를 이용하여 살 수 있다.|크롤링을 활용한 회사정보(IR), 뉴스 기사 정보를 수집 및 데이터 가공|
|3|뽑기 상점| - 3가지 뽑기 ( 일반, 고급, 전설)를 선택하여 아이템을 뽑을 수 있다.||
|4|경매장| - 다른 사용자들이 경매장에 올린 아이템을 구입할 수 있다.||
|5|랭킹| - 총 자산(은행 예산 + 지갑 돈 + 보유 주식 + ASSET 보유 자산)을 토대로 랭킹을 매겨 확인 가능<br> - ASSET보유자산 : 내가 뽑은 꾸미기 아이템의 가치|Redis로 랭킹 반환 성능 향상|
|6|채팅| - 실시간 채팅을 통해 정보를 교환 할 수 있다.|firebase를 이용한 실시간 채팅|
|7|은행| - 회원은 은행에 회원의 게임 머니를 예금/출금/송금 할 수 있다.<br> - 송금 : 회원들끼리도 머니를 주고 받을 수 있다||
|8|마이페이지| - 회원이 자신의 땅(홈피)를 꾸밀 수 있고 다른 사람 홈피에 방문할 수 있다. <br> - 경매장에 필요없는 아이템을 판매등록 하거나, 되팔기를 할 수 있다.|아이템 - ThreeJS와 블렌더를 이용한 420개 3d아이템 구현|
|9|알람| - 게임 시즌 변경 시 알람.<br>- 뉴스 정보상 기간 바꼈을 때 알람||
|10|미니게임| - 상시 진행 가능한 미니 게임을 통해 시드머니를 불릴 수 있다.<br> - ex) 스피드 복권, 어둠의 복권||
|11|기타| - PWA를 활용한 웹앱 + 반응형 웹을 통한 다양한 기기에서 사용 가능<br> - FCM을 이용한 웹푸시 기능<br> - Lotite, framer-motion을 활용한 애니메이션 효과||

<br>

# 🌍 모두의 주식 서비스
## 📌 주식 거래소
- 회원이 시장 지표와 정보를 이용해 원하는 주식을 매도/매수 할 수 있다.
- IR데이터 및 뉴스스크랩(보유 뉴스) 조회 가능

![PPT_매도매수_IR](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126910-4c2a2628-4c82-440f-8b04-b057ed83d903.gif)
---

## 📌 - 정보 거래소
- 회원이 주식에 대한 정보를 게임 머니를 이용하여 살 수 있다.

![04_정보상](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126861-de57422c-dc6a-4606-a7c0-b966b356f57f.gif)
---

## 📌 - 뽑기 상점
- 3가지 뽑기 ( 일반, 고급, 전설)를 선택하여 아이템을 뽑을 수 있다.

![PPT_뽑기](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126728-dffa9e5a-ddae-4687-8a87-ce8a86aaae4c.gif)
---

## 📌 - 경매장
- 다른 사용자들이 경매장에 올린 아이템을 구입할 수 있다.

![PPT_경매장](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239127123-a4ee6982-055e-4ffc-baed-a9568971f5c1.gif)
---

## 📌 - 랭킹
- 총 자산(은행 예산 + 지갑 돈 + 보유 주식 + ASSET 보유 자산)을 토대로 랭킹을 매겨 확인 가능
- ASSET보유자산 : 내가 뽑은 꾸미기 아이템의 가치

![12_랭킹확인](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239127110-d6a1973b-60bf-4063-a792-6e50cc26b1cf.gif)
---

## 📌 - 채팅
- 실시간 채팅을 통해 정보를 교환 할 수 있다.

![PPT_채팅](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126734-f12a7e4a-7e3f-4b58-9734-1db8dd9853b9.gif)
---

## 📌 - 은행
- 회원은 은행에 회원의 게임 머니를 예금/출금/송금 할 수 있다.
- 송금 : 회원들끼리도 머니를 주고 받을 수 있다

![PPT_은행](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239136565-a303c127-59b6-498d-b715-73621cc61069.gif)
---

## 📌 - 마이페이지
- 회원이 자신의 땅(홈피)를 꾸밀 수 있고 다른 사람 홈피에 방문할 수 있다.
- 경매장에 필요없는 아이템을 판매등록 하거나, 되팔기를 할 수 있다.

![PPT_방꾸미기](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239136570-cc94ea60-b07c-4e2c-b711-51deb650a33f.gif)
---


## 📌 - 방문하기
- 다른 사람의 홈피에 방문할 수 있다.
- 방명록 작성
![15_방문_방명록작성하기2](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239468719-1f86f21d-cd00-42e6-b901-9f5063bcb77a.gif)
---

## 📌 - 알람
- 게임 시즌 변경 시 알람
- 뉴스 정보상 기간 바꼈을 때 알람
---

## 📌 - 미니게임
- 상시 진행 가능한 미니 게임을 통해 시드머니를 불릴 수 있다.
- ex) 스피드 복권, 어둠의 복권

![PPT_복권당첨](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239136562-58a5c276-388d-40a9-8a3f-563571f405d0.gif)
---

## 📌 - 회원가입 및 로그인
- 회원가입
- 로그인
![03_로그인화면](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239470618-616998d8-8cf5-4586-a4ba-c59f9479609c.gif)
---

<br>

## 💾 실행방법

### [🔗 포팅 메뉴얼 바로가기](https://lab.ssafy.com/s08-final/S08P31E206/-/blob/Develop/exec/porting_manual.md)
- exec 폴더 내 포팅 메뉴얼 참조

### [🔗 원스토어에서 설치](https://m.onestore.co.kr/mobilepoc/apps/appsDetail.omp?prodId=0000769506)
![원스토어](https://github.com/hyeonaseome/trycatchAnswer/assets/109887404/1061e911-17da-41cd-9087-9de3452aed94)

<br>

## 👬 팀 구성
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/KHminor">
            <img src="https://avatars.githubusercontent.com/u/109326297?v=4" width="100px;" alt="팀장 김홍민"/>
            <br />
            <sub><b>팀장 김홍민</b></sub>
        </a>
        <div>FE 팀장</div>
      </td>
      <br />
      <td align="center">
        <a href="https://github.com/Isanghada">
            <img src="https://avatars.githubusercontent.com/u/90487843?v=4" width="100px;" alt="팀원 김남규"/>
            <br />
            <sub><b>팀원 김남규</b></sub>
        </a>
        <br />
        <div>BE 팀장, CI/CD</div>
      </td>
      <br/>
      <td align="center">
        <a href="https://github.com/dhyunee">
            <img src="https://avatars.githubusercontent.com/u/101089655?v=4" width="100px;" alt="팀원 김송빈"/>
            <br />
            <sub><b>팀원 김송빈</b></sub>
        </a>
        <br />
        <div>BE</div>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/aemong22">
            <img src="https://avatars.githubusercontent.com/u/55730504?v=4" width="100px;" alt="팀원 김애림"/>
            <br />
            <sub><b>팀원 김애림</b></sub>
        </a>
        <br />
        <div>BE</div>
      </td>
      <td align="center">
        <a href="https://github.com/hyeonaseome">
            <img src="https://avatars.githubusercontent.com/u/109887404?v=4" width="100px;" alt="팀원 서현아"/>
            <br />
            <sub><b>팀원 서현아</b></sub>
        </a>
        <br />
        <div>BE</div>
      </td>
      <td align="center">
        <a href="https://github.com/mintcoo">
            <img src="https://avatars.githubusercontent.com/u/109326433?v=4" width="100px;" alt="팀원 한상현"/>
            <br />
            <sub><b>팀원 한상현</b></sub>
        </a>
        <br />
        <div>FE</div>
      </td>
    </tr>
  </tbody>
</table>

<br>

## ⚙ 기술 아키텍쳐
![data-env1](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126108-c443f505-4cee-4d8c-98c6-2cd86e93ffaa.png)
![data-env2](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126111-b41540e6-2bce-4bd3-99f7-8dbe11d5e161.png)

<br>

## 💎 [ERD 다이어그램](https://www.erdcloud.com/d/PW3gYYNc6SHaCHFgF)
![모두의주식 DB](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126109-dbbf3d11-5cf1-4305-ab58-b4f89a15d6b4.png)

<br>

## 📘 [API 명세서](https://general-library-f31.notion.site/API-Docs-50a1643d76084de2bb1a5a888960570c)
![API 명세서](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126502-4c1b6c7a-ed6c-49bd-a69a-35425b1fb28a.png)

<br>

## 🍏[와이어프레임](https://www.figma.com/file/ocCbArvgYMHlgsbHpZorDI/%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?type=design&node-id=0-1&t=cUmd4vz0pqWgg1Py-0)
![와이어프레임](https://github-production-user-asset-6210df.s3.amazonaws.com/109887404/239126593-7d4e06c3-5f90-41e2-981a-5999c85adb8e.png)
