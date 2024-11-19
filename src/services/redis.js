import Redis from 'ioredis';

// Создаем экземпляр клиента Redis
const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
});

const ttl = 3600

// Функция для установки значения в Redis с TTL
export async function set(key, value) {
    try {
        await redis.set(key, JSON.stringify(value)); // Сохраняем значение как строку JSON
        if (ttl) {
            await redis.expire(key, ttl); // Устанавливаем TTL, если он указан
        }
    } catch (error) {
        console.error('Ошибка при записи в Redis:', error);
    }
}

// Функция для получения значения из Redis
export async function get(key) {
    try {
        const result = await redis.get(key);
        return result ? JSON.parse(result) : null; // Парсим строку JSON обратно в объект
    } catch (error) {
        console.error('Ошибка при чтении из Redis:', error);
        return null;
    }
}

// Функция для удаления значения из Redis
export async function delele(key) {
    try {
         // Удаляем ключ
        return await redis.del(key); // Возвращаем количество удаленных ключей (0 или 1)
    } catch (error) {
        console.error('Ошибка при удалении из Redis:', error);
        return null;
    }
}