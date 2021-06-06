import CliEntryPoint from './src/CliEntryPoint';
import { sayGoodbye, sayHello } from './src/HelloWorld';
import { CliMenu, CliItem, CliCommand } from './src/CliItems';
import { ClIO, ClIOImpl } from './src/ClIO';

const io: ClIO = new ClIOImpl();

const mainList = new Array<CliItem>(
    /*
    new CliCommand('say hello', () => sayHello(io)),
    new CliMenu('actions', new Array<CliItem>(
        new CliCommand('say goodbye', () => sayGoodbye(io)),
    ))
    */
    new CliCommand('say hello', () => {}),
    new CliMenu('actions', [
        new CliMenu('one', [
            new CliCommand('cmd', () => {})
        ])
    ]),
);

const entryPoint = new CliEntryPoint(mainList, io);
entryPoint.start();
