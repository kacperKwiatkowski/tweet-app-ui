import {fireEvent, render, screen} from "@testing-library/react";
import NewTweet from "./newTweet";
import {MOCK_USER} from "../../mocks/handlers";

test('New tweet form placeholders are not empty', async () => {
    render(<NewTweet loggedUserData={MOCK_USER}/>)

    const titlePlaceholder = screen.getByTestId('new-tweet-title')
    const messagePlaceholder = screen.getByTestId('new-tweet-message')

    expect(titlePlaceholder).toBeInTheDocument()
    expect(messagePlaceholder).toBeInTheDocument()
})

test('New tweet form input event works', async () => {
    render(<NewTweet loggedUserData={MOCK_USER} />)

    const title_input = await screen.getByTestId('new-tweet-title');
    const message_input = await screen.getByTestId('new-tweet-message');

    fireEvent.change(title_input, {target: {value: 'testing'}})
    fireEvent.change(message_input, {target: {value: 'testing'}})

    expect(title_input.value).toBe('testing')
    expect(message_input.value).toBe('testing')
})