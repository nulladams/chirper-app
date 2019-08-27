import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { 
    TiArrowBackOutline,
    TiHeartOutline,
    TiHeartFullOutline
} from 'react-icons/ti'


class Tweet extends Component {
    handleLike = (e) => {
        e.preventDefault()
    }
    toParent = (e, id) => {
        e.preventDefault()
    }
    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return <p>This tweet doesn't exist.</p>
        }

        const {
            name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet

        return (
            <div className='tweet'>
                <img 
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <span>{name}</span>
                    <div>{formatDate(timestamp)}</div>
                    {parent && (
                        <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                    )}
                    <p>{text}</p>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true
                                ? <TiHeartFullOutline className='tweet-icon' color='#e0245e' />
                                : <TiHeartOutline className='tweet-icon' />
                            }
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id]
    const author = users[tweet.author]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null

    return {
        authedUser,
        tweet: tweet 
                ? formatTweet(tweet, author, authedUser, parentTweet)
                : null
    }

}

export default connect(mapStateToProps)(Tweet)