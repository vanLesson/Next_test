import styles from './styles/signUpButton.module.css';
interface ISignUpButton {
  text: string;
  onClick: () => void;
  testId: string;
  disabled: boolean;
}
export default function SignUpButton({ text, onClick, testId, disabled }: ISignUpButton) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${disabled && styles.disabled}`}
      data-testid={testId}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
