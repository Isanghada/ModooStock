# 💻BackEnd Server

- 빈 디렉토리는 `dump.txt`로 채워두었스빈다!

## 변경해 주세요!!
- 일단 초기 DB는 localhost로 잡아뒀습니다. 필요하시면 수정하시고 사용하시면 됩니다.
- `src/main/resources/application.properties` 파일에서 수정합니다.
```properties
# mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# serverTimezone=Asia/Seoul : 사용하는 DB의 타임존을 서울로 타임존 설정
# zeroDateTimeBehavior=convertToNull : zero date(0000-00-00 00:00:00)로 저장된 경우 null로 받아오게 설정
spring.datasource.url=jdbc:mysql://[IP 주소]]:3306/[DB명]?serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull
spring.datasource.username=MySQL아이디
spring.datasource.password=MySQL비밀번호
```

## 프로젝트 구조
```
main
├─java
│  └─com
│      └─server
│          └─back
│	          ├─common
│	          │  ├─auth
│   	      │  │  ├─dto
│       	  │  │  ├─entity
│	          │  │  ├─repository
│		      │  │  └─service
│	          │  ├─dto
│	          │  ├─entity
│	          │  ├─repository
│	          │  └─service
│	          ├─config
│	          ├─domain
│	          │  └─sample
│	          │     ├─controller
│	          │     ├─dto
│	          │     ├─entity
│	          │     ├─repository
│	          │     └─service
│	          ├─exception
│	          │
│	          └─security
└─resources
   ├─static
   └─templates
```
