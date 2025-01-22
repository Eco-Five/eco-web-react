import React, { useState } from 'react';

const WriteNotice = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        category: '',
        title: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">공지사항 등록</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="업데이트">업데이트</option>
                        <option value="서비스공지">서비스공지</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        제목
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        내용
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        className="form-control"
                        rows="5"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    작성
                </button>
                <a href="/notice" className="btn btn-secondary">
                    목록
                </a>
            </form>
        </div>
    );
};

export default WriteNotice;
