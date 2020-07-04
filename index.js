const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = 'here token telegram';

const bot = new TelegramBot(token, {polling:true});

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

bot.on('message',async(msg)=>{
    const chatId = msg.chat.id;
    console.log(msg.chat.id);
    const dfResponse = await dialogflow.sendMessage(chatId.toString(),msg.text);

    let responseText = dfResponse.text;
    if(dfResponse.intent ==='cardapio do dia'){
        responseText = await youtube.searchVideoURL(responseText,dfResponse.fields.comida.stringValue)
    }

    bot.sendMessage(chatId,responseText);
});