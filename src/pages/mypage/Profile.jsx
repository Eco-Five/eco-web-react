import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.post('/api/getUserInfo', { userId });
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
  }, [userId]);

  const handleUpdate = async () => {
    const { name, email, phone, address } = userInfo;

    try {
      const response = await axios.post('/api/updateUserInfo', {
        userId,
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

  const handleDelete = async () => {
    if (window.confirm('회원탈퇴하시겠습니까?')) {
      try {
        const response = await axios.post('/api/deleteUser', { userId });

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

  const logoutUser = async () => {
    try {
      await axios.get('/api/logout');
      localStorage.removeItem('userToken');
      sessionStorage.removeItem('userToken');
      document.cookie = "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-pic">
          <img src={userInfo.image_url} alt="프로필사진" />
        </div>
        <div className="profile-info">
          <p>{userInfo.name}님의 마이페이지</p>
          <p>포인트 : {userInfo.eco_point}P</p>
        </div>
      </div>
      <div className="custom-card text-center">
        <div className="tab-content">
          <div className="tab-pane fade show active">
            <div className="mb-3 d-flex align-items-center">
              <label>이름</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label>이메일</label>
              <input
                type="text"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label>전화번호</label>
              <input
                type="text"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <label>주소</label>
              <input
                type="text"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
              />
            </div>
            <div className="mb-3 d-flex">
              <button className="btn btn-dark" onClick={handleUpdate}>
                개인정보 수정
              </button>
              <button className="btn btn-dark" onClick={handleDelete}>
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
