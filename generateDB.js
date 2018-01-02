const fs = require('fs');
const path = require('path');
const fileFormat = "utf8";
fs.mkdirSync(path.resolve(__dirname, './dump'));

const dataArray = [];
const names = ['John', 'Robert', 'Liana', 'Edward', 'Ann', 'Richard', 'Amie', 'Michael', 'Lily', 'Ragnar', 'Ivar', 'Ubba', 'Loki', 'Thor', 'Odin'];
const cities = ['New York', 'Kiev', 'Moscow', 'Berlin', 'London', 'Amsterdam', 'Vatican', 'Winterhold', 'Whiteran', 'Hummerfall'];
const currencies = ['UAH', 'USD', 'RUB', 'EUR'];
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
        created: randomDate(new Date(2012, 0, 1), new Date(2015, 5, 4)),
        modified: randomDate(new Date(2015, 0, 1), new Date(2016, 5, 4)),
        city: randomString(cities),
        childName: randomString(names),
        childAge: randomNum(20, true)
    }
}
fs.writeFileSync(path.resolve(__dirname, './dump/data.json'), JSON.stringify(dataArray), fileFormat);