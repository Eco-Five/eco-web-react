import 'react'
import bgVideo from '../../assets/home/bg.webm'

const About = () => {

    return (
        <>
            <video src={bgVideo} type="video/webm" autoPlay loop muted preload='metadata'
                style={{ position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100vh', objectFit: 'cover', zIndex: -1 }}
            />

            <h1 className='d-flex justify-content-center align-items-center'
                style={{ height: '82vh', fontSize: '2rem', fontFamily: "Times New Roman", color: '#ced4ea', letterSpacing: '5px' }}>
                ECO-LIFE: For a Sustainable Future
            </h1>
        </>
    )
}

export default About