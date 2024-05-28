import { TweetRepository }  from '../reporsitory/tweet-repository.js';
import HashtagsRepository from "../reporsitory/hashtag-repository.js";

export class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagsRepository();
    }

    async create(data) {
        console.log(data)
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
            .map(tag => tag.substr(1))
            .map(tag => tag.toLowerCase());

        const tweet = await this.tweetRepository.create(data);
        const alreadyPresentTags = await this.hashtagRepository.findByName(tags);

        if (alreadyPresentTags.length > 0) {
            const titleOfAlreadyPresentTags = alreadyPresentTags.map(tag => tag.title);
            const newTags = tags.filter(tag => !titleOfAlreadyPresentTags.includes(tag));

            if (newTags.length > 0) {
                const createdTags = await this.hashtagRepository.bulkcreate(newTags.map(tagTitle => ({
                    title: tagTitle,
                    tweets: [tweet._id]
                })));

                alreadyPresentTags.push(...createdTags);
            }

            tweet.hashtags = alreadyPresentTags.map(tag => tag._id);
            await tweet.save();

            await Promise.all(alreadyPresentTags.map(async tag => {
                tag.tweets.push(tweet._id);
                await tag.save();
            }));
        } else {
            const newTags = tags.map(tagTitle => ({
                title: tagTitle,
                tweets: [tweet._id]
            }));
            const createdTags = await this.hashtagRepository.bulkcreate(newTags);

            tweet.hashtags = createdTags.map(tag => tag._id);
            await tweet.save();
        }
        return tweet;
    }
}
