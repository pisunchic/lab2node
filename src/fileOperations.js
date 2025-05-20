import { createReadStream, createWriteStream, unlink, rename, writeFile } from 'fs';
import { join, resolve, dirname, basename } from 'path';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { cwd } from 'process';

// Функция для чтения содержимого файла
export const readFile = async (filePath) => {
    try {
        const absolutePath = resolve(cwd(), filePath);
        const readStream = createReadStream(absolutePath, 'utf-8');
        
        console.log('\nFile contents:');
        console.log('----------------------------');
        
        for await (const chunk of readStream) {
            process.stdout.write(chunk);
        }
        console.log('\n----------------------------');
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для создания пустого файла
export const createFile = async (fileName) => {
    try {
        const filePath = join(cwd(), fileName);
        await writeFile(filePath, '');
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для переименования файла
export const renameFile = async (oldPath, newName) => {
    try {
        const oldFilePath = resolve(cwd(), oldPath);
        const newFilePath = join(dirname(oldFilePath), newName);
        await rename(oldFilePath, newFilePath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для копирования файла
export const copyFile = async (sourcePath, targetPath) => {
    try {
        const sourceFilePath = resolve(cwd(), sourcePath);
        const targetDirPath = resolve(cwd(), targetPath);
        const fileName = basename(sourceFilePath);
        const targetFilePath = join(targetDirPath, fileName);

        const readStream = createReadStream(sourceFilePath);
        const writeStream = createWriteStream(targetFilePath);

        await pipeline(readStream, writeStream);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для перемещения файла
export const moveFile = async (sourcePath, targetPath) => {
    try {
        // Сначала копируем файл
        const copySuccess = await copyFile(sourcePath, targetPath);
        if (!copySuccess) {
            return false;
        }

        // Затем удаляем исходный файл
        const sourceFilePath = resolve(cwd(), sourcePath);
        await unlink(sourceFilePath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для удаления файла
export const removeFile = async (filePath) => {
    try {
        const absolutePath = resolve(cwd(), filePath);
        await unlink(absolutePath);
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
}; 