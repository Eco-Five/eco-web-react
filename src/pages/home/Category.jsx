import { useEffect, useState } from 'react';
import CategoryModal from './CategoryModal';

import zerowaste from "../../assets/home/zerowaste.png"
import organic from "../../assets/home/organic.jpg"
import recycle from "../../assets/home/recycle.png"
import ecopassion from "../../assets/home/ecopassion.jpg"


const Category = () => {
    const [modalShow, setModalShow] = useState(false);
    const [ecoContent, setEcoContent] = useState({
        'title': '',
        'content': '',
    });

    const ecoList = [
        { src: zerowaste, title: "제로웨이스트", content: "제로 웨이스트(zero waste)는 모든 제품이 재사용될 수 있도록 장려하며 폐기물을 방지하는 데 초점을 맞춘 원칙이다. 제품들이 쓰레기가 되지 않도록 하는 것이 목표인데, 현재 플라스틱의 9%만이 실제로 재활용되고 있다. " },
        { src: organic, title: "유기농", content: "유기농(有機農, 영어: organic farming)은 유기농 종자를 사용하고, 5년 이상의 윤작을 실천하며, 토양진단을 통해 최적시비를 실천하며, 종다양성을 확보하여 천적 서식을 도모하여 건강한 작물체 재배를 도모하는 영농방법이다." },
        { src: recycle, title: "재활용", content: "재활용(리사이클링)(再活用, recycling)은 말 그대로 특정 물품을 다시 사용한 것. 원자재에서 가공한 1차 생산물을 한번 사용하고 난뒤 재처리 과정을 거쳐 본래의 용도, 혹은 다른 용도로 다시 사용할 수 있도록 만드는 것이다." },
        { src: ecopassion, title: "친환경패션", content: "친환경(親環境, Eco-friendly)은 환경문제가 심각해짐에 따라 문제를 해결하기 위해 나온 일종의 대안 중 하나이다. 주로 자연환경에 영향을 끼치는 기존의 공업 방식, 생활방식에 친환경을 도입했다." }
    ]


    return (
        <div id="card-container" className="d-flex justify-content-between mt-3 mb-3"
            style={{ width: "100%", fontSize: "clamp(0.6rem, 2.0vw, 1.0rem)" }}>
            
            {ecoList.map((eco, index) => (
                <div key={index} className="container d-flex justify-content-center" style={{ maxWidth: "500px" }}>
                    <div className="card" style={{ textAlign: "center" }}>
                        <img
                            className="img-fluid"
                            src={eco.src}
                            alt="Card image"
                            style={{ height: "100%" }}
                        />
                        <div
                            onClick={() => {
                                setModalShow(true)
                                setEcoContent({
                                    'title': eco.title,
                                    'content': eco.content
                                })
                            }}
                            className="card-img-overlay"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                        >
                            <p className="card-title d-flex align-items-center justify-content-center fw-bold"
                                style={{ height: "100%", fontSize: "clamp(1.2rem, 2vw, 3rem)", color: "white" }}>
                                {eco.title}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            <CategoryModal show={modalShow} onHide={() => setModalShow(false)} content={ecoContent} />
        </div>
    )
}

export default Category