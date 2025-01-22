import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'; 
import { FaRegClipboard, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 

const Myboard = () => {
  const [boardItems, setBoardItems] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);  
  const [itemsPerPage] = useState(1); 

  useEffect(() => {
    // 게시글 조회
    const getBoardInfo = async () => {
      try {
        const response = await axios.post('/api/api/getboardInfo');
        if (response.data.success) {
          const sortedData = response.data.data.sort((a, b) => {
            return new Date(b.board_date) - new Date(a.board_date); // 날짜 내림차순으로 정렬
          });
          setBoardItems(sortedData); 
        } else {
          alert('게시글 내역이 없습니다.');
        }
      } catch (error) {
        console.error('게시판 정보 조회 오류:', error);
      }
    };
    
    getBoardInfo();
  }, []); 

  // 페이지 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = boardItems.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (direction === 'next' && currentPage < Math.ceil(boardItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-4 mb-4">
      <Card className="board-card shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">
              <FaRegClipboard style={{ marginRight: '10px' }} />
              <b>게시판</b>
            </h5>
          </div>
          <hr />
          <div className="board-item">
            {boardItems.length > 0 ? (
              currentItems.map((item) => (
                <div key={item.board_id}>  
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {item.board_date.slice(0, 10)} {/* 날짜 표시 */}
                  </p>
                  <a href={`/api/board/${item.board_id}`} style={{ color: '#333'}}>
                    <h6 className="card-subtitle mb-2 text-muted">{item.title}</h6> {/* 게시물 제목 */}
                  </a>
                  <p className="card-text">{item.content}</p> {/* 게시물 내용 */}
                </div>
              ))
            ) : (<div className="col-12 text-center">게시글 내역이 없습니다.</div>)}
          </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center align-items-center">
          <Button
            variant="success"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          >
            <FaChevronLeft /> {/* 이전 아이콘 */}
          </Button>
          <Button
            variant="success"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === Math.ceil(boardItems.length / itemsPerPage)}
          >
            <FaChevronRight /> {/* 다음 아이콘 */}
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Myboard;
