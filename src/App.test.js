import {act, render, screen, waitFor} from "@testing-library/react";
import {rest} from "msw";
import {server} from "./mocks/server";

import App from "./App";

test('Header elements are present', async () => {
    await act(() => {
        render(<App/>)
    })

    const logo = screen.getByText('TWEET')
    const logOutLink = screen.getByText('Log out')

    expect(logo).toBeInTheDocument()
    expect(logOutLink).toBeInTheDocument()
});

// test('Spinner is initially present', async () => {
//     await act(() => {
//         render(<App/>)
//     })
//
//     const spinner = screen.findByRole('Spinner')
//
//     expect(spinner).not.toBeNull()
// });

test('New tweet form is present', async () => {
    await act(() => {
        render(<App/>)
    })

    const newTweetForm = screen.findByText('Post a tweet')

    expect(newTweetForm).not.toBeNull()
});

test('Fetched tweets are present', async () => {
    await act(() => {
        render(<App/>)
    })

    const tweets = await screen.findAllByText('MockID')

    expect(tweets).not.toBeNull()
    expect(tweets.length).toBe(2)
});

test('Failed fetching logged user will render login form', async () => {
    server.resetHandlers(
        rest.get("http://localhost:8080/api/v.1.0/tweets/logged", (req, res, ctx) => (
                res(ctx.status(400))
            )
        ),

        rest.get('http://localhost:8080/api/v.1.0/tweets/all', (req, res, ctx) => {
            return res(
                ctx.status(403))
        }),
    )

    await act(() => {
        render(<App/>)
    })

    await waitFor( async () => {
        const loginForm = await screen.findByText("Login")
        const registerForm = await screen.findByText("Register")
        const forgotPasswordForm = await screen.findByText("Forgot password")
        expect(loginForm).toBeInTheDocument()
        expect(registerForm).toBeInTheDocument()
        expect(forgotPasswordForm).toBeInTheDocument()
    });
});