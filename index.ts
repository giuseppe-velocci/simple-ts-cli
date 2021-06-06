import CliEntryPoint from './src/CliEntryPoint';
import { sayGoodbye, sayHello } from './src/HelloWorld';
import { CliMenu, CliItem, CliCommand } from './src/CliItems';
import { ClIO, ClIOImpl } from './src/ClIO';

const io: ClIO = new ClIOImpl();

const mainList = new Array<CliItem>(
    new CliCommand('say hello', () => sayHello(io)),
    new CliMenu('actions', new Array<CliItem>(
        new CliCommand('say goodbye', () => sayGoodbye(io)),
    ))
);

const entryPoint = new CliEntryPoint(mainList, io);
entryPoint.start();
