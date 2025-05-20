import { homedir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createInterface } from 'readline';
import { chdir, cwd } from 'process';
import { navigateUp, navigateTo, listDirectory } from './navigation.js';
import { readFile, createFile, renameFile, copyFile, moveFile, removeFile } from './fileOperations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Получаем имя пользователя из аргументов командной строки
const username = process.argv.find(arg => arg.startsWith('--username='))?.split('=')[1];

if (!username) {
    console.error('Error: Username is required. Please run the program with --username=your_username');
    process.exit(1);
}

// Устанавливаем начальный рабочий каталог
const homeDir = homedir();
chdir(homeDir);

// Создаем интерфейс для чтения команд
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для отображения текущего рабочего каталога
const showCurrentDirectory = () => {
    console.log(`\nYou are currently in ${cwd()}`);
};

// Функция для обработки команд
const handleCommand = async (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        // Команды навигации
        case 'up':
            await navigateUp();
            showCurrentDirectory();
            break;
        case 'cd':
            if (!args[0]) {
                console.error('Invalid input');
            } else {
                await navigateTo(args[0]);
                showCurrentDirectory();
            }
            break;
        case 'ls':
            await listDirectory();
            showCurrentDirectory();
            break;

        // Команды работы с файлами
        case 'cat':
            if (!args[0]) {
                console.error('Invalid input');
            } else {
                await readFile(args[0]);
                showCurrentDirectory();
            }
            break;
        case 'add':
            if (!args[0]) {
                console.error('Invalid input');
            } else {
                await createFile(args[0]);
                showCurrentDirectory();
            }
            break;
        case 'rn':
            if (args.length !== 2) {
                console.error('Invalid input');
            } else {
                await renameFile(args[0], args[1]);
                showCurrentDirectory();
            }
            break;
        case 'cp':
            if (args.length !== 2) {
                console.error('Invalid input');
            } else {
                await copyFile(args[0], args[1]);
                showCurrentDirectory();
            }
            break;
        case 'mv':
            if (args.length !== 2) {
                console.error('Invalid input');
            } else {
                await moveFile(args[0], args[1]);
                showCurrentDirectory();
            }
            break;
        case 'rm':
            if (!args[0]) {
                console.error('Invalid input');
            } else {
                await removeFile(args[0]);
                showCurrentDirectory();
            }
            break;
        case '.exit':
            console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
            rl.close();
            process.exit(0);
            break;
        default:
            console.error('Invalid input');
            showCurrentDirectory();
    }
};

// Приветственное сообщение
console.log(`Welcome to the File Manager, ${username}!`);
showCurrentDirectory();

// Обработка ввода пользователя
rl.on('line', (input) => {
    handleCommand(input);
});

// Обработка завершения программы по Ctrl+C
process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
}); 