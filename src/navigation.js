import { readdir, stat } from 'fs/promises';
import { join, resolve, dirname, sep } from 'path';
import { chdir, cwd } from 'process';

// Функция для перехода вверх по директории
export const navigateUp = async () => {
    const currentDir = cwd();
    const rootDir = currentDir.split(sep)[0] + sep; // Получаем корневую директорию (например, C:\ в Windows)
    
    if (currentDir === rootDir) {
        return false; // Нельзя подняться выше корневой директории
    }

    try {
        const parentDir = dirname(currentDir);
        await chdir(parentDir);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для перехода в указанную директорию
export const navigateTo = async (path) => {
    try {
        const targetPath = resolve(cwd(), path);
        const rootDir = cwd().split(sep)[0] + sep;
        
        // Проверяем, не пытаемся ли мы выйти за пределы корневой директории
        if (!targetPath.startsWith(rootDir)) {
            console.error('Operation failed');
            return false;
        }

        await chdir(targetPath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для получения содержимого текущей директории
export const listDirectory = async () => {
    try {
        const items = await readdir(cwd());
        const itemsWithStats = await Promise.all(
            items.map(async (item) => {
                const itemPath = join(cwd(), item);
                const stats = await stat(itemPath);
                return {
                    name: item,
                    isDirectory: stats.isDirectory(),
                    size: stats.size,
                    birthtime: stats.birthtime
                };
            })
        );

        // Сортируем: сначала директории, потом файлы, всё по алфавиту
        const sortedItems = itemsWithStats.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) return -1;
            if (!a.isDirectory && b.isDirectory) return 1;
            return a.name.localeCompare(b.name);
        });

        // Выводим результат
        console.log('\nDirectory contents:');
        console.log('Type\t\tName');
        console.log('----------------------------');
        
        for (const item of sortedItems) {
            const type = item.isDirectory ? 'directory' : 'file';
            console.log(`${type}\t\t${item.name}`);
        }
        
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
}; 