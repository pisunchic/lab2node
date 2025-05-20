import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { resolve, join, dirname, basename } from 'path';
import { cwd } from 'process';

// Функция для сжатия файла
export const compressFile = async (sourcePath, destinationPath) => {
    try {
        const sourceFilePath = resolve(cwd(), sourcePath);
        const targetDirPath = resolve(cwd(), destinationPath);
        const fileName = basename(sourceFilePath);
        const targetFilePath = join(targetDirPath, `${fileName}.br`);

        const readStream = createReadStream(sourceFilePath);
        const writeStream = createWriteStream(targetFilePath);
        const brotliCompress = createBrotliCompress();

        await pipeline(readStream, brotliCompress, writeStream);
        
        console.log('\nFile compressed successfully:');
        console.log('----------------------------');
        console.log(`Source: ${sourceFilePath}`);
        console.log(`Destination: ${targetFilePath}`);
        console.log('----------------------------');
        
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
};

// Функция для распаковки файла
export const decompressFile = async (sourcePath, destinationPath) => {
    try {
        const sourceFilePath = resolve(cwd(), sourcePath);
        const targetDirPath = resolve(cwd(), destinationPath);
        const fileName = basename(sourceFilePath, '.br'); // Убираем расширение .br
        const targetFilePath = join(targetDirPath, fileName);

        const readStream = createReadStream(sourceFilePath);
        const writeStream = createWriteStream(targetFilePath);
        const brotliDecompress = createBrotliDecompress();

        await pipeline(readStream, brotliDecompress, writeStream);
        
        console.log('\nFile decompressed successfully:');
        console.log('----------------------------');
        console.log(`Source: ${sourceFilePath}`);
        console.log(`Destination: ${targetFilePath}`);
        console.log('----------------------------');
        
        return true;
    } catch (error) {
        console.error('Operation failed');
        return false;
    }
}; 