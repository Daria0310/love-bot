import {BaseScene} from "telegraf/scenes";
import {userCommands} from "../config.js";
import {prisma} from "../../../prisma/prisma.js";

export const testScene = new BaseScene('test')

testScene.enter(async (ctx) => {
    await ctx.telegram.setMyCommands(userCommands);

    await ctx.reply("Так и запишем")

    await prisma.user.create({
        data: {
            firstName: ctx.from.first_name,
            lastName: ctx.from.last_name,
            userName: ctx.from.username,
        }
    })
})