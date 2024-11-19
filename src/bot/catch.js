export default async function CatchBot(err, ctx) {
    console.error(`Ошибка у пользователя ${ctx.from.username}`);
}
