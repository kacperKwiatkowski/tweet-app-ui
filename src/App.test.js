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

    const tweets = await screen.findAllByText('m0ck')

    expect(tweets).not.toBeNull()
    expect(tweets.length).toBe(2)
});

