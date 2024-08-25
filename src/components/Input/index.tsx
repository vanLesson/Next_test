'use client';
import styles from './styles/input.module.css';
import { IInput } from './types/index';

export default function Input({
  placeholder,
  type,
  icon,
  value,
  onIconPress,
  onChangeText,
  onFocus,
  inputState,
  testId,
}: IInput) {
  return (
    <div
      data-testid={`${testId}_Wrapper`}
      className={`${styles.inputWrapper_default} ${styles[inputState]} `}
    >
      <input
        data-testid={testId}
        value={value}
        onChange={onChangeText}
        className={styles.input}
        type={type}
        onFocus={() => {
          onFocus?.(true);
        }}
        onBlur={() => {
          onFocus?.(false);
        }}
        placeholder={placeholder}
      />

      {!!icon && (
        <div className={styles.iconWrapper} onClick={onIconPress} data-testid={`${testId}_Icon`}>
          {icon}
        </div>
      )}
    </div>
  );
}
