import React from "react";
import "../css/ButtonGroup.css";

const ButtonGroup = ({ onClickLeftBtn, onClickMiddleBtn, onClickRightBtn }) => {
    return (
        <div className="btn-group btn-group-lg" role="group" id="button-group">
            <button type="button" className="view-btn btn" onClick={onClickLeftBtn}>
                <svg
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 16 16"
                    className="bi bi-caret-left-fill"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
            </button>
            <button type="button" className="view-btn btn" onClick={onClickMiddleBtn}>
                <svg
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 16 16"
                    className="bi bi-align-center"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8 1a.5.5 0 0 1 .5.5V6h-1V1.5A.5.5 0 0 1 8 1zm0 14a.5.5 0 0 1-.5-.5V10h1v4.5a.5.5 0 0 1-.5.5zM2 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7z" />
                </svg>
            </button>
            <button type="button" className="view-btn btn" onClick={onClickRightBtn}>
                <svg
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 16 16"
                    className="bi bi-caret-right-fill"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </button>
        </div>
    );
};

export default ButtonGroup;
