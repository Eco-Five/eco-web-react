import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '/src/assets/css/board/Board.css'

const BoardDetail = () => {
    const { b_no } = useParams();  // URL에서 게시글 번호 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const [board, setBoard] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [likeStatus, setLikeStatus] = useState(false);
    const [heartCount, setHeartCount] = useState(0);

    // 컴포넌트가 처음 마운트될 때, 게시글 데이터를 로드
    useEffect(() => {
        // 로그인한 사용자 정보 설정
        const user = window.user || null;  // 전역 객체 `user`에서 정보 가져오기
        setLoggedInUser(user);

        // 게시글 데이터를 가져오는 함수
        const fetchBoardData = async () => {
            try {
                const response = await fetch(`/api/board/${b_no}`);
                const result = await response.json();

                if (result.success) {
                    const boardData = result.board;
                    setBoard(boardData);
                    setHeartCount(boardData.totalhearts);
                    setLikeStatus(boardData.heart === 1);  // 좋아요 상태 설정
                } else {
                    alert('게시글을 불러오는 데 실패했습니다.');
                }
            } catch (error) {
                console.error('오류 발생:', error);
                alert('게시글을 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchBoardData();
    }, [b_no]);  // `b_no`가 변경될 때마다 다시 호출

    // 게시글 삭제
    const handleDelete = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`/api/board/${b_no}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ b_no }),
                });

                const data = await response.json();
                if (data.success) {
                    alert('삭제 완료되었습니다.');
                    navigate('/board');  // 목록 페이지로 이동
                } else {
                    alert('삭제 실패했습니다.');
                }
            } catch (error) {
                console.error('오류 발생:', error);
                alert('오류가 발생했습니다.');
            }
        }
    };

    // 좋아요 클릭
    const handleLike = async () => {
        if (!loggedInUser) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await fetch(`/api/board/${b_no}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.totalHearts !== undefined) {
                setHeartCount(data.totalHearts);
                setLikeStatus(data.totalHearts > 0);  // 좋아요 상태 변경
            }
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    // 데이터 로딩 중에는 "Loading..." 메시지를 표시
    if (!board) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {/* 게시글 상세 */}
            <div className="card p-4 mb-4">
                <h1 className="h4">{board.title}</h1>
                <small className="text-muted">
                    {board.name} · {formatDate(board.board_date)} · 조회수 {board.view_count}
                </small>
                <p className="mt-3" style={{ whiteSpace: 'pre-line' }}>{board.content}</p>

                <div className="d-flex justify-content-between align-items-center mt-4">
                    {/* 좋아요 버튼 */}
                    <button className="btn btn-outline-primary" onClick={handleLike}>
                        <i className={`bi ${likeStatus ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`} />
                        <span>{heartCount}</span>
                    </button>

                    <div>
                        {/* 수정/삭제 버튼 */}
                        {loggedInUser && loggedInUser.member_id === board.member_id && (
                            <>
                                <button
                                    className="btn btn-outline-primary btn-sm me-2"
                                    onClick={() => navigate(`/board/update/${b_no}`)}
                                >
                                    <i className="bi bi-pencil" /> 수정
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm me-2"
                                    onClick={handleDelete}
                                >
                                    <i className="bi bi-trash" /> 삭제
                                </button>
                            </>
                        )}
                        <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => navigate('/board')}
                        >
                            <i className="bi bi-list" /> 목록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;