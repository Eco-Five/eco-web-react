import 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';

import logo from "../../assets/anyone/eco-logo.png";


const Header = () => {
    const navi = useNavigate()
    const isLoggedIn = useSelector((state) => state.sessionInfo.isLoggedIn)
    const [isVisible, setIsVisible] = useState(isLoggedIn)

    useEffect(() => {
        setIsVisible(isLoggedIn)
        // const isAuthCheck = async () => {
        //     try {
        //         const response = await axios.get('api/api/protected')
        //         setIsVisible(response.data.auth)
        //     } catch (error) {
        //         console.error("isAuthCheck error")
        //         setIsVisible(error.response.data.auth)
        //     }
        // }
        // isAuthCheck()
    }, [isLoggedIn])

    return (
        <>
            <Row className='align-items-center mt-2 mb-2' style={{ weight: "100vh" }}>
                <Col></Col>
                <Col className='text-center'>
                    <Card.Title className="display-2 fw-bold fs-2" style={{ letterSpacing: "3px" }}>
                        <Image src={logo} alt="Logo" style={{ width: "30px" }}></Image>
                        <span style={{ color: '#1C6758' }}> ECO-LIFE</span>
                    </Card.Title>
                </Col>

                <Col className='text-end me-3'>
                    <Button onClick={() => navi('/login')} variant="dark" style={{ display: isVisible ? "none":"" }}>로그인</Button>
                    <Button onClick={() => {navi('api/api/logout') 
                        window.location.reload() }} variant="dark" style={{ display: isVisible ? "":"none" }}>로그아웃</Button>
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
                    <Nav.Link eventKey="board" className='text-secondary' onClick={() => navi('/product')}>상품목록</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="board" className='text-secondary' onClick={() => navi('/board')}>커뮤니티</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="question" className='text-secondary' onClick={() => navi('/question')}>고객문의</Nav.Link>
                </Nav.Item>
                {isVisible && (
                    <>
                        <Nav.Item>
                            <Nav.Link eventKey="payment" className='text-secondary fw-blod' onClick={() => navi('/payment')}>구독</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="mypage" className='text-secondary fw-blod' onClick={() => navi('/mypage')}>마이페이지</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="game" className='text-secondary fw-blod' onClick={() => navi('/game')}>ReactQuiz!</Nav.Link>
                        </Nav.Item>
                    </>
                )}
            </Nav>

            <div style={{ borderBottom: "1px solid #ddd" }} ></div>
        </>
    )
}

export default Header