import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    name: "pikachu",
    profileImage: "image/025.png"
  });

  const [options, setOptions] = useState({theme: "dark", notifications: true });

  // 소셜 로그인 버튼 클릭 이벤트 핸들러
  const handleSocialLogin = (platform) => {
    alert(`${platform}  현재 구현되지 않은 기능입니다.`);
  };

  const handleAlert = (message) => {
    alert(message);
  };

  return (
    <div>
      <body>
        <div className="login-container">
          {/* 로고 */}
          <img src="image/logo.png" alt="Logo" className="logo" />

          {/* 제목 */}
          <h2>로그인</h2>
          <p className="subtitle">클라우드 박스 로그인 페이지</p>

          {/* ID 입력 */}
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" placeholder="ID" />

          {/* 비밀번호 입력 */}
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" placeholder="Password" />


          {/* 비밀번호 찾기 */}
          <a
            href="#"
            className="forgot-password"
            onClick={() => handleAlert("비밀번호 찾기 기능은 현재 구현되지 않은 기능입니다.")}
          >
            비밀번호를 잊으셨나요?
          </a>

          {/* 로그인 버튼 */}
          <button className="login-btn" onClick={() => navigate("/main", { state: { userInfo, options } })}>
            <div>로그인</div>
          </button>

          {/* 회원가입 버튼 */}
          <button className="signup-btn" onClick={() => navigate("/register", { state: { userInfo, options } })}>
            <div>회원가입하기</div>
          </button>

          {/* 구분선 */}
          <div className="separator">소셜미디어 로그인</div>

          {/* 소셜 로그인 버튼 */}
          <div className="social-btn google" onClick={() => handleSocialLogin("Google")}>
            <img src="image/google-icon.png" alt="Google Logo" />
            지메일로 로그인
          </div>
          <div className="social-btn naver" onClick={() => handleSocialLogin("Naver")}>
            <img src="image/naver-icon.png" alt="Naver Logo" />
            네이버로 로그인
          </div>
        </div>
        <script src="login.js"></script>
      </body>
    </div>
  );
}

export default LoginPage;
