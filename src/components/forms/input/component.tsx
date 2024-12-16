import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  InputAttributes?: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
};

import styles from "./input.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, InputAttributes, error }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={InputAttributes?.name}>
            <strong>{label}</strong>
          </label>
        )}
        <input
          className={styles.input}
          id={InputAttributes?.name}
          ref={ref}
          {...InputAttributes}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
