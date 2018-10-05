import React, { Component } from 'react';
import './App.css';
import Story from '../Story/Story';
import HackerNews from "../../service/HackerNews/HackerNews";
import Comment from "../Comment/Comment";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storyType: 'top',
            loadingStories: false,
            stories: [],
            selectedStory: undefined,
            comments: {}
        };

        this.hackerNews = new HackerNews()
    }

    componentDidMount() {
        this.handleRefreshStories()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.storyType !== this.state.storyType) {
            this.handleRefreshStories()
        }
    }

    render() {
        const {
            stories,
            storyType,
            loadingStories,
            loadingComments,
            selectedStory,
        } = this.state;

        const storiesToDisplay = stories.filter(story => selectedStory === undefined || story.id === selectedStory.id)
        const topLevelComments = (selectedStory || {}).kids || []

        return (
            <div className="App">
                <header className="App-header">
                    <h1 onClick={this.onSelectStoryType('top')}>Hacky News</h1>
                    <ul>
                        {
                            ['top', 'show', 'ask', 'job']
                                .map(type => (
                                    <li
                                        key={type}
                                        onClick={this.onSelectStoryType(type)}
                                        className={storyType === type && selectedStory === undefined ? 'active' : undefined}
                                    >
                                        {type}
                                    </li>
                                ))
                        }
                    </ul>
                </header>
                {
                    storiesToDisplay.map(story => (
                        <Story key={story.id} storyData={story} onClick={this.onSelectStory(story)} />
                    ))
                }
                { (loadingStories || loadingComments) &&
                    <span className="loading">Loading...</span>
                }
                {
                    topLevelComments
                        .map(id => this.state.comments[id])
                        .map(comment => (
                            <Comment commentData={comment} commentMap={this.state.comments} />
                        ))
                }
            </div>
        );
    }

    onSelectStoryType = (type) => () => this.setState({storyType: type, selectedStory: undefined})

    onSelectStory = (story) => () => {
        this.setState({
            selectedStory: story,
        })
        this.recursivelyLoadComments(story.kids)
    };

    handleRefreshStories() {
        this.setState({ stories: [], loadingStories: true })
        this.hackerNews.getStories(this.state.storyType)
            .then(stories =>
                Promise.all(
                    stories.slice(0, 30)
                        .map(storyId => this.hackerNews.getItem(storyId))
                )
            )
            .then(stories => this.setState({ stories, loadingStories: false }))
    }

    recursivelyLoadComments(ids) {
        if (ids.length === 0) {
            this.setState({ loadingComments: false })
            return
        }

        this.setState({ loadingComments: true })
        Promise.all(
            ids.map(id => this.hackerNews.getItem(id))
        )
            .then(comments => comments.filter(comment => !!comment))
            .then(comments => {
                this.setState(oldState => {
                    const commentsMapClone = { ...oldState.comments }
                    comments.forEach(comment => commentsMapClone[comment.id] = comment)
                    return { comments: commentsMapClone }
                })

                this.recursivelyLoadComments(
                    comments.map(comment => comment.kids || []).reduce((a, b) => a.concat(b), [])
                )
            })
    }
}

export default App;
