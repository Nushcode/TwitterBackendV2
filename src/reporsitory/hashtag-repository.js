import Hashtags from '../model/hashtags.js';

class HashtagsRepository {
    async get(id) {
        try {
            return await Hashtags.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            return await Hashtags.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async create(data) {
        try {
            const hashtag = await Hashtags.create(data);
            console.log('==>', hashtag);
            return;
        } catch (error) {
            console.log(error);
        }
    }

    async bulkcreate(data) {
        try {
            return await Hashtags.insertMany(data);
        } catch(error) {
            console.log(error);
        }
    }

    async findByName(titleList) {
        try {
            const tags = await Hashtags.find({
                title: titleList
            });
            return tags;
        } catch(error) {
            console.log(error);
        }
    }
}

export default HashtagsRepository;
