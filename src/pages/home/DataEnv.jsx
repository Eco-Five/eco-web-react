import 'react'

const DataEnv = () => {
    const impactData = [
        { icon: '♻', title: '플라스틱 폐기량', value: '15,000kg' },
        { icon: '🔰', title: '탄소 배출 감소량', value: '25,000kg' },
        { icon: '🌳', title: '나무 심기', value: '5,000그루' }
    ]

    return (
        <>
            <div className='ms-3 mb-3 mt-3' style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                <span>🌎</span> 환경데이터
            </div>
            <div className="row ms-1 me-1">
                {impactData.map((item, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="impact-card" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', textAlign: 'center' }}>
                            <span className="m-4" style={{ fontSize: '2rem' }}>{item.icon}</span>
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