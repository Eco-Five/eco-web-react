import React, { useState } from 'react'
import axios from 'axios'

const Payment = () => {
    /************************************ useState & dataSet **************************************/
    const [selectedPlan, setSelectedPlan] = useState('선택없음')
    const [selectedPrice, setSelectedPrice] = useState(0)
    const [termsChecked, setTermsChecked] = useState(false)
    const [privacyChecked, setPrivacyChecked] = useState(false)

    const subsList = [
        { title: '기본형', price: 10, features: ['기본 리포트 제공', '환경 인식자료 제공', '멤버십 보너스 포함'] },
        { title: '프리미엄', price: 20, features: ['모든 멤버십 혜택 제공', '각종 리포트 무료제공', '고객지원 우선 처리'] },
        { title: '기업형', price: 30, features: ['기업용 환경 분석 제공', 'ESG 관련 추가 자료', '컨설팅 서비스 포함'] }
    ]

    /************************************ Event Handler **************************************/
    const handleCardClick = (plan, price) => {
        setSelectedPlan(plan)
        setSelectedPrice(price)
    }

    const handlePayment = async () => {
        if(!termsChecked || !privacyChecked) {
            alert('이용약관과 개인정보처리방침에 동의해주세요!')
        } else if (selectedPlan === '선택없음') {
            alert('구독 상품을 선택해주세요!')
        } else {
            try {
                const response = await axios.post('api/users/naverPay', {
                    subsPlan: selectedPlan,
                    subsPrice: selectedPrice
                })
                const result = await response.data
                window.location.href = `https://test-m.pay.naver.com/payments/${result.body.reserveId}`

            } catch (error) {
                console.log("결제요청 오류: ", error);
            }
        }
    }
    /************************************ Event Handler **************************************/

    return (
        <div className="container my-5" style={{ maxWidth: '800px' }}>
            <h2 className="text-center mb-2 fw-bold">친환경 멤버십 구독</h2>
            <p className="text-center mb-5 text-muted">지속 가능한 미래를 위한 합리적 선택</p>

            <div className="row g-4 mb-5">
                {subsList.map((plan, index) => (
                    <div className="col-md-4" key={index}>
                        <div className={`card h-100 ${selectedPlan === plan.title ? 'border-secondary': ''}`}
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
                        onClick={() => handleCardClick(plan.title, plan.price)}>
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{plan.title}</h5>
                                <span className="card-text fs-4">₩{plan.price}</span><span>/월</span>
                                <ul className="list-unstyled">
                                    {plan.features.map((feature, i) => <li key={i}>✔️ {feature}</li>)}
                                </ul>
                                <button className="btn btn-dark select-plan">선택하기</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 rounded border" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <h4 className="mb-4">결제 정보</h4>

                <form className="p-3 mb-3 bg-light">
                    <p className="fw-bold">선택한 구독상품</p>
                    <div className="d-flex justify-content-between mb-3">
                        <span id="selected-plan">{selectedPlan}</span>
                        <div>
                            <span id="selected-price" className="fw-bold fs-5">₩{selectedPrice}</span><span style={{ fontSize: 'clamp(0.6rem, 1.0vw, 0.9rem)' }}>/월</span>
                        </div>
                    </div>

                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="termsCheck" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} required />
                        <a href="#" data-bs-toggle="modal" data-bs-target="#termsModal">이용약관</a>에 동의합니다.
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="privacyCheck" checked={privacyChecked} onChange={() => setPrivacyChecked(!privacyChecked)} required />
                        <a href="#" data-bs-toggle="modal" data-bs-target="#privacyModal">개인정보처리방침</a>에 동의합니다.
                    </div>
                </form>

                <button id="naverPayBtn" className="btn btn-success w-100" onClick={handlePayment}>네이버페이 결제</button>
            </div>
        </div>
    )
}

export default Payment