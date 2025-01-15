import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '/src/assets/css/find/Find.css';


const AccountRecovery = () => {
    const [findIdForm, setFindIdForm] = useState({ name: "", phone: "" });
    const [resetPwdForm, setResetPwdForm] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [foundId, setFoundId] = useState(null);
    const [resultMessage, setResultMessage] = useState("");
    const navigate = useNavigate();

    const handleFindIdSubmit = async (e) => {
        e.preventDefault();
        const { name, phone } = findIdForm;

        try {
            const response = await fetch("/api/findEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone }),
            });
            const data = await response.json();

            if (data.result && data.result.length > 0) {
                setFoundId(data.result[0].email);
                setResultMessage("success");
            } else {
                setFoundId("회원 정보가 없습니다.");
                setResultMessage("error");
            }
        } catch (error) {
            console.error("아이디 찾기 오류:", error);
            setFoundId("오류가 발생했습니다. 다시 시도해주세요.");
            setResultMessage("error");
        }
    };

    const handleResetPwdSubmit = async (e) => {
        e.preventDefault();
        const { email, name, phone, password, confirmPassword } = resetPwdForm;

        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await fetch("/api/resetPwd", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, pwd: password, name, phone }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "비밀번호 재설정에 성공했습니다.");
                navigate("/login");
            } else {
                alert(data.message || "비밀번호 재설정에 실패했습니다.");
            }
        } catch (error) {
            console.error("비밀번호 재설정 오류:", error);
            alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };



    // =========================================UI=========================================//
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center h-100">
            <div className="mb-4">
                <div className="logo">
                    <img src="/images/anyone/eco-mascot.png" alt="마스코트" style={{ width: "100px", height: "100px" }} />
                </div>
            </div>
            <h1 className="h4 mb-4">계정 찾기</h1>
            <div className="custom-card text-center">
                <ul className="nav nav-tabs justify-content-center mb-4" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="findId-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#findId"
                            type="button"
                            role="tab"
                            aria-controls="findId"
                            aria-selected="true"
                        >
                            아이디 찾기
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="reset-password-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#resetPwd"
                            type="button"
                            role="tab"
                            aria-controls="resetPwd"
                            aria-selected="false"
                        >
                            비밀번호 재설정
                        </button>
                    </li>
                </ul>

                <div className="tab-content">
                    {/* 아이디 찾기 */}
                    <div className="tab-pane fade show active" id="findId" role="tabpanel" aria-labelledby="findId-tab">
                        <form onSubmit={handleFindIdSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="d-flex me-3 mb-2">
                                    이름
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control flex-grow-1"
                                    placeholder="👤 이름을 입력하세요"
                                    required
                                    value={findIdForm.name}
                                    onChange={(e) => setFindIdForm({ ...findIdForm, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="d-flex me-3 mb-2">
                                    전화번호
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-control flex-grow-1"
                                    placeholder="☎ 전화번호를 입력하세요"
                                    required
                                    value={findIdForm.phone}
                                    onChange={(e) => setFindIdForm({ ...findIdForm, phone: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-dark w-100 mb-2">
                                아이디 찾기
                            </button>
                        </form>
                        {foundId && (
                            <div className={`mt-3 text-center text-${resultMessage === "success" ? "success" : "danger"}`}>
                                <p className="result-box">찾은 아이디: <strong>{foundId}</strong></p>
                            </div>
                        )}
                    </div>

                    {/* 비밀번호 재설정 */}
                    <div className="tab-pane fade" id="resetPwd" role="tabpanel" aria-labelledby="resetPwd-tab">
                        <form onSubmit={handleResetPwdSubmit}>
                            <div className="mb-3">
                                <label htmlFor="reEmail" className="d-flex me-3 mb-2">
                                    이메일
                                </label>
                                <input
                                    type="text"
                                    id="reEmail"
                                    className="form-control flex-grow-1"
                                    placeholder="✉ 이메일을 입력하세요"
                                    required
                                    value={resetPwdForm.email}
                                    onChange={(e) => setResetPwdForm({ ...resetPwdForm, email: e.target.value })}
                                />
                            </div>
                            {/* 추가 입력 필드 반복 */}
                            {/* 비밀번호 재입력 필드 */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountRecovery;