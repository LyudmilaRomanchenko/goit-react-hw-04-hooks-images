import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

function Modal({ largeImg, onClick }) {
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      console.log("Нажали Escape");

      onClick();
    }
  };

  const handleBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      console.log("Нажали Backdrop");

      onClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
  }, []);

  window.removeEventListener("keydown", handleKeyDown);

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdrop}>
      <div className={s.Modal}>
        <img src={largeImg} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.prototype = {
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
