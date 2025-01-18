import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('all');
    const [error, setError] = useState(null);

    const location = useLocation(); // 현재 위치(URL) 쿼리스트링 가져옴
    const navigate = useNavigate(); // URL 변경

    // API 호출 함수
    const fetchQuestions = async (page, categoryParam) => {
        try {
            setError(null);
            const response = await fetch(`https://localhost:5678/api/question?page=${page}&category=${categoryParam}`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API 요청 실패: ${response.status} ${response.statusText} - ${errorText}`);
            }
            const data = await response.json();
            setQuestions(data.questions);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('API 요청 오류: ', error.message);
            setError('데이터를 가져오는 데 실패했습니다.');
        }
    };

    // URL의 쿼리 파라미터를 읽고 상태 업데이트
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get('page'), 10) || 1;
        const categoryParam = queryParams.get('category') || 'all';

        setCurrentPage(page);
        setCategory(categoryParam);

        fetchQuestions(page, categoryParam); // 데이터 가져오기
    }, [location.search]);

    // 카테고리 변경 핸들러
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value || 'all';
        const queryParams = new URLSearchParams({
            page: 1, // 카테고리를 변경하면 페이지는 1로 초기화
            category: selectedCategory,
        }).toString();
        navigate(`?${queryParams}`); // URL 변경
    };

    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        const queryParams = new URLSearchParams({
            page,
            category,
        }).toString();
        navigate(`?${queryParams}`); // URL 변경
    };

    // 날짜 형식 변환 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-start align-items-center mb-4">
                <h3>고객문의</h3>
            </div>

            <div className="mb-3 d-flex justify-content-between">
                <select
                    className="form-select w-auto"
                    value={category}
                    onChange={handleCategoryChange}
                >
                    <option value="all">전체</option>
                    <option value="4">배송</option>
                    <option value="5">상품</option>
                    <option value="6">교환/반품</option>
                </select>

                <button
                    className="btn btn-dark"
                    onClick={() => navigate('/api/question/write')}
                >
                    문의하기
                </button>
            </div>

            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">번호</th>
                                <th scope="col">문의유형</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">작성일</th>
                                <th scope="col">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((question) => (
                                <tr key={question.inquiry_id}>
                                    <td>{question.inquiry_id}</td>
                                    <td>{question.type_name}</td>
                                    <td>
                                        <a href={`/api/question/${question.inquiry_id}`}>
                                            {question.title}
                                        </a>
                                    </td>
                                    <td>{question.name}</td>
                                    <td>{formatDate(question.inquiry_date)}</td>
                                    <td>
                                        {question.status === '답변대기' ? (
                                            <span className="badge bg-warning">{question.status}</span>
                                        ) : (
                                            <span className="badge bg-success">{question.status}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    {currentPage > 1 && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                &lt;
                            </button>
                        </li>
                    )}

                    {[...Array(totalPages).keys()].map((i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        </li>
                    ))}

                    {currentPage < totalPages && (
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                &gt;
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Question;