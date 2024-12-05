import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function LoginPage() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    name: "pikachu",
    profileImage: "image/025.png"
  });

  const [storageInfo, setStorageInfo] = useState([]);
  useEffect(() => {
    fetch("/mockData.json").then((response) => response.json()).then((data) => setStorageInfo(data))
    .catch((error) => console.error("Load Error", error));
  }, []);

  const [options, setOptions] = useState({theme: "dark", notifications: true });


  return(
    <div>      
      <body>
        <div class="login-container">
          {/* <!-- 로고 --> */}
          <img src="icon/logo.png" alt="Logo" class="logo"/>

          {/* <!-- 제목 --> */}
          <h2>LOGIN</h2>
          <p class="subtitle">login page for cloud box</p>

          {/* <!-- ID 입력 --> */}
          <label for="id">ID</label>
          <input type="text" id="id" placeholder="ID"/>

          {/* <!-- 비밀번호 입력 --> */}
          <label for="password">PASSWORD</label>
          <input type="password" id="password" placeholder="Password"/>

          {/* 비밀번호 찾기 */}
          <a href="#" class="forgot-password">FORGOT YOUR PASSWORD?</a>

          {/* <!-- 로그인 버튼 --> */}
          <button class="login-btn" onClick={()=> navigate("/main", {state: {userInfo, storageInfo, options}})}>
              <div>
                  <span>L</span><span>O</span><span>G</span><span>I</span><span>N</span>
              </div>
          </button>

          {/* <!-- 회원가입 버튼 --> */}
          <button class="signup-btn" onclick="window.location.href='signup.html'">
              <div>
                  <span>S</span><span>I</span><span>G</span><span>N</span><span> </span><span>U</span><span>P</span>
              </div>
          </button>


          {/* <!-- 구분선 --> */}
          <div class="separator">LOGIN AS SOCIAL MEDIA</div>

          {/* <!-- 소셜 로그인 버튼 --> */}
          <div class="social-btn google">
              <img src="icon/google-icon.png" alt="Google Logo"/>
              Login with Gmail
          </div>
          <div class="social-btn naver">
            <img src="icon/naver-icon.png" alt="Naver Logo"/>
            Login with Naver
          </div>
        </div>
        <script src="login.js"></script>
      </body>
    </div>
  )
}
export default LoginPage;