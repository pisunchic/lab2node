import { EOL, cpus, homedir, userInfo, arch } from 'os';

// Функция для получения EOL
export const getEOL = () => {
    console.log('\nSystem EOL:');
    console.log('----------------------------');
    // Преобразуем EOL в читаемый формат
    const eolDisplay = EOL === '\n' ? '\\n (LF)' : 
                      EOL === '\r\n' ? '\\r\\n (CRLF)' : 
                      EOL === '\r' ? '\\r (CR)' : EOL;
    console.log(eolDisplay);
    console.log('----------------------------');
    return true;
};

// Функция для получения информации о процессорах
export const getCPUs = () => {
    console.log('\nCPU Information:');
    console.log('----------------------------');
    const cpuInfo = cpus();
    console.log(`Total CPUs: ${cpuInfo.length}`);
    console.log('\nCPU Details:');
    cpuInfo.forEach((cpu, index) => {
        const speedGHz = (cpu.speed / 1000).toFixed(2);
        console.log(`CPU ${index + 1}:`);
        console.log(`  Model: ${cpu.model}`);
        console.log(`  Speed: ${speedGHz} GHz`);
    });
    console.log('----------------------------');
    return true;
};

// Функция для получения домашнего каталога
export const getHomeDir = () => {
    console.log('\nHome Directory:');
    console.log('----------------------------');
    console.log(homedir());
    console.log('----------------------------');
    return true;
};

// Функция для получения системного имени пользователя
export const getSystemUsername = () => {
    console.log('\nSystem Username:');
    console.log('----------------------------');
    console.log(userInfo().username);
    console.log('----------------------------');
    return true;
};

// Функция для получения архитектуры CPU
export const getArchitecture = () => {
    console.log('\nCPU Architecture:');
    console.log('----------------------------');
    console.log(arch());
    console.log('----------------------------');
    return true;
}; 