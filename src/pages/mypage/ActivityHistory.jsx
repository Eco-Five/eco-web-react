import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'; 
import { FaRegClipboard, FaTimes } from 'react-icons/fa'; 

const ActivityHistory = () => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
      // 게시글 조회
    const getBoardInfo = async () => {
      try {
        const response = await axios.post('/api/api/getBoardInfo');
        if (response.data.success) {
          setActivity(response.data.data);
        } else {
          alert('활동 내역이 없습니다.');
        }
      } catch (error) {
        console.error('게시판 정보 조회 오류:', error);
      }
    };

    getBoardInfo();
  }, []); 
  // 게시글 삭제
  const deleteBoardInfo = async () => {
    try{
      const response = await axios.post('/api/api/deleteBoardInfo');
      if(response.data.success){
        alert('게시글 삭제 완료.');
        window.location.href='/';
      } else {
        alert('게시글 삭제 실패.');
      }
    } catch(error) {
      console.error('게시글 삭제 오류:', error);
      alert('서버 오류.');
    }
  }

  if (!activity) return <div>Loading...</div>; 

  return (
    <div className="container mt-4 mb-4">
      <Card className="hist-card shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">
              <FaRegClipboard style={{ marginRight: '10px' }} />
              <b>나의 활동 내역</b>
            </h5>
            <Button 
              variant="link" 
              size="sm" 
              onClick={deleteBoardInfo} 
              className="d-flex align-items-center"
              style={{ color: 'black', padding: 0, fontSize: '1.5rem' }}
            >
              <FaTimes />
            </Button>
          </div>
          <hr />
          <div className="hist-item">
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              {activity.board_date.slice(0, 10)} {/* 날짜 표시 */}
            </p>
            <a href={`/api/board/${activity.board_id}`} style={{ color: '#333', textDecoration: 'none' }}>
              <h6 className="card-subtitle mb-2 text-muted">{activity.title}</h6> {/* 게시물 제목 */}
            </a>
            <p className="card-text">{activity.content}</p> {/* 게시물 내용 */}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ActivityHistory;
