import express from 'express';
import SerialPort from 'serialport';
import path from 'path';

const port = 80;
const app = express();
const arduinoPort = "/dev/ttyACM0";

let dataStuffs = 48;

const arduinoSerialPort = new SerialPort(arduinoPort, {  
    baudRate: 9600
});

arduinoSerialPort.on('open',() => {
    console.log('serial port opened');
});

    
arduinoSerialPort.on('data', data => {
    dataStuffs = data[0];
});

app.use(express.static('public'))

app.get('/', (req: any, res: any) => {
    return res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.get('/isOn', async (req: any, res: any) => {
    arduinoSerialPort.write('2');

    setTimeout(() => {
        return res.status(200).json({
            data: dataStuffs == 49 ? true : false,
            mes: 'success'
        });
    }, 1000);
});

app.get('/on', (req: any, res: any) => {
    arduinoSerialPort.write('1');

    return res.status(200).json({
        mes: 'success'
    });
});

app.get('/off', (req: any, res: any) => {
    arduinoSerialPort.write('0');

    return res.status(200).json({
        mes: 'success'
    });
});

app.listen(port, () => {
    console.log('woop');
});