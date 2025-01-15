import 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap'

import baner1 from "../../assets/home/baner1.png";
import baner2 from "../../assets/home/baner2.png";
import baner3 from "../../assets/home/baner3.png";

const Slide = () => {
    const navi = useNavigate();

    const slideList = [
        { src: baner1, alt: "baner1" },
        { src: baner2, alt: "baner2" },
        { src: baner3, alt: "baner3" }
    ];

    return (
        <>
            <Carousel interval={5000}>
                {slideList.map((slide, key) => (
                    <Carousel.Item key={key}>
                        <img className="d-block w-100" src={slide.src} alt={slide.alt} style={{ height: '80vh', filter: 'brightness(0.5)', objectFit: 'cover' }} />
                    </Carousel.Item>
                ))}
            </Carousel>
            <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <h1 className="mb-3" style={{ fontSize: 'clamp(1.4rem, 4vw, 3rem)', color: 'white' }}>
                        지구를 위한 현명한 선택
                    </h1>
                    <p className="mb-4" style={{ fontSize: 'clamp(0.6rem, 2.0vw, 1.4rem)', color: 'white' }}>
                        지속 가능한 소비로 더 나은 미래를 만들어갑니다
                    </p>
                    <Button variant="dark" onClick={() => navi('/about')}>
                        슬로건
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Slide