import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Question.css";

function Question() {
    const [questions, setQuestions] = useState([]); // 질문 목록
    const [category, setCategory] = useState("all"); // 선택된 카테고리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    const navigate = useNavigate();
    const location = useLocation();

    // 데이터 가져오기
    useEffect(() => {
        const fetchQuestions = async () => {
            const queryParams = new URLSearchParams(location.search);
            const page = queryParams.get("page") || 1;
            const selectedCategory = queryParams.get("category") || "all";

            setCurrentPage(Number(page));
            setCategory(selectedCategory);

            const response = await fetch(
                `/api/question?page=${page}&category=${selectedCategory}`
            );
            const data = await response.json();

            setQuestions(data.questions);
            setTotalPages(data.totalPages);
        };

        fetchQuestions();
    }, [location.search]);

    // 날짜 포맷 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    // 카테고리 변경 핸들러
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory); // 상태 먼저 업데이트
        navigate(`?page=1&category=${selectedCategory}`); // 페이지 1로 리셋하고 카테고리 변경
    };

    // 페이징 처리 핸들러
    const handlePageChange = (page) => {
        navigate(`?page=${page}&category=${category}`);
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
                
                <a href="#">
                    <button className="btn btn-dark">문의하기</button>
                </a>
            </div>
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
                                    <a href={`/question/${question.inquiry_id}`}>
                                        {question.title}
                                    </a>
                                </td>
                                <td>{question.name}</td>
                                <td>{formatDate(question.inquiry_date)}</td>
                                <td>
                                    {question.status === "답변대기" ? (
                                        <span className="badge bg-warning">
                                            {question.status}
                                        </span>
                                    ) : (
                                        <span className="badge bg-success">
                                            {question.status}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    {/** 이전 페이지 */}
                    <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &lt;
                        </button>
                    </li>
                    {/** 페이지 번호 */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page && "active"}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    {/** 다음 페이지 */}
                    <li
                        className={`page-item ${
                            currentPage === totalPages && "disabled"
                        }`}
                    >
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &gt;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Question;