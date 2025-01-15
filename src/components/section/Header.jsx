import 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

import logo from "../../assets/anyone/eco-logo.png";


const Header = () => {
    const navi = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isAuthCheck = async () => {
            try {
                const response = await axios.get('node/api/protected')
                console.log(response.data)
            } catch (error) {
                console.error("isAuthCheck error")
                setIsVisible(error.response.data.user)
            }
        }
        isAuthCheck()
    }, [])

    return (
        <>
            <Row className='align-items-center mt-2 mb-2'>
                <Col></Col>
                <Col className='text-center'>
                    <Card.Title className="display-2 fw-bold fs-2" style={{ letterSpacing: "3px" }}>
                        <Image src={logo} alt="Logo" style={{ width: "30px" }}></Image>
                        <span style={{ color: '#1C6758' }}> ECO-LIFE</span>
                    </Card.Title>
                </Col>

                <Col className='text-end me-3'>
                    <Button onClick={() => navi('/login')} variant="dark" style={{ display: isVisible ? "none":"" }}>로그인</Button>
                    <Button onClick={() => navi('node/api/logout')} variant="dark" style={{ display: isVisible ? "":"none" }}>로그아웃</Button>
                </Col>
            </Row>

            <Nav className="justify-content-center" activeKey="home">
                <Nav.Item>
                    <Nav.Link eventKey="home" className='text-secondary' onClick={() => navi('/')}>홈</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="notice" className='text-secondary' onClick={() => navi('/notice')}>공지사항</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="board" className='text-secondary' onClick={() => navi('/board')}>커뮤니티</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="question" className='text-secondary' onClick={() => navi('/question')}>고객문의</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="payment" className='text-secondary' onClick={() => navi('/payment')} 
                        style={{ display: isVisible ? "":"none" }}>구독
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="mypage" className='text-secondary' onClick={() => navi('/mypage')} 
                        style={{ display: isVisible ? "":"none" }}>마이페이지
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <div style={{ borderBottom: "1px solid #ddd" }} ></div>
        </>
    )
}

export default Header