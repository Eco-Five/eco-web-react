import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { FaHistory } from 'react-icons/fa';
import './styles/ItemRecent.css';  

const ItemRecent = () => {
    const [recentItems, setRecentItems] = useState([]);
    const [isRendered, setIsRendered] = useState(false);

    // 최근 본 상품 불러오기
    const fetchRecentItems = () => {
        fetch('api/recentViewed')
            .then((response) => response.json())
            .then((data) => {
                setRecentItems(data.recentViewed || []);
            })
            .catch((error) => console.error('Error fetching recent items:', error));
    };

    // 최근 본 상품 영역 토글
    const handleRecentToggle = () => {
        if (isRendered) {
            setRecentItems([]); 
        } else {
            fetchRecentItems();  
        }
        setIsRendered(!isRendered); 
    };

    return (
    <>
        {/* 기록 버튼 */}
        <Button variant="outline-dark" onClick={handleRecentToggle} className="history-btn">
            <FaHistory />
        </Button>

        {isRendered && recentItems.length > 0 && (
        <div className="recent-viewed-container my-4">
            <p style={{ fontSize: '12px'}}>
                <b>최근 본 상품</b>
            </p>
            <div className="row">
                {recentItems.map((item, index) => (
                    <div className="col-md-3" key={index} style={{ width: '100px' }}>
                        <div className="category-card" style={{ marginBottom: '20px' }}>
                                <img src={item.image} alt="최근 본 상품" onClick={() => window.open(item.link, '_blank')} className="img-fluid" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        )}
    </>
    )
}

export default ItemRecent