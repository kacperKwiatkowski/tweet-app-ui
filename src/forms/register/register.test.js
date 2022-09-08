import {fireEvent, render, screen} from "@testing-library/react";
import Register from "./register";
import userEvent from "@testing-library/user-event";

test('Register form placeholders are not empty', async () => {
    render(<Register />)

    const username_input = screen.getByPlaceholderText('Username')
    const email_input = screen.getByPlaceholderText('Email')
    const firstName_input = screen.getByPlaceholderText('First name')
    const lastName_input = screen.getByPlaceholderText('Last name')
    const contactNumber_input = screen.getByPlaceholderText('Contact number')
    const avatar_input = screen.getByPlaceholderText('avatar')
    const password_input = screen.getByPlaceholderText('Password')
    const passwordConfirm_input = screen.getByPlaceholderText('Confirm password')

    expect(username_input).toBeInTheDocument()
    expect(email_input).toBeInTheDocument()
    expect(firstName_input).toBeInTheDocument()
    expect(lastName_input).toBeInTheDocument()
    expect(contactNumber_input).toBeInTheDocument()
    expect(avatar_input).toBeInTheDocument()
    expect(password_input).toBeInTheDocument()
    expect(passwordConfirm_input).toBeInTheDocument()
})

test('Register form input event works', async () => {
    render(<Register />)
    const testFile = new File(["hello"], "hello.png", { type: "image/png" });

    const username_input = screen.getByTestId('username-register')
    const email_input = screen.getByTestId('email-register')
    const firstName_input = screen.getByTestId('firstName-register')
    const lastName_input = screen.getByTestId('lastName-register')
    const contactNumber_input = screen.getByTestId('contactNumber-register')
    const avatar_input = screen.getByTestId('avatar-register')
    const password_input = screen.getByTestId('password-register')
    const passwordConfirm_input = screen.getByTestId('passwordConfirm-register')

    fireEvent.change(username_input, {target: {value: 'testing'}})
    fireEvent.change(email_input, {target: {value: 'testing'}})
    fireEvent.change(firstName_input, {target: {value: 'testing'}})
    fireEvent.change(lastName_input, {target: {value: 'testing'}})
    fireEvent.change(contactNumber_input, {target: {value: 'testing'}})
    userEvent.upload(avatar_input, testFile)
    fireEvent.change(password_input, {target: {value: 'testing'}})
    fireEvent.change(passwordConfirm_input, {target: {value: 'testing'}})

    expect(username_input.value).toBe('testing')
    expect(email_input.value).toBe('testing')
    expect(firstName_input.value).toBe('testing')
    expect(lastName_input.value).toBe('testing')
    expect(contactNumber_input.value).toBe('testing')
    expect(avatar_input.files[0]).toBe(testFile);
    expect(avatar_input.files.item(0)).toBe(testFile);
    expect(avatar_input.files.length).toBe(1);    expect(password_input.value).toBe('testing')
    expect(passwordConfirm_input.value).toBe('testing')
})

