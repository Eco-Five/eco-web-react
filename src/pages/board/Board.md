import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/assets/css/board/Board.css'

const Board = ({ user, initialCategory = 'all', initialPage = 1 }) => {
    const navigate = useNavigate();
    
    const [boards, setBoards] = useState([]);
    const [populars, setPopulars] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState(initialCategory);

    // 게시글 데이터 가져오기
    const fetchBoardData = async (page, category) => {
        try {
            const response = await fetch(`https://localhost:5678/api/board?page=${page}&category=${category}`);
            const data = await response.json();
            setBoards(data.boards);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setPopulars(data.populars);
        } catch (error) {
            console.error('게시글 데이터를 가져오는 데 오류가 발생했습니다:', error);
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

    // 페이지 변경 함수
    const changePage = (page) => {
        setCurrentPage(page);
        fetchBoardData(page, category);
    };

    // 카테고리 선택 변경 함수
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setCurrentPage(1); // 카테고리 변경 시 항상 첫 페이지로 이동
        fetchBoardData(1, selectedCategory);
    };

    useEffect(() => {
        fetchBoardData(currentPage, category);
    }, [currentPage, category]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">커뮤니티</h1>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    {/* 카테고리 선택 */}
                    <div className="mb-3 d-flex justify-content-between">
                        <select className="form-select w-auto" value={category} onChange={handleCategoryChange}>
                            <option value="all">전체</option>
                            <option value="1">친환경뉴스</option>
                            <option value="2">친환경팁</option>
                            <option value="3">자유게시판</option>
                        </select>
                        {user && user.isAuthenticated ? (
                            <a href="/board/write">
                                <button className="btn btn-dark">글쓰기</button>
                            </a>
                        ) : (
                            <button className="btn btn-dark" id="visitor">글쓰기</button>
                        )}
                    </div>

                    {/* 커뮤니티 글 목록 */}
                    <div id="board-list" className="list-group">
                        {boards.map((board) => (
                            <a key={board.board_id} href={`/board/${board.board_id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                <img src={board.image_url || '/src/assets/anyone/eco-mascot.png'} alt="thumbnail" className="rounded" />
                                <div className="w-100">
                                    <h5 className="mb-1">
                                        <span className={`badge rounded-pill ${board.type_name === '친환경뉴스' ? 'bg-success' : board.type_name === '친환경팁' ? 'bg-warning' : 'bg-secondary'}`}>
                                            {board.type_name}
                                        </span>
                                        {board.title}
                                    </h5>
                                    <p className="mb-1 text-truncate" id="rcontent">{board.content}</p>
                                    <small className="text-muted">
                                        {board.name} · {formatDate(board.board_date)} · <i className="bi bi-eye"></i> {board.view_count} · <i className="bi bi-suit-heart"></i> {board.totalhearts}
                                    </small>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* 페이징 처리 */}
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center" id="pagination">
                            {currentPage > 1 && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => changePage(currentPage - 1)}>&lt;</button>
                                </li>
                            )}
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            {currentPage < totalPages && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => changePage(currentPage + 1)}>&gt;</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* 사이드바(인기게시글) */}
                <div className="col-lg-4">
                    <h5>인기 게시글</h5>
                    <ul className="list-group" id="popular-list">
                        {populars.map((popular, index) => (
                            <li key={popular.board_id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <a href={`/board/${popular.board_id}`} className="popularlink">
                                        {index + 1}. {popular.title}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Board;



=====================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '/src/assets/css/board/Board.css'

const Board = ({ user, initialCategory = 'all', initialPage = 1 }) => {
    const navigate = useNavigate();
    
    const [boards, setBoards] = useState([]);
    const [populars, setPopulars] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [category, setCategory] = useState(initialCategory);

    // 게시글 데이터 가져오기
    const fetchBoardData = async (page, category) => {
        try {
            const response = await fetch(`https://localhost:5678/api/board?page=${page}&category=${category}`);
            const data = await response.json();
            setBoards(data.boards);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setPopulars(data.populars);
        } catch (error) {
            console.error('게시글 데이터를 가져오는 데 오류가 발생했습니다:', error);
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

    // 페이지 변경 함수
    const changePage = (page) => {
        setCurrentPage(page);
        fetchBoardData(page, category);
    };

    // 카테고리 선택 변경 함수
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setCurrentPage(1); // 카테고리 변경 시 항상 첫 페이지로 이동
        fetchBoardData(1, selectedCategory);
    };

    // 글쓰기 버튼 클릭 이벤트
    const handleWriteClick = () => {
        
        if (user && user.isAuthenticated) {
            location.href = '/board/write';
            console.log(loggedInUser);
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    useEffect(() => {
        // user 정보 콘솔에 출력
        if (user) {
            console.log("현재 로그인된 사용자:", user);
        } else {
            console.log("사용자가 로그인되지 않았습니다.");
        }
    }, [user]);  // user 값이 변경될 때 실행

    useEffect(() => {
        fetchBoardData(currentPage, category);
    }, [currentPage, category]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">커뮤니티</h1>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    {/* 카테고리 선택 */}
                    <div className="mb-3 d-flex justify-content-between">
                        <select className="form-select w-auto" value={category} onChange={handleCategoryChange}>
                            <option value="all">전체</option>
                            <option value="1">친환경뉴스</option>
                            <option value="2">친환경팁</option>
                            <option value="3">자유게시판</option>
                        </select>
                        <button className="btn btn-dark" onClick={handleWriteClick}>
                            글쓰기
                        </button>
                    </div>

                    {/* 커뮤니티 글 목록 */}
                    <div id="board-list" className="list-group">
                        {boards.map((board) => (
                            <a key={board.board_id} href={`/board/${board.board_id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                <img src={board.image_url || '/src/assets/anyone/eco-mascot.png'} alt="thumbnail" className="rounded" />
                                <div className="w-100">
                                    <h5 className="mb-1">
                                        <span className={`badge rounded-pill ${board.type_name === '친환경뉴스' ? 'bg-success' : board.type_name === '친환경팁' ? 'bg-warning' : 'bg-secondary'}`}>
                                            {board.type_name}
                                        </span>
                                        {board.title}
                                    </h5>
                                    <p className="mb-1 text-truncate" id="rcontent">{board.content}</p>
                                    <small className="text-muted">
                                        {board.name} · {formatDate(board.board_date)} · <i className="bi bi-eye"></i> {board.view_count} · <i className="bi bi-suit-heart"></i> {board.totalhearts}
                                    </small>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* 페이징 처리 */}
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center" id="pagination">
                            {currentPage > 1 && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => changePage(currentPage - 1)}>&lt;</button>
                                </li>
                            )}
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => changePage(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            {currentPage < totalPages && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => changePage(currentPage + 1)}>&gt;</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>

                {/* 사이드바(인기게시글) */}
                <div className="col-lg-4">
                    <h5>인기 게시글</h5>
                    <ul className="list-group" id="popular-list">
                        {populars.map((popular, index) => (
                            <li key={popular.board_id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <a href={`/board/${popular.board_id}`} className="popularlink">
                                        {index + 1}. {popular.title}
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Board;

