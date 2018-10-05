import * as React from 'react'
import './Comment.css'

class Comment extends React.Component {
    render() {
        const {
            commentData: { text = '???', by = '???', kids = [] } = {},
            commentMap = {}
        } = this.props
        return (
            <div className={'comment'}>
                <span>{ by } { this.formatTimeAgo() }</span>
                <div dangerouslySetInnerHTML={{__html: text}}></div>
                <div className={'nest'}>
                    {
                        kids.map(id => (
                            <Comment key={id} commentData={commentMap[id]} commentMap={commentMap} />
                        ))
                    }
                </div>
            </div>
        )
    }

    formatTimeAgo() {
        const { commentData: { time = Date.now() / 1000 } = {} } = this.props
        const createdAt = new Date(time * 1000)
        const secondsAgo = (Date.now() - createdAt.getTime()) / 1000

        if (secondsAgo < 60) {
            return `${secondsAgo} seconds ago`
        } else if (secondsAgo < 60*60) {
            const value = Math.floor(secondsAgo / (60))
            return `${value} minute${value !== 1 ? 's' : ''} ago`
        } else if (secondsAgo < 60*60*24) {
            const value = Math.floor(secondsAgo / (60*60))
            return `${value} hour${value !== 1 ? 's' : ''} ago`
        } else {
            const value = Math.floor(secondsAgo / (60*60*24))
            return `${value} day${value !== 1 ? 's' : ''} ago`
        }
    }
}

export default Comment