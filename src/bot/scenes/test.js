import {BaseScene} from "telegraf/scenes";
import {userCommands} from "../config.js";
import { message } from "telegraf/filters";
import { Markup } from "telegraf";

const testScene = new BaseScene('test')

testScene.enter(async (ctx) => {
    await ctx.telegram.setMyCommands(userCommands);

    await ctx.reply("Добро пожаловать в Love Bot!")
})

testScene.command("test", async (ctx) => {
    await ctx.reply("test")
})

testScene.command('reply_keyboard', async (ctx) => {    
    await ctx.reply("Выберите один из вариантов", {
        reply_markup: {
            keyboard: [
                [{ text: 'Вариант 1' }, { text: 'Вариант 2' }],
                [{ text: 'Вариант 3' }, { text: 'Вариант 4' }],
                [{ text: 'Вариант 5' }, { text: 'Вариант 6' }],
            ],
            resize_keyboard: true,
        },
    })
})



testScene.command('anket', async (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Лайкнуть', 'like'),
        Markup.button.callback('Проигнорировать', 'ignore'),
        Markup.button.callback('Главное меню', 'main_menu'),
        Markup.button.callback('Перестать искать анкеты', 'stop_searching'),
    ], { columns: 1 }).reply_markup;
    await ctx.reply("Выберите один из вариантов", {
        reply_markup: keyboard
    })
})

testScene.action("like", async ctx => {
    await ctx.reply("Анкета лайкнута")
})

testScene.action("ignore", async ctx => {
    await ctx.reply("Анкета проигнорирована")
})

testScene.action("main_menu", async ctx => {
    await ctx.reply("Главное меню")
})

testScene.action("stop_searching", async ctx => {
    await ctx.reply("Вы перестали искать анкеты")
})

testScene.on(message('text'), async (ctx) => {
    await ctx.reply(ctx.message.text)
})

testScene.on(message('photo'), async (ctx) => {
    await ctx.replyWithPhoto(ctx.message.photo[0].file_id, {caption: "Фото от пользователя: " + ctx.from.username})
}) 

export default testScene

