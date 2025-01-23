import React from 'react';

const ReadNotice = ({ notice }) => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">{notice.title}</h1>

            <p>
                <strong>분류:</strong>{' '}
                <span className="badge bg-info">{notice.category}</span>
            </p>
            <p>
                <strong>게시일:</strong> {notice.date}
            </p>
            <p>
                <strong>조회수:</strong> {notice.views}
            </p>
            <p>
                <strong>작성자:</strong> {notice.member_name}
            </p>

            <hr />

            <p>{notice.content}</p>

            <div className="d-flex justify-content-between mt-4">
                <a href="/notice" className="btn btn-secondary">
                    목록
                </a>
                <div>
                    <a href={`/notice/update/${notice.id}`} className="btn btn-warning">
                        수정
                    </a>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(notice.id)}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadNotice;

// Add `handleDelete` function in the parent component to manage API calls.
