const Youtube = require('youtube-node');
const config = require('./yt-config.json');

const youtube = new Youtube();
youtube.setKey(config.key);

function searchVideoURL(message, queryText){
    return new Promise((resolve, reject)=>{
        youtube.search(`cardapio do dia ${queryText}`,2,(error,result)=>{
            if(!error){
                const videoIds = result.items.map((item)=>item.id.videoId).filter(item=>item);
                const youtubeLinks = videoIds.map(videoId =>`https://www.youtube.com/watch?=${videoId}`);
                resolve(`${message} ${youtubeLinks.join(`,`)}`);
            }else{
                reject('Deu erro')
            }
            
        });
    })
};

module.exports.searchVideoURL = searchVideoURL;

