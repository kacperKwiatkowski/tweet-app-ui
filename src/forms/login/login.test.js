import {fireEvent, render, screen} from "@testing-library/react";
import Login from "./login";
import userEvent from "@testing-library/user-event";

test('Login form placeholders are not empty', async () => {
    render(<Login />)

    const usernamePlaceholder = screen.getByPlaceholderText('Username')
    const passwordPlaceholder = screen.getByPlaceholderText('Password')

    expect(usernamePlaceholder).toBeInTheDocument()
    expect(passwordPlaceholder).toBeInTheDocument()
})

test('Login form input event works', async () => {
    render(<Login />)

    const username_input = await screen.getByTestId('login-username');
    const password_input = await screen.getByTestId('login-password');

    fireEvent.change(username_input, {target: {value: 'testing'}})
    fireEvent.change(password_input, {target: {value: 'testing'}})

    expect(password_input.value).toBe('testing')
})