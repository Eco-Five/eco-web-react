import 'react'

import { faEarthAmericas, faRecycle, faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataEnv = () => {
    const impactData = [
        { icon: faRecycle, title: '플라스틱 폐기량', value: '15,000kg' },
        { icon: faIndustry, title: '탄소 배출 감소량', value: '25,000kg' },
        { icon: faEarthAmericas, title: '나무 심기', value: '5,000그루' }
    ]

    return (
        <>
            <div className='ms-3 mb-3 mt-3' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <FontAwesomeIcon icon={faEarthAmericas} style={{ color: '#136207' }}/> 환경데이터
            </div>
            <div className="row ms-1 me-1">
                {impactData.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="impact-card" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', textAlign: 'center' }}>
                            <FontAwesomeIcon icon={item.icon} className="m-4" style={{ fontSize: '2rem' }} />
                            <h5 className="fw-bold">{item.title}</h5>
                            <p>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default DataEnv