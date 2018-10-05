const FETCH = Symbol('FETCH')
class HackerNews {
    constructor(fetch = (...args) => window.fetch(...args)) {
        this[FETCH] = fetch
    }

    getStories(type) {
        return this[FETCH](`https://hacker-news.firebaseio.com/v0/${type}stories.json`)
            .then(response => response.json())
    }

    getItem(id) {
        return this[FETCH](`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(response => response.json())
    }
}

export default HackerNews