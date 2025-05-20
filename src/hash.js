import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { resolve } from 'path';
import { cwd } from 'process';

// Функция для вычисления хэша файла
export const calculateHash = async (filePath) => {
    try {
        const absolutePath = resolve(cwd(), filePath);
        const hash = createHash('sha256');
        const readStream = createReadStream(absolutePath);

        // Обрабатываем файл потоково
        for await (const chunk of readStream) {
            hash.update(chunk);
        }

        const fileHash = hash.digest('hex');
        
        console.log('\nFile hash:');
        console.log('----------------------------');
        console.log(fileHash);
        console.log('----------------------------');
        
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
}; 