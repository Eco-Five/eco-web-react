import React, { useState } from 'react';
import '/src/assets/css/register/Register.css'
import mascot from '../../assets/anyone/eco-mascot.png';
import axios from 'axios';


const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    postcode: '',
    address: '',
    extraAddress: '',
    detailAddress: '',
  });
  const [emailMessage, setEmailMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const checkEmail = async () => {
    if (!formData.email) {
      setEmailMessage('이메일을 입력하세요.');
      return;
    }
    try {
      const response = await axios.post('/api/api/checkEmail', { email: formData.email })
      const data = await response.data; //확실히 이해됨 //await을 써서 받은 반환값은 await을 써서 받아야함
      setEmailMessage(data.message);
    } catch (error) {
      console.error('이메일 중복 확인 오류:', error);
      setEmailMessage('서버 오류가 발생했습니다.');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return;
    }
    
    const memberInfo = {
      name: formData.name,
      email: formData.email,
      pwd: formData.password,
      phone: formData.phone,
      img_url: 'https://placehold.co/250x200',
      member_type_id: 1,
      address: `${formData.address} ${formData.detailAddress}`,
    };
    
    try {
      const response = await fetch('/api/api/memberInsert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memberInfo),
      });
      const data = await response.json();
      alert('회원가입이 완료되었습니다.');
      window.location.href = '/login';
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      alert('회원가입 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  //========================================================Daum API========================================================//
  
    const openPostcodePopup = () => {
      new daum.Postcode({
        oncomplete: (data) => {
          const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
          const extraAddr = data.bname && /[동|로|가]$/g.test(data.bname)
            ? `(${data.bname}${data.buildingName ? ', ' + data.buildingName : ''})`
            : '';
  
          setFormData((prev) => ({
            ...prev,
            postcode: data.zonecode,
            address: addr,
            extraAddress: extraAddr,
          }));
        },
      }).open();
    };
//========================================================Daum API========================================================//

//==========================================================UI===========================================================//
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center h-100">
      <div className="mb-4 mt-4">
        <div className="logo">
          <img src={mascot} alt="마스코트" style={{ width: '100px', height: '100px' }} />
        </div>
      </div>
      <h1 className="h4 mb-4">회원 가입</h1>
      <div className="custom-card text-center" style={{ width: '450px' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="d-flex me-3 mb-2">이메일 주소</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                id="email"
                className="form-control flex-grow-1"
                placeholder="✉ 이메일주소를 입력하세요"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <button type="button" className="btn btn-dark  ms-2" onClick={checkEmail}>중복 확인</button>
            </div>
            <p className="mt-2 text-start" style={{ color: emailMessage.includes('중복') ? 'red' : 'green' }}>{emailMessage}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="d-flex me-3 mb-2">비밀번호</label>
            <input
              type="password"
              id="password"
              className="form-control flex-grow-1"
              placeholder="🔒︎ 비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="d-flex me-3 mb-2">비밀번호 재입력</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control flex-grow-1"
              placeholder="🔒︎ 비밀번호를 재입력하세요"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="d-flex me-3 mb-2">이름</label>
            <input
              type="text"
              id="name"
              className="form-control flex-grow-1"
              placeholder="👤 이름을 입력하세요"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="d-flex me-3 mb-2">전화번호</label>
            <input
              type="text"
              id="phone"
              className="form-control flex-grow-1"
              placeholder="☎ 전화번호를 입력하세요"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="address-input-group">
            <label htmlFor="postcode" className="d-flex me-3 mb-2">주소</label>
            <div className="d-flex align-items-center">
              <input
                className="form-control flex-grow-1 mb-2"
                id="postcode"
                placeholder="우편 번호"
                value={formData.postcode}
                readOnly
              />
              <button type="button" className="btn btn-dark ms-2 mb-2" onClick={openPostcodePopup}>우편번호 찾기</button>
            </div>
          </div>
          <input
            className="form-control mb-2"
            id="address"
            placeholder="도로명 주소"
            value={formData.address}
            readOnly
          />
          <input
            className="form-control mb-2"
            id="extraAddress"
            placeholder="참고항목"
            value={formData.extraAddress}
            readOnly
          />
          <input
            className="form-control mb-2"
            id="detailAddress"
            placeholder="상세 주소"
            value={formData.detailAddress}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-dark w-100 mb-5 mt-2">회원가입</button>
        </form>
      </div>
    </div>
  );
};
//========================================================UI========================================================//

export default Register;
