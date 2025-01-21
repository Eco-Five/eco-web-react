import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const QuestionDetail = ({ user }) => {
    const { q_no } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [comment, setComment] = useState('');
    
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await fetch(`/api/question/${q_no}`);
                const result = await response.json();

                if (result.success) {
                    setQuestion(result.question);
                } else {
                    alert('게시글을 가져오는데 실패했습니다.');
                    navigate('/question');
                }
            } catch (error) {
                alert('오류 발생: ' + error.message);
            }
        };
        fetchQuestion();
    }, [q_no, navigate]);

    const handleDelete = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`/api/question/${q_no}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ q_no })
                });
                const data = await response.json();
                if (data.success) {
                    alert('삭제 완료되었습니다');
                    navigate('/question');
                } else {
                    alert('삭제 실패했습니다.');
                }
            } catch (error) {
                alert('오류 발생: ' + error.message);
            }
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/question/${q_no}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment })
            });
            const data = await response.json();
            if (data.success) {
                alert('댓글이 등록되었습니다.');
                window.location.reload();
            } else {
                alert('댓글 등록 실패했습니다.');
            }
        } catch (error) {
            alert('오류 발생: ' + error.message);
        }
    };

    if (!question) return <p>로딩 중...</p>;

    return (
        <div className="container mt-5">
            <div className="card p-4 mb-4">
                <h1 className="h4">{question.title}</h1>
                <small className="text-muted">{question.name} · {new Date(question.inquiry_date).toLocaleString()}</small>
                <p className="mt-3" style={{ whiteSpace: 'pre-line' }}>{question.content}</p>
                <div className="d-flex justify-content-between align-items-center mt-4">
                    {user?.member_id === question.member_id && (
                        <div>
                            <button onClick={() => navigate(`/question/update/${q_no}`)} className="btn btn-outline-primary btn-sm me-2">수정</button>
                            <button onClick={handleDelete} className="btn btn-outline-danger btn-sm me-2">삭제</button>
                        </div>
                    )}
                    <button onClick={() => navigate('/question')} className="btn btn-outline-primary btn-sm">목록</button>
                </div>
            </div>

            <div>
                <h5>답변</h5>
                {user?.name === '김지영' ? (
                    <>
                        <textarea className="form-control" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="답변을 등록하세요."></textarea>
                        <div className="text-end mt-2">
                            <button onClick={handleCommentSubmit} className="btn btn-dark">댓글 작성</button>
                        </div>
                    </>
                ) : (
                    <textarea className="form-control" rows="3" placeholder="관리자만 답변을 작성할 수 있습니다." readOnly></textarea>
                )}
            </div>

            <div className="mt-4">
                {question.comment ? (
                    <div className="mb-3">
                        <strong>관리자</strong> <small className="text-muted">{new Date(question.comment_date).toLocaleString()}</small>
                        <p style={{ whiteSpace: 'pre-line' }}>{question.comment}</p>
                    </div>
                ) : (
                    <strong>답변 대기 중입니다.</strong>
                )}
            </div>
        </div>
    );
};

export default QuestionDetail;