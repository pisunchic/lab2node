import { homedir } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createInterface } from 'readline';
import { chdir, cwd } from 'process';

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

// Приветственное сообщение
console.log(`Welcome to the File Manager, ${username}!`);
showCurrentDirectory();

// Обработка ввода пользователя
rl.on('line', (input) => {
    if (input === '.exit') {
        console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
        rl.close();
        process.exit(0);
    }

    // TODO: Здесь будет обработка команд
    console.log('Invalid input');
    showCurrentDirectory();
});

// Обработка завершения программы по Ctrl+C
process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    rl.close();
    process.exit(0);
}); 