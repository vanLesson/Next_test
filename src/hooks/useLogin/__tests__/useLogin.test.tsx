import { renderHook, act } from '@testing-library/react-hooks';
import useLogin from '../useLogin';
import { waitFor } from '@testing-library/dom';

describe('useLogin Hook', () => {
  it('should update email on change', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onChangeEmail({ target: { value: 'test@example.com' } });
    });

    expect(result.current.fields.email).toBe('test@example.com');
  });

  it('should update password on change and validate', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onChangePassword({ target: { value: 'Password123' } });
    });

    expect(result.current.fields.pass).toBe('Password123');
    expect(result.current.fields.passErrorSchema.length).toBe(true);
    expect(result.current.fields.passErrorSchema.oneDigit).toBe(true);
  });

  it('should toggle password visibility', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onTogglePassPress();
    });

    expect(result.current.showPass).toBe(true);

    act(() => {
      result.current.onTogglePassPress();
    });

    expect(result.current.showPass).toBe(false);
  });

  it('should validate email and password on submit', async () => {
    const { result } = renderHook(() => useLogin());
    act(() => {
      result.current.onChangeEmail({ target: { value: 'test@example.com' } });
      result.current.onChangePassword({ target: { value: 'Password123' } });
    });
    act(() => {
      result.current.onSubmit();
    });
    await waitFor(() => {
      expect(result.current.fields.isEmailValid).toBe(true);
      expect(result.current.fields.passErrorSchema.uppercase).toBe(true);
    });
  });

  it('should return correct validation class', () => {
    const { result } = renderHook(() => useLogin());
    result.current.fields.initialFocus.pass = true;
    expect(result.current.getValidationClass(true)).toBe('succeed');
    expect(result.current.getValidationClass(false)).toBe('error');
  });
  it('should return correct validation class if focussed', () => {
    const { result } = renderHook(() => useLogin());
    result.current.fields.initialFocus.pass = false;
    expect(result.current.getValidationClass(true)).toBe('succeed');
    expect(result.current.getValidationClass(null)).toBe('default');
  });

  it('should return correct email field class', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onFocus('email')(true);
    });

    expect(result.current.getEmailFieldClass()).toBe('focused');
  });

  it('should return correct password field class', async () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.onChangePassword({ target: { value: 'Password123' } });
    });
    act(() => {
      result.current.onSubmit();
    });
    await waitFor(() => {
      expect(result.current.getPassFieldClass()).toBe('default');
    });
  });
});
