import * as React from 'react'
import './Story.css'

class Story extends React.Component {
    render() {
        const { storyData: { title = '???', score = -1, by = '???', descendants = -1 } = {} } = this.props
        return (
            <div className={'story'} onClick={this.props.onClick}>
                <h2>{ title }</h2>
                <span>{ score } points by { by } { this.formatTimeAgo() } | { descendants } comments</span>
            </div>
        )
    }

    formatTimeAgo() {
        const { storyData: { time = Date.now() / 1000 } = {} } = this.props
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

export default Story