import {session, Telegraf} from 'telegraf'
import {Stage} from "telegraf/scenes"
import {get, set, delele} from "./services/redis.js"
import testScene from "./bot/scenes/test.js";
import wizardScene from './bot/scenes/wizard.js';

const stage = new Stage([testScene, wizardScene])

const bot = new Telegraf(process.env.BOT_TOKEN || '')

stage.start(async ctx => {
    await ctx.scene.enter('test');
})

bot.use(session( {
    store: { get, set, delete: delele }
} ))
bot.use(stage.middleware())

bot.on('text', async ctx => {
    // Тут идет обработка по умолчанию, если пользователь еще не в сцене
})

bot.launch(() => console.log('Бот запущен')).catch(err => console.error('Ошибка при запуске бота:', err))