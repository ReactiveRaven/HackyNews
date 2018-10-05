import HackerNews from "./HackerNews";
import * as Sinon from 'sinon'

describe('HackerNews', () => {
    describe('getStories', () => {
        let fakeJsonResult
        let fetchSpy
        let instance

        beforeEach(() => {
            fakeJsonResult = {}
            fetchSpy = Sinon.spy(() =>
                Promise.resolve({ json: () => Promise.resolve(fakeJsonResult) })
            )
            instance = new HackerNews(fetchSpy)
        })

        it('should be a function', () => {
            expect(instance.getStories).toBeInstanceOf(Function)
        })

        it('should fetch the requested story type', async () => {
            const result = instance.getStories('foo')

            expect(fetchSpy.args).toEqual([
                [
                    'https://hacker-news.firebaseio.com/v0/foostories.json'
                ]
            ])

            expect(await result).toBe(fakeJsonResult)
        })
    })

    describe('getItem', () => {
        let fakeJsonResult
        let fetchSpy
        let instance

        beforeEach(() => {
            fakeJsonResult = {}
            fetchSpy = Sinon.spy(() =>
                Promise.resolve({ json: () => Promise.resolve(fakeJsonResult) })
            )
            instance = new HackerNews(fetchSpy)
        })

        it('should be a function', () => {
            expect(instance.getItem).toBeInstanceOf(Function)
        })

        it('should fetch the requested story type', async () => {
            const result = instance.getItem('foo')

            expect(fetchSpy.args).toEqual([
                [
                    'https://hacker-news.firebaseio.com/v0/item/foo.json'
                ]
            ])

            expect(await result).toBe(fakeJsonResult)
        })
    })
});