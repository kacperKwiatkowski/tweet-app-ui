import {fireEvent, render, screen} from "@testing-library/react";
import ForgotPassword from "./forgotPassword";

test('Forgot password form placeholders are not empty', async () => {
    render(<ForgotPassword />)

    const usernamePlaceholder = screen.getByPlaceholderText('Username')

    expect(usernamePlaceholder).toBeInTheDocument()
})

test('Forgot password form input event works', async () => {
    render(<ForgotPassword />)

    const username_input = await screen.getByTestId('forgot-password-username');

    fireEvent.change(username_input, {target: {value: 'testing'}})

    expect(username_input.value).toBe('testing')
})