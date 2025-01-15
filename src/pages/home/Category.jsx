import 'react'
import zerowaste from "../../assets/home/zerowaste.png"
import organic from "../../assets/home/organic.jpg"
import recycle from "../../assets/home/recycle.png"
import ecopassion from "../../assets/home/ecopassion.jpg"

const Category = () => {

    const ecoList = [
        { src: zerowaste, title: "제로웨이스트" },
        { src: organic, title: "유기농" },
        { src: recycle, title: "재활용" },
        { src: ecopassion, title: "친환경패션" },
    ];


    return (
        <div id="card-container" className="d-flex justify-content-between mt-3 mb-3"
            style={{ width: "100%", fontSize: "clamp(0.6rem, 2.0vw, 1.0rem)" }}>
            
            {ecoList.map((eco, index) => (
                <div key={index} className="container d-flex justify-content-center" style={{ maxWidth: "500px" }}>
                    <div className="card" style={{ textAlign: "center" }}>
                        <img className="img-fluid" src={eco.src} alt="Card image" style={{ height: "100%" }}/>
                        <div className="card-img-overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
                            <p className="card-title d-flex align-items-center justify-content-center fw-bold"
                                style={{ height: "100%", fontSize: "clamp(1.2rem, 2vw, 3rem)", color: "white" }}>
                                {eco.title}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Category