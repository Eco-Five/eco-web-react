import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '/src/assets/css/board/Board.css'

const Board = () => {
    const [boards, setBoards] = useState([]);
    const [populars, setPopulars] = useState([]);
    const [category, setCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    


    //글쓰기 버튼 클릭
    const handleWriteClick = () => {
        if (user) {
            console.log("user 정보:", user);
            navigate('/board/write');
        } else {
            alert('로그인이 필요합니다.');
        }
    };

    useEffect(() => {
        fetchBoardData(currentPage, category);
    }, [currentPage, category]);

    const fetchBoardData = async (page = 1, category = 'all') => {
        try {
            const response = await axios.get(`api/api/board?page=${page}&category=${category}`);
            setBoards(response.data.boards);
            setTotalPages(response.data.totalPages);
            setPopulars(response.data.populars);
        } catch (error) {
            console.error('게시글 데이터를 가져오는 데 오류가 발생했습니다:', error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">커뮤니티</h1>
                <button className="btn btn-dark" onClick={handleWriteClick}>글쓰기</button>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="mb-3 d-flex justify-content-between">
                        <select className="form-select w-auto" value={category} onChange={handleCategoryChange}>
                            <option value="all">전체</option>
                            <option value="1">친환경뉴스</option>
                            <option value="2">친환경팁</option>
                            <option value="3">자유게시판</option>
                        </select>
                    </div>
                    <div id="board-list" className="list-group">
                        {boards.map(board => (
                            <a key={board.board_id} href={`/board/${board.board_id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                <img src={board.image_url || '/images/anyone/eco-mascot.png'} alt="thumbnail" className="rounded" />
                                <div className="w-100">
                                    <h5 className="mb-1">
                                        <span className={`badge rounded-pill ${board.type_name === '친환경뉴스' ? 'bg-success' : board.type_name === '친환경팁' ? 'bg-warning' : 'bg-secondary'}`}>
                                            {board.type_name}
                                        </span>
                                        {board.title}
                                    </h5>
                                    <p className="mb-1 text-truncate">{board.content}</p>
                                    <small className="text-muted">{board.name} · {new Date(board.board_date).toLocaleString()} · <i className="bi bi-eye"></i> {board.view_count} · <i className="bi bi-suit-heart"></i> {board.totalhearts}</small>
                                </div>
                            </a>
                        ))}
                    </div>
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&lt;</button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&gt;</button>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-lg-4">
                    <h5>인기 게시글</h5>
                    <ul className="list-group">
                        {populars.map((popular, index) => (
                            <li key={popular.board_id} className="list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <a href={`/board/${popular.board_id}`} className="popularlink">{index + 1}. {popular.title}</a>
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
