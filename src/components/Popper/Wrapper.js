import React from "react";
import classNames from "classnames/bind";
import styles from "./Popper.module.scss";

function Wrapper({ children, edit, header }) {
  const cx = classNames.bind(styles);

  const wrapperClass = cx({
    wrapper: true,
    edit: edit,
    header: header
  });

  return (
    <div className={wrapperClass}>
      <div className={cx("content")}>
        {children}
      </div>
    </div>
  );
}

export default Wrapper;




