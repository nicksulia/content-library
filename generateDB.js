const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
import config from './serverConfig.js';
const { portDB, hostDB, databaseName, collectionName } =  config;
const fileFormat = "utf8";
if (fs.existsSync(path.resolve(__dirname, `./dump/data.json`))) {
    fs.unlinkSync(path.resolve(__dirname, `./dump/data.json`));
    fs.rmdirSync(path.resolve(__dirname, './dump'));
}
fs.mkdirSync(path.resolve(__dirname, './dump'));

const dataArray = [];
const names = ['John', 'Robert', 'Liana', 'Edward', 'Ann', 'Richard', 'Amie', 'Michael', 'Lily', 'Ragnar', 'Ivar', 'Ubba', 'Loki', 'Thor', 'Odin'];
const cities = ['New York', 'Kiev', 'Moscow', 'Berlin', 'London', 'Amsterdam', 'Vatican', 'Winterhold', 'Whiteran', 'Hummerfall'];
const currencies = ['UAH', 'USD', 'RUB', 'EUR'];
const languages = ['English', 'Ukrainian', 'German'];
const randomString = (arr) => {
    return arr[Math.floor(Math.random()*arr.length)];
};
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomNum = (limit, isInt) => {
    if (isInt) {
        return parseInt(Math.random()*limit + 1);
    }
    return Math.random()*limit;
};

for ( let i = 0; i < 100000; i++ ) {
    dataArray[i] = {
        _id: i+1,
        value: randomNum(100000),
        currency: randomString(currencies),
        name: randomString(names),
        age: randomNum(50, true),
        created: {$date: randomDate(new Date(2012, 0, 1), new Date(2015, 5, 4))},
        modified: {$date: randomDate(new Date(2015, 0, 1), new Date(2016, 5, 4))},
        city: randomString(cities),
        childName: randomString(names),
        childAge: randomNum(20, true),
        language: randomString(languages)
    }
}
fs.writeFileSync(path.resolve(__dirname, `./dump/data.json`), JSON.stringify(dataArray), fileFormat);
exec(`"${path.resolve(__dirname, './import.bat')}" ${hostDB} ${portDB} ${databaseName} ${collectionName} `, (err, stdout, stderr) => {
    if (err) {
        console.log('failed to access import.bat');
        return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

});
