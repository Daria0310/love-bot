import {BaseScene} from "telegraf/scenes";
import {userCommands} from "../config.js";
import {prisma} from "../../../prisma/prisma.js";
import { message } from "telegraf/filters";
import { Markup } from "telegraf";
import { callbackQuery } from "telegraf/filters"

const testScene = new BaseScene('test')

testScene.enter(async (ctx) => {
    await ctx.telegram.setMyCommands(userCommands);

    await ctx.reply("Добро пожаловать в Love Bot!")

    await prisma.user.create({
        data: {
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name,
            userName: ctx.from.username,
        }
    })
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



testScene.command('inline_keyboard', async (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        Markup.button.callback('Лайкнуть', '1'),
        Markup.button.callback('Проигнорировать', '3'),
        Markup.button.callback('Главное меню', '5'),
        Markup.button.callback('Перестать искать анкеты', '7'),
    ], { columns: 1 }).reply_markup;
    await ctx.reply("Выберите один из вариантов", {
        reply_markup: keyboard
    })
})

testScene.action("1", async ctx => {
    await ctx.reply("Анкета лайкнута")
})

testScene.on(callbackQuery, async ctx => {
    ctx.reply(`Вы выбрали вариант ${ctx.callbackQuery.data})`)
})

testScene.on(message('text'), async (ctx) => {
    await ctx.reply(ctx.message.text)
})

testScene.on(message('photo'), async (ctx) => {
    await ctx.replyWithPhoto(ctx.message.photo[0].file_id, {caption: "Фото от пользователя: " + ctx.from.username})
}) 

export default testScene

