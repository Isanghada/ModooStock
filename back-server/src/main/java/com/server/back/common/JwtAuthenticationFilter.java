//package com.server.back.common;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.server.back.common.auth.entity.PrincipalDetails;
//import com.server.back.common.dto.TokenRequestDto;
//import com.server.back.common.service.JwtService;
//import com.server.back.domain.user.entity.User;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.Map;
//
//// 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter 가 있다.
//// "/login" 요청해서 username, password를 전송하면 (post)
//// UsernamePasswordAuthenticationFilter 필터가 자동으로 동작
//
//public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
//
//    private AuthenticationManager authenticationManager;
//    private JwtService jwtService;
//
//    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtService jwtService) {
//        this.authenticationManager = authenticationManager;
//        this.jwtService = jwtService;
//    }
//
//
//    // /login(post) 요청을 하면 로그인 시도를 위해서 실행되는 함수
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//
//        System.out.println(" JwtAuthenticationFilter 실행중");
//
//        //username, password 받기 request body에 존재 - json으로 파싱
//        ObjectMapper om = new ObjectMapper();
//        User user = null;
//        try {
//            user = om.readValue(request.getInputStream(), User.class);
//            System.out.println("user찾았당!!!!  : "+user);
//        } catch (IOException e) {
//            System.out.println("user 못받음");
//            e.printStackTrace();
//        }
//
//        System.out.println("JwtAuthenticationFilter :" + user);
//
//        // authenticate() 함수가 호출 되면 인증 프로바이더가 유저 디테일 서비스의 -> authenticationManager 를 사용할때 UserDetailSevice 를 사용가능
//        // loadUserByUsername(토큰의 첫번째 파라메터) 를 호출하고
//        // UserDetails를 리턴받아서 토큰의 두번째 파라메터(credential)과
//        // UserDetails(DB값)의 getPassword()함수로 비교해서 동일하면
//        // Authentication 객체를 만들어서 필터체인으로 리턴해준다.
//
//        // Tip: 인증 프로바이더의 디폴트 서비스는 UserDetailsService 타입
//        // Tip: 인증 프로바이더의 디폴트 암호화 방식은 BCryptPasswordEncoder
//        // 결론은 인증 프로바이더에게 알려줄 필요가 없음.
//        UsernamePasswordAuthenticationToken authenticationToken =
//                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
//
//        Authentication authentication = authenticationManager.authenticate(authenticationToken);
//
//        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
//        System.out.println("JwtAuthenticationFilter: " + principal.getUser());
//
//        return authentication;
//    }
//
//    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 아래 함수 실행
//    //JWT 토큰을 만들어서 request 요청을 한 사용자에게 JWT 토큰 전달
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
//            throws IOException, ServletException {
//
//        System.out.println("successfulAuthentication 인증이 완료");
//        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
//
//        //token 생성
//        TokenRequestDto tokenRequestDto = jwtService.joinJwtToken(principalDetails.getUser().getUsername());
//
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        Map<String, Object> jsonResponse = jwtService.successLoginResponse(tokenRequestDto, principalDetails.getUser().getUserId());
//        String result = objectMapper.writeValueAsString(jsonResponse);
////        response.setStatus(HttpStatus.OK.value());
//
//        //response 응답
//        response.setContentType("application/json");
//        response.setCharacterEncoding("utf-8");
//        response.getWriter().write(result);
//    }
//}
