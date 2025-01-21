import React, { useState } from 'react';

const UpdateNotice = ({ notice, onUpdate }) => {
    const [formData, setFormData] = useState({
        category: notice.category,
        title: notice.title,
        content: notice.content,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(notice.id, formData);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">공지사항 수정</h1>
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
                        <option value="서비스공지">서비스공지</option>
                        <option value="업데이트">업데이트</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
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
                        Content
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
                <div className="d-flex justify-content-between">
                    <a href="/notice" className="btn btn-secondary">
                        Back to List
                    </a>
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateNotice;
