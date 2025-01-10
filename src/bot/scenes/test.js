import {BaseScene} from "telegraf/scenes";
import {userCommands} from "../config.js";
import { message } from "telegraf/filters";
import { Markup } from "telegraf";

const testScene = new BaseScene('test')

testScene.enter(async (ctx) => {
    await ctx.telegram.setMyCommands(userCommands);

    await ctx.reply("Добро пожаловать в Love Bot!")
})



testScene.on(message('text'), async (ctx) => {
    await ctx.reply(ctx.message.text)
})

testScene.on(message('photo'), async (ctx) => {
    await ctx.replyWithPhoto(ctx.message.photo[0].file_id, {caption: "Фото от пользователя: " + ctx.from.username})
}) 

export default testScene

