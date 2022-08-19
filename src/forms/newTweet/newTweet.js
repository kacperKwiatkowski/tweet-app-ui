import '../tweet-style.scss'

import  React, { useState , useEffect } from 'react'

const NewTweet = () => {

    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 100000 )
        return function cleanup() {
            clearInterval(timer)
        }

    });

    return (
        <div>
            <form>
                <div class="newTweetUserDetails">
                    <img class="newTweetAvatar" src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"></img>
                    <div class="newTweetUserDetail" >H4NN!BAL</div>
                    <div class="newTweetUserDetail" >Hannibal Barca</div>
                    <div class="newTweetUserDetail currentTime" >{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
                </div>
                <div class="newTweetFormWrapper">
                    <input class="newTweetInput title" type="" name="title" placeholder="Title"/>
                    <input class="newTweetInput message" type="text" name="message" placeholder="Message"/>
                </div>
            </form>

        </div>
    )
}

export default NewTweet