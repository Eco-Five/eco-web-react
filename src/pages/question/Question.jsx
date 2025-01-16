import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('all');

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        console.log("call");
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page') || 1;
        const categoryParam = queryParams.get('category') || 'all';

        setCurrentPage(Number(page));
        setCategory(categoryParam);

        const fetchQuestions = async () => {
            try {
                const response = await fetch(`/api/question?page=${page}&category=${categoryParam}`);
                const data = await response.json(); // JSON 데이터 받기
                setQuestions(data.questions);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("API 요청 오류: ", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value || 'all';
        setCategory(selectedCategory);
        setCurrentPage(1);

        // URL 업데이트
        history.push(`/question?page=1&category=${selectedCategory}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        history.push(`/question?page=${page}&category=${category}`);
    };

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

                <a href="/question/write"><button className="btn btn-dark">문의하기</button></a>
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
                                <td><a href={`question/${question.inquiry_id}`}>{question.title}</a></td>
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

            <nav className="mt-4">
                <ul className="pagination justify-content-center">
                    {currentPage > 1 ? (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>&lt;</a>
                        </li>
                    ) : (
                        <li className="page-item disabled">
                            <a className="page-link" href="#"> &lt; </a>
                        </li>
                    )}

                    {[...Array(totalPages).keys()].map((i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <a className="page-link" href="#" onClick={() => handlePageChange(i + 1)}>{i + 1}</a>
                        </li>
                    ))}

                    {currentPage < totalPages ? (
                        <li className="page-item">
                            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>&gt;</a>
                        </li>
                    ) : (
                        <li className="page-item disabled">
                            <a className="page-link" href="#"> &gt; </a>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Question;