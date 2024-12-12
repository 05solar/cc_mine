import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'

function LoginPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    name: "pikachu",
    profileImage: "image/025.png"
  });

  const [options, setOptions] = useState({theme: "dark", notifications: true });

  return(
    <div>      
      <body>
        <div class="login-container">
          {/* <!-- 로고 --> */}
          <img src="image/logo.png" alt="Logo" class="logo"/>

          {/* <!-- 제목 --> */}
          <h2>로그인</h2>
          <p class="subtitle">클라우드 박스 로그인 페이지</p>

          {/* <!-- ID 입력 --> */}
          <label for="id">아이디</label>
          <input type="text" id="id" placeholder="ID"/>

          {/* <!-- 비밀번호 입력 --> */}
          <label for="password">비밀번호</label>
          <input type="password" id="password" placeholder="Password"/>

          {/* 비밀번호 찾기 */}
          <a href="#" className="forgot-password">비밀번호를 잊으셨나요?</a>

          {/* <!-- 로그인 버튼 --> */}
          <button className="login-btn" onClick={()=> navigate("/main", {state: {userInfo, options}})}>
              <div>
                  로그인
              </div>
          </button>

          {/* <!-- 회원가입 버튼 --> */}
          <button className="signup-btn" onClick={()=> navigate("/register", {state: {userInfo, options}})}>
              <div>
                  회원가입하기 
              </div>
          </button>


          {/* <!-- 구분선 --> */}

          <div className="separator">소셜미디어 로그인</div>

          {/* <!-- 소셜 로그인 버튼 --> */}
          <div className="social-btn google">
              <img src="image/google-icon.png" alt="Google Logo"/>
              지메일로 로그인
          </div>
          <div className="social-btn naver">

            <img src="image/naver-icon.png" alt="Naver Logo"/>
            네이버로 로그인
          </div>
        </div>
        <script src="login.js"></script>
      </body>
    </div>
  )
}
export default LoginPage;