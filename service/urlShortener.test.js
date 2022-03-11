import UrlShortener from '../models/urlShortener.js'
import UrlShortenerService from './urlShortener.js'

describe("Url Shortener Service", ()=>{
    const inputUrl = {
        shortUrl :'tuutut',
        
    }
    test('should return an array of shortUrls', async()=>{
        const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);

        const result = await urlShortenerServiceInstance.getShortUrl(inputUrl);
        toEqual({
            id: expect.any(String)
          });
    })
});