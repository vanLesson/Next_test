import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../index';
import React from 'react';

describe('Input Component', () => {
  const placeholderText = 'Enter text';
  const testValue = 'Test value';
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnIconPress = jest.fn();
  const testId = 'inputTestId';

  it('renders the input with placeholder', () => {
    render(
      <Input
        placeholder={placeholderText}
        type="text"
        value=""
        onChangeText={mockOnChangeText}
        inputState="default"
        testId={testId}
      />,
    );

    const inputElement = screen.getByTestId(testId);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', placeholderText);
  });

  it('renders the input with the correct value', () => {
    render(
      <Input
        placeholder={placeholderText}
        type="text"
        value={testValue}
        onChangeText={mockOnChangeText}
        inputState="default"
        testId={testId}
      />,
    );

    const inputElement = screen.getByTestId(testId);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(testValue);
  });

  it('calls onChangeText when input value changes', () => {
    render(
      <Input
        placeholder={placeholderText}
        type="text"
        value=""
        onChangeText={mockOnChangeText}
        inputState="default"
        testId={testId}
      />,
    );

    const inputElement = screen.getByTestId(testId);
    fireEvent.change(inputElement, { target: { value: testValue } });

    expect(mockOnChangeText).toHaveBeenCalled();
  });

  it('calls onFocus when input is focused', () => {
    render(
      <Input
        placeholder={placeholderText}
        type="text"
        value=""
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
        inputState="default"
        testId={testId}
      />,
    );

    const inputElement = screen.getByTestId(testId);
    fireEvent.focus(inputElement);

    expect(mockOnFocus).toHaveBeenCalledWith(true);

    fireEvent.blur(inputElement);

    expect(mockOnFocus).toHaveBeenCalledWith(false);
  });

  it('renders icon and calls onIconPress when icon is clicked', () => {
    const icon = <span>Icon</span>;

    render(
      <Input
        placeholder={placeholderText}
        type="text"
        value=""
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
        onIconPress={mockOnIconPress}
        icon={icon}
        inputState="default"
        testId={testId}
      />,
    );

    const iconElement = screen.getByTestId(`${testId}_Icon`);
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveTextContent('Icon');

    fireEvent.click(iconElement);

    expect(mockOnIconPress).toHaveBeenCalled();
  });

  it('applies the correct input state class', () => {
    render(
      <Input
        placeholder={placeholderText}
        type="text"
        value=""
        onChangeText={mockOnChangeText}
        inputState="focused"
        testId={testId}
      />,
    );

    const wrapperElement = screen.getByTestId(`${testId}_Wrapper`);
    expect(wrapperElement).toHaveClass('inputWrapper_default');
    expect(wrapperElement).toHaveClass('focused');
  });
});
