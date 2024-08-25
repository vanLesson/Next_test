'use client';
import Input from '../Input/index';
import styles from './styles/form.module.css';
import ViewPassIcon from '../../assets/ViewPassIcon';
import HidePassIcon from '../../assets/HidePassIcon';
import useLogin from '../../hooks/useLogin/useLogin';
import SignUpButton from '../SignUpButton/index';
import { LoginTestIds } from '../../hooks/useLogin/types/index';

export default function Form() {
  const {
    onTogglePassPress,
    onChangeEmail,
    fields,
    showPass,
    onChangePassword,
    getValidationClass,
    onSubmit,
    onFocus,
    getEmailFieldClass,
    getPassFieldClass,
  } = useLogin();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Sign Up</h2>
      <Input
        inputState={getEmailFieldClass()}
        value={fields.email}
        onChangeText={onChangeEmail}
        placeholder={'Email'}
        type={'email'}
        onFocus={onFocus('email')}
        testId={LoginTestIds.Email}
      />
      <Input
        onFocus={onFocus('pass')}
        value={fields.pass}
        inputState={getPassFieldClass()}
        onChangeText={onChangePassword}
        placeholder={'Create your password'}
        type={showPass ? 'text' : 'password'}
        testId={LoginTestIds.Password}
        icon={showPass ? <HidePassIcon color={'#404658'} /> : <ViewPassIcon color={'#404658'} />}
        onIconPress={onTogglePassPress}
      />
      <div className={styles.messages}>
        <p className={styles[getValidationClass(fields.passErrorSchema.length)]}>
          8 characters or more (no spaces)
        </p>
        <p className={styles[getValidationClass(fields.passErrorSchema.uppercase)]}>
          Uppercase and lowercase letters
        </p>
        <p className={styles[getValidationClass(fields.passErrorSchema.oneDigit)]}>
          At least one digit
        </p>
      </div>
      <SignUpButton
        disabled={!fields.pass.length || !fields.email.length}
        testId={LoginTestIds.Button}
        onClick={onSubmit}
        text={'Sign up'}
      />
    </div>
  );
}
