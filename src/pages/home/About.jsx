import 'react'
import bgVideo from '../../assets/home/bg.mp4'

const About = () => {

    return (
        <>
            <video src={bgVideo} type="video/mp4" autoPlay loop muted
                style={{ position: 'absolute', top: 0, left: 0, 
                    width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />

            <h1 className='d-flex justify-content-center align-items-center'
                style={{ fontSize: '2rem', fontFamily: "Times New Roman", color: '#ced4ea', letterSpacing: '5px', height: '570px' }}>
                ECO-LIFE: For a Sustainable Future
            </h1>
        </>
    )
}

export default About