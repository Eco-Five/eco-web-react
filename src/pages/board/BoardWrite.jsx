import React, { useState } from 'react';
import '/src/assets/css/board/Board.css'

const BoardWrite = ({ user }) => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);

    const handleCancel = () => {
        window.location.href = '/board';
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!category) {
            alert("카테고리를 선택하세요.");
            return;
        }

        const formData = new FormData();
        formData.append('member_id', user?.member_id || '');
        formData.append('content_type_id', category);
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('fileUpload', file);
        }

        try {
            const response = await fetch('/api/board/write', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                alert("등록 완료되었습니다.");
                window.location.href = '/board';
            } else {
                alert("등록에 실패했습니다.");
            }
        } catch (error) {
            alert("등록 요청 중 오류 발생");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-white bg-dark">
                    <h4 className="mb-0">커뮤니티</h4>
                    <p className="mb-0">친환경적인 미래를 위해 의견을 공유해보세요</p>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">카테고리</label>
                            <select id="category" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">커뮤니티 유형을 선택하세요</option>
                                <option value="1">친환경뉴스</option>
                                <option value="2">친환경팁</option>
                                <option value="3">자유게시판</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">작성자</label>
                            <input type="text" className="form-control" value={user?.name || ''} readOnly />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">제목</label>
                            <input type="text" className="form-control" id="title" placeholder="제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">내용</label>
                            <textarea className="form-control" id="content" rows="20" placeholder="내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fileUpload" className="form-label">파일 첨부</label>
                            <input className="form-control" type="file" id="fileUpload" accept=".png, .jpg, .gif" onChange={(e) => setFile(e.target.files[0])} />
                            <small className="text-muted">PNG, JPG, GIF 최대 10MB</small>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>취소</button>
                            <button type="submit" className="btn btn-primary">등록</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BoardWrite;
