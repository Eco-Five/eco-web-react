import 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap'

const MainProduct = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const axiosProductData = async () => {
            try {
                const response = await axios.post('/api/api/naverShop', {
                    values: "친환경 인증",
                    page: 1,
                    sort: "sim"
                }, {
                    headers: { 'Content-Type': 'application/json' }
                })
                let randomNum = Math.floor(Math.random() * 96)
                setProductData(response.data.list.slice(randomNum, randomNum + 4))
            } catch (error) {
                console.error("Error axios main product data: ", error)
            }
        }
        axiosProductData()
    }, [])


    return (
        <>
            <div className='ms-3' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <span style={{ color: '#FAC608' }}>📦</span>추천제품
            </div>
            <Row className=" m-2">
                {productData.map((item, key) => (
                    <Col key={key} xs={12} sm={6} md={6} lg={3}>
                        <Card className="shadow-sm" style={{ height: '500px' }}>
                            <Card.Img variant="top" src={item.image} style={{ height: '70%', objectFit: 'cover' }} alt={item.title} />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="mb-2 text-truncate" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                    {item.title}
                                </Card.Title>
                                <Card.Text className="text-muted text-truncate" style={{ fontSize: '0.8rem' }}>
                                    {item.mallName}
                                </Card.Text>
                                <div className="mt-1 d-flex align-items-center justify-content-between" >
                                    <Card.Text className="fw-bold m-1" style={{ fontSize: '1.2rem' }}>
                                        {parseInt(item.lprice, 10).toLocaleString()}원
                                    </Card.Text>
                                    <Button variant="success" size="sm" onClick={() => window.open(item.link, '_blank')}>
                                        네이버 쇼핑
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default MainProduct