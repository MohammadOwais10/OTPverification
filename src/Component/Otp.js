import React, { useState, useEffect } from "react";
import "./Otp.css";

function Otp() {
  const [showPopup, setShowPopup] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [inputRefs, setInputRefs] = useState(Array(6).fill(null));

  useEffect(() => {
    if (showPopup) {
      inputRefs[0].focus();
    }
  }, [showPopup, inputRefs]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "") {
      if (index === inputRefs.length - 1) {
        inputRefs[index].blur();
      } else {
        inputRefs[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    const newOtp = Array(6).fill("");
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    inputRefs[0].focus();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setOtp(Array(6).fill(""));
  };

  const handleVerify = () => {
    alert("OTP verified successfully!");
  };

  const changeNumber = () => {
    setOtp(Array(6).fill(""));
    setShowPopup(false);
  };

  const reSendOTP = () => {
    alert("OTP send on your phone!");
    setOtp(Array(6).fill(""));
  };

  const isVerifyDisabled = otp.some((value) => value === "");

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < inputRefs.length; i++) {
      inputs.push(
        <input
          key={i}
          ref={(ref) => (inputRefs[i] = ref)}
          type="text"
          maxLength={1}
          value={otp[i]}
          onChange={(e) => handleInputChange(e, i)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && otp[i] === "" && i !== 0) {
              inputRefs[i - 1].focus();
            }
            if (e.key === "ArrowLeft" && i !== 0) {
              inputRefs[i - 1].focus();
            }
            if (e.key === "ArrowRight" && i !== inputRefs.length - 1) {
              inputRefs[i + 1].focus();
            }
          }}
        />
      );
    }
    return inputs;
  };

  return (
    <div className="otp">
      <button className="btn-main" onClick={() => setShowPopup(true)}>
        Verify Number
      </button>
      {showPopup && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="heading">
              <h2>Phone Verification </h2>
            </div>

            <div className="content">
              <p>Enter the OTP you received on your phone.</p>
              <div className="otp-inputs" onPaste={handlePaste}>
                {renderInputs()}
              </div>

              <div className="btn-divder">
                <h6 onClick={changeNumber}>Change Number</h6>
                <h6 onClick={reSendOTP}>Re-send OTP</h6>
              </div>
              <button
                disabled={isVerifyDisabled}
                className="btn"
                onClick={handleVerify}
              >
                Verify Phone Number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Otp;
