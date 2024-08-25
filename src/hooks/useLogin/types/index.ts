import { InputState } from '../../../components/Input/types/index';

export interface IFields {
  email: string;
  pass: string;
  passErrorSchema: {
    uppercase: boolean | null;
    length: boolean | null;
    oneDigit: boolean | null;
  };
  focused: { email: boolean; pass: boolean };
  isEmailValid: boolean | null;
  submitted: boolean;
}

export enum MessagesState {
  DEFAULT = 'default',
  SUCCEED = 'succeed',
  ERROR = 'error',
}

export interface IUseLogin {
  onChangePassword: (text: string) => void;
  onTogglePassPress: () => void;
  showPass: boolean;
  fields: IFields;
  onChangeEmail: (text: string) => void;
  getValidationClass: (validationState: boolean | null) => MessagesState;
  onSubmit: () => void;
  onFocus: (field: 'email' | 'pass') => (value: boolean) => void;
  getEmailFieldClass: () => InputState;
  getPassFieldClass: () => InputState;
}

export enum LoginTestIds {
  Email = 'Email',
  Password = 'Password',
  Button = 'Button',
}
