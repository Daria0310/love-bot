import * as dotenv from "dotenv";

// Использование config по необходимости

dotenv.config();
if (!process.env) throw Error("not .env")

// Вынес клавиатуры для пользователей сюда, при необходимости вынести в файл
export const userCommands = [
    { command: 'start', description: 'Запустить бота' },
];

export const adminCommands = [
    { command: 'start', description: 'Запустить бота' },
];
