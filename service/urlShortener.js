class UrlShortenerService {
    constructor(urlShortenerModel){
        this.urlShortenerModel = urlShortenerModel;
    }

    async getShortUrls(findIds){
        const shortUrls = await this.urlShortenerModel.find(findIds);

        return shortUrls;
    }

    async getShortUrl(findId){
        const shortUrl = await this.urlShortenerModel.findOne(findId)

        return shortUrl;
    }
    async createShortUrl(createShortUrl) {
        const createdUrl = await this.urlShortenerModel.create(createShortUrl);

        return createdUrl;
    }

    async getShortUrlAndDelete(deleteShortUrl){
        const deleteUrl = await this.urlShortenerModel.findOneAndDelete(deleteShortUrl);

        return deleteUrl;
    }

    async getShortUrlAndUpdate(query, updateShortUrl){
         const updatedShortUrl = await this.urlShortenerModel.findOneAndUpdate(query, updateShortUrl);

        return updatedShortUrl;
    }
}

export default UrlShortenerService;