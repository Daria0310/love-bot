import { WizardScene } from "telegraf/scenes";

const wizardScene = new WizardScene('wizard', async (ctx) => {
    ctx.session.name = ctx.message.text;
    await ctx.reply('Введите ваш возраст');
    return ctx.wizard.next();
}, async (ctx) => {
    if(isNaN(ctx.message.text)) {
        await ctx.reply('Возраст должен быть числом');
        ctx.wizard.back();
        await ctx.wizard.steps[ctx.wizard.cursor](ctx);
        return;
    }
    ctx.session.age = +ctx.message.text;
    await ctx.reply(`Ваше имя: ${ctx.session.name}, ваш возраст: ${ctx.session.age}`);
    await ctx.scene.enter('test');
});

wizardScene.leave(async (ctx) => {
    await ctx.reply('Вы покинули сцену');
});

wizardScene.enter(async (ctx) => {
    await ctx.reply('Введите ваше имя');
});

export default wizardScene
