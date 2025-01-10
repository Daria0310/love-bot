import { WizardScene } from "telegraf/scenes";

const wizardScene = new WizardScene('createProfileScene', 
    async (ctx) => {
        await ctx.reply('Введите ваше имя');
        return ctx.wizard.next();
    },
    async (ctx) => {
        if(!ctx.session.name) {
            ctx.session.name = ctx.message.text;
        }
        await ctx.reply('Введите ваш возраст');
        return ctx.wizard.next();
    }, 
    async (ctx) => {
        if(isNaN(ctx.message.text)) {
            await ctx.reply('Возраст должен быть числом');
            ctx.wizard.back();
            await ctx.wizard.steps[ctx.wizard.cursor](ctx);
            return;
        }
        ctx.session.age = +ctx.message.text;
        await ctx.reply('Укажите ваш пол', {
            reply_markup: {
                keyboard: [
                    [{ text: 'Мужчина' }, { text: 'Женщина' }],
                ],
                resize_keyboard: true,
            },
        });
    },
  
);
wizardScene.leave(async (ctx) => {
    await ctx.reply('Вы покинули сцену');
})  


export default wizardScene
