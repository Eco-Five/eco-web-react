import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Fetch notices from the backend
        axios
            .get(`/api/notice?page=${currentPage}`)
            .then((response) => {
                const { notices, totalPages } = response.data;
                setNotices(notices);
                setTotalPages(totalPages);
            })
            .catch((error) => console.error('Error fetching notices:', error));
    }, [currentPage]);

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>공지사항</h1>
                <Link to="/notice/write" className="btn btn-primary">
                    글쓰기
                </Link>
            </div>
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th className="text-center" style={{ width: '5%' }}>
                            번호
                        </th>
                        <th className="text-center" style={{ width: '10%' }}>
                            카테고리
                        </th>
                        <th className="text-center" style={{ width: '50%' }}>
                            제목
                        </th>
                        <th className="text-center" style={{ width: '20%' }}>
                            작성일
                        </th>
                        <th className="text-center" style={{ width: '15%' }}>
                            작성자
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {notices.length > 0 ? (
                        notices.map((notice) => (
                            <tr key={notice.id}>
                                <td className="text-center">{notice.id}</td>
                                <td className="text-center">
                                    <span className="badge bg-info">
                                        {notice.category || '없음'}
                                    </span>
                                </td>
                                <td>
                                    <Link
                                        to={`/notice/read/${notice.id}`}
                                        className="text-decoration-none"
                                    >
                                        {notice.title}
                                    </Link>
                                </td>
                                <td className="text-center">
                                    {new Date(notice.notice_date).toLocaleDateString('ko-KR')}
                                </td>
                                <td className="text-center">
                                    {notice.member_name || '익명'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                공지사항이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageClick(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default NoticeBoard;
