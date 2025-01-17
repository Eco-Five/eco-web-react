import 'react'
import { Link } from 'react-router-dom'

import { faTwitter, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Footer = () => {
    return (
        <>
            <footer className="py-4" style={{ backgroundColor: "#1C6758", color: "white" }}>
                <div className="container d-flex">
                    <div className="col-md-3">
                        <p className="fw-bold">에코라이프</p>
                        <p>지속 가능한 미래를 위한 현명한 선택</p>
                    </div>
                    <div className="col-md-3">
                        <p className="fw-bold">고객센터</p>
                        <ul className="list-unstyled">
                            <li><Link to="/notice" style={{color: "inherit", textDecoration: "none"}}>공지사항</Link></li>
                            <li><Link to="/question" style={{color: "inherit", textDecoration: "none"}}>고객문의</Link></li>
                            <li><Link to="/board" style={{color: "inherit", textDecoration: "none"}}>커뮤니티</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p className="fw-bold">회사소개</p>
                        <ul className="list-unstyled">
                            <li><Link to="/about" style={{color: "inherit", textDecoration: "none"}}>회사소개</Link></li>
                            <li><Link to="#" style={{color: "inherit", textDecoration: "none"}}>채용정보</Link></li>
                            <li><Link to="#" style={{color: "inherit", textDecoration: "none"}}>제휴문의</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <p className="fw-bold">소셜미디어</p>
                        <FontAwesomeIcon className="me-2" icon={faFacebook} />
                        <FontAwesomeIcon className="me-2" icon={faTwitter} />
                        <FontAwesomeIcon className="me-2" icon={faInstagram} />
                    </div>
                </div>
                <div className="text-center">
                    <small>© 2024 에코라이프. All rights reserved.</small>
                </div>
            </footer>
        </>
    )
}

export default Footer