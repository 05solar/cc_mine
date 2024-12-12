import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './RegisterPage.css'; 

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = () => {
        // 회원가입 로직 처리
        console.log('Form submitted:', formData);
        navigate("/login");
    };

    return (
        <div className="register-container">
            {/* 로고 */}
            <img src="image/logo.png" alt="Logo" className="logo" />

            {/* 제목 */}
            <h2>회원 가입 하기</h2>
            <p className="subtitle">클라우드 박스 회원가입 페이지</p>

            {/* ID 입력 */}
            <label htmlFor="id">아이디</label>
            <input
                type="text"
                id="id"
                placeholder="example"
                value={formData.id}
                onChange={handleChange}
            />

            {/* 이메일 입력 */}
            <label htmlFor="email">이메일</label>
            <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
            />

            {/* 비밀번호 입력 */}
            <label htmlFor="password">비밀번호</label>
            <input
                type="password"
                id="password"
                placeholder="include *, %, ^ & (8~16)"
                value={formData.password}
                onChange={handleChange}
            />

            {/* 비밀번호 확인 입력 */}
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
                type="password"
                id="confirmPassword"
                placeholder=""
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            {/* 회원가입 버튼 */}
            <button className="register-continue-btn" onClick={handleSubmit}>
                <div>
                   계정 생성하기
                </div>
            </button>

            {/* 로그인 페이지 이동 버튼 */}
            <button className="register-login-btn" onClick={() => navigate("/login")}>계정이 있습니다</button>
        </div>
    );
};

export default RegisterPage;
