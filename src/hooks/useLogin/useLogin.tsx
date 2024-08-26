import { useState } from 'react';
import { IFields, IUseLogin, MessagesState } from './types/index';
import { InputState } from '../../components/Input/types/index';

export default function useLogin(): IUseLogin {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [fields, setFields] = useState<IFields>({
    email: '',
    pass: '',
    passErrorSchema: {
      uppercase: null,
      length: null,
      oneDigit: null,
    },
    focused: { email: false, pass: false },
    initialFocus: { email: false, pass: false },
    isEmailValid: null,
    submitted: false,
  });

  const onTogglePassPress = () => {
    setShowPass(prevState => !prevState);
  };

  const onChangePassword = e => {
    const value = e.target.value;
    const hasOneDigit = /\d/.test(value);
    const isValidLength = /^.{8,64}$/.test(value) && !/\s/.test(value);
    const isUppercase = /[A-Z]/.test(value);

    setFields(prevState => ({
      ...prevState,
      pass: value,
      passErrorSchema: {
        uppercase: isUppercase,
        length: isValidLength,
        oneDigit: hasOneDigit,
      },
    }));
  };

  const onSubmit = () => {
    const isValid = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{1,100}$').test(
      fields.email,
    );
    setFields(prevState => ({
      ...prevState,
      submitted: true,
      isEmailValid: isValid,
    }));
  };

  const onFocus = (field: 'email' | 'pass') => {
    return (value: boolean) =>
      setFields(prevState => ({
        ...prevState,
        focused: { ...prevState.focused, [field]: value },
        ...(!value ? { initialFocus: { ...prevState.initialFocus, [field]: true } } : {}),
      }));
  };

  const onChangeEmail = e => {
    const value = e.target.value;
    const isValid = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{0,100}$').test(
      fields.email,
    );
    setFields(prevState => ({
      ...prevState,
      email: value,
      ...(prevState.initialFocus.email ? { isEmailValid: isValid } : {}),
    }));
  };

  const getValidationClass = validationState => {
    if (validationState === null && !fields.initialFocus.pass) {
      return MessagesState.DEFAULT;
    } else if (validationState) {
      return MessagesState.SUCCEED;
    } else if (!validationState && fields.initialFocus.pass) {
      return MessagesState.ERROR;
    }
  };

  const getEmailFieldClass = () => {
    if (fields.isEmailValid && fields.initialFocus.email) {
      return InputState.SUCCEED;
    }

    if (!fields.isEmailValid && fields.initialFocus.email) {
      return InputState.ERROR;
    }
    if (fields.focused.email) {
      return InputState.FOCUSED;
    }
    if (!fields.focused.email) {
      return InputState.DEFAULT;
    }
  };

  const getPassFieldClass = () => {
    if (
      fields.passErrorSchema.length &&
      fields.passErrorSchema.oneDigit &&
      fields.passErrorSchema.uppercase &&
      fields.initialFocus.pass
    ) {
      return InputState.SUCCEED;
    }
    if (
      (!fields.passErrorSchema.length ||
        !fields.passErrorSchema.oneDigit ||
        !fields.passErrorSchema.uppercase) &&
      fields.initialFocus.pass
    ) {
      return InputState.ERROR;
    }
    if (fields.focused.pass) {
      return InputState.FOCUSED;
    }
    if (!fields.focused.pass) {
      return InputState.DEFAULT;
    }
  };

  return {
    onChangePassword,
    onTogglePassPress,
    showPass,
    fields,
    onChangeEmail,
    getValidationClass,
    onSubmit,
    onFocus,
    getEmailFieldClass,
    getPassFieldClass,
  };
}
