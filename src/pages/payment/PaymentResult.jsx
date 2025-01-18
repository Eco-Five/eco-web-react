import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const PaymentResult = () => {
    // { subsPlan, subsPrice, resultCode, paymentId }
    const [ searchParams ] = useSearchParams()
    const datetime = (searchParams.get("resultCode") === 'Success') ? new Date().toISOString().split('T')[0] : null;
    
    const [ paymentResult, setPaymentResult ] = useState({
        subsPlan: searchParams.get("subsPlan"),
        subsPrice: searchParams.get("subsPrice"),
        resultCode: searchParams.get("resultCode"),
        paymentId: searchParams.get("paymentId")
    })

    const iconRander = () => {
        if(paymentResult.resultCode === "Success") {
            return <FontAwesomeIcon icon={faCheck} className="fa-2xl" style={{ margin: 'auto 30px', color: 'green' }}/>
        } else {
            return <FontAwesomeIcon icon={faXmark} className="fa-2xl" style={{ margin: 'auto 30px', color: 'red' }}/>
        }
    }
    
    return (
        <div className="mt-5" style={{ margin: 'auto', padding: '30px', maxWidth: '800px', borderRadius: '10px', boxShadow: '0px 2px 3px rgb(173, 173, 173)' }}>
            <div className="d-flex">
                {iconRander()}
                <div>
                    {paymentResult.resultCode}
                    <p className="text-muted">주문해 주셔서 감사합니다.</p>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #ddd', margin: '20px 0' }}></div>

            <h5>주문 정보</h5>
            <div className="container d-flex">
                <div style={{ width: '50%' }}>
                    <p className="mb-0 mt-3">주문번호</p>
                    <strong>{paymentResult.paymentId}</strong>
                    <p className="mb-0 mt-3">결제수단</p>
                    <strong>네이버페이</strong>
                </div>
                <div>
                    <p className="mb-0 mt-3">결제일자</p>
                    <strong>{datetime}</strong>
                    <p className="mb-0 mt-3">결제금액</p>
                    <strong>{paymentResult.subsPrice}원 (1개월)</strong>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #ddd', margin: '20px 0' }}></div>

            <h5>구독 상품</h5>
            <div className="row align-items-center">
                <div className="col-3">
                    <img src="https://via.placeholder.com/100" className="img-fluid rounded" alt="상품 이미지" />
                </div>
                <div className="col-7">
                    <p><strong>{paymentResult.subsPlan} 구독</strong></p>
                    <p className="text-muted">구독 기간: 1개월<br />월 {paymentResult.subsPrice}원</p>
                </div>
            </div>

            <div style={{ borderTop: '1px solid #ddd', margin: '20px 0' }}></div>

            <div className="d-flex justify-content-center gap-3">
                <Link to="/">
                    <button className="btn btn-outline-secondary">홈으로</button>
                </Link>
                <a href={`/api/users/payment/cancel?paymentId=${paymentResult.paymentId}&subsPrice=${paymentResult.subsPrice}&server=react`}>
                    <button className="btn btn-success">결제취소</button>
                </a>
            </div>
        </div>
    )
}

export default PaymentResult