import 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 사용자 정보 조회
    const getUserInfo = async () => {
      try {
        const response = await axios.post('/api/api/getUserInfo');
        if (response.data.success) {
          setUserInfo(response.data.data);
        } else {
          alert('사용자 정보를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('사용자 정보 조회 오류:', error);
      }
    };

    getUserInfo();
  }, []);

  // 개인정보 수정
  const handleUpdate = async () => {
    const { name, email, phone, address } = userInfo;
    try {
      const response = await axios.post('/api/api/updateUserInfo', {
        name,
        email,
        phone,
        address,
      });

      if (response.data.success) {
        alert('정보 수정 성공.');
        window.location.href = '/';
      } else {
        alert('정보 수정 실패.');
      }
    } catch (error) {
      console.error('정보 수정 오류:', error);
      alert('서버 오류.');
    }
  };

  // 개인정보 삭제
  const handleDelete = async () => {
    if (window.confirm('회원탈퇴하시겠습니까?')) {
      try {
        const response = await axios.post('/api/api/deleteUser');

        if (response.data.success) {
          await logoutUser();
          alert('회원탈퇴 완료.');
          window.location.href = '/';
        } else {
          alert('회원탈퇴 실패.');
        }
      } catch (error) {
        console.error('회원탈퇴 오류:', error);
        alert('서버 오류.');
      }
    }
  };

  // 로그아웃
  const logoutUser = async () => {
    try {
      await axios.get('/api/api/logout');
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('userToken');
      document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  // 프로필 사진 업로드
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const formData = new FormData();
      formData.append('file', file); 

      try {
        const response = await axios.post('/api/api/uploadProfilePic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });

        if (response.data.success) {
          setUserInfo({
            ...userInfo,
            image_url: response.data.imageUrl, 
          });
          alert('프로필 사진 업로드 성공.');
        } else {
          alert('프로필 사진 업로드 실패.');
        }
      } catch (error) {
        console.error('프로필 사진 업로드 오류:', error);
        alert('서버 오류.');
      }
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      {/* 프로필 사진 카드 */}
      <Card className="mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Header as="h5">프로필</Card.Header>
        <Card.Body className="text-center">
          <img
            src={userInfo.image_url}
            alt="Profile"
            className="img-fluid rounded-circle"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label>프로필 사진 업로드</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .gif"
              onChange={(e) => handleFileUpload(e)} 
            />
            <small className="text-muted">PNG, JPG, GIF 최대 10MB</small>
          </Form.Group>
        </Card.Body>
      </Card>

      {/* 개인정보 수정 카드 */}
      <Card className="mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Header as="h5">개인정보</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3"> 
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>전화번호</Form.Label>
              <Form.Control
                type="text"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>주소</Form.Label>
              <Form.Control
                type="text"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
              />
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-center">
            <Button variant="success" onClick={handleUpdate}>
              <FaEdit /> 개인정보 수정
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <FaTrash /> 회원탈퇴
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
