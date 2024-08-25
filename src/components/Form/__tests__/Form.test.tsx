import { fireEvent, render, screen } from '@testing-library/react';
import Form from '../index';
import useLogin from '../../../hooks/useLogin/useLogin';
import { LoginTestIds } from '../../../hooks/useLogin/types/index';

jest.mock('../../../hooks/useLogin/useLogin');

const defaultState = {
  onTogglePassPress: jest.fn(),
  onChangeEmail: jest.fn(),
  fields: {
    email: '',
    pass: '',
    passErrorSchema: {
      uppercase: null,
      length: null,
      oneDigit: null,
    },
  },
  showPass: false,
  onChangePassword: jest.fn(),
  getValidationClass: jest.fn().mockReturnValue('default'),
  onSubmit: jest.fn(),
  onFocus: jest.fn(),
  getEmailFieldClass: jest.fn().mockReturnValue('default'),
  getPassFieldClass: jest.fn().mockReturnValue('default'),
};
describe('Form Component', () => {
  useLogin.mockReturnValue(defaultState);

  it('renders the form correctly', () => {
    render(<Form />);
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Create your password')).toBeInTheDocument();
  });

  it('calls onChangeEmail when email input changes', () => {
    const { onChangeEmail } = useLogin();
    render(<Form />);
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(onChangeEmail).toHaveBeenCalled();
  });

  it('calls onChangePassword when password input changes', () => {
    const { onChangePassword } = useLogin();
    render(<Form />);
    const passwordInput = screen.getByPlaceholderText('Create your password');
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    expect(onChangePassword).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    const { onTogglePassPress } = useLogin();
    render(<Form />);
    const toggleButton = screen.getByTestId(`${LoginTestIds.Password}_Icon`);
    fireEvent.click(toggleButton);
    expect(onTogglePassPress).toHaveBeenCalled();
  });
});
