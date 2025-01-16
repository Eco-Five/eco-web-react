import { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityHistory = () => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const getBoardInfo = async () => {
      try {
        const response = await axios.post('/api/getBoardInfo');
        if (response.data.success) {
          setActivity(response.data.data);
        } else {
          alert('게시판 정보를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('게시판 정보 조회 오류:', error);
      }
    };

    getBoardInfo();
  }, []);

  if (!activity) return <div>Loading...</div>;

  return (
    <div className="hist-card">
      <div className="hist-info">
        <h6 style={{ marginTop: '20px' }}>
          <b>나의 활동 내역</b>
        </h6>
        <div className="hist-item">
          <p>{activity.board_date.slice(0, 10)}</p>
          <a href={`/api/board/${activity.board_id}`} style={{ color: '#666' }}>
            <p>{activity.title}</p>
          </a>
          <p>{activity.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityHistory;
