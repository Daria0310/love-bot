import {session, Telegraf} from 'telegraf'
import CatchBot from "./bot/catch.js"
import {Stage} from "telegraf/scenes"
import {get, set, delele} from "./services/redis.js"
import {testScene} from "./bot/scene/test.js";

const stage = new Stage([testScene])

const bot = new Telegraf(process.env.BOT_TOKEN || '')

stage.start(async ctx => {
    await ctx.scene.enter('test');
})

bot.catch(async (err, ctx) => {await CatchBot(err, ctx)})

bot.use(session( {
    store: { get, set, delete: delele }
} ))
bot.use(stage.middleware())

bot.on('text', async ctx => {
    // Тут идет обработка по умолчанию, если пользователь еще не в сцене
})

bot.launch().catch(err => console.error('Ошибка при запуске бота:', err))