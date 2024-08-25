import { ReactNode } from 'react';
import { MessagesState } from '../../../hooks/useLogin/types/index';

export enum InputState {
  DEFAULT = 'default',
  FOCUSED = 'focused',
  SUCCEED = 'succeed',
  ERROR = 'error',
}
export interface IInput {
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  icon?: ReactNode;
  onIconPress?: () => {};
  value: string;
  onChangeText: string;
  inputState: MessagesState;
  onFocus: (value: boolean) => void;
  testId: string;
}
