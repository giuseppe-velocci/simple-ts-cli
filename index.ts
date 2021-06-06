import CliEntryPoint from './src/core/CliEntryPoint';
import { CliMenu, CliItem, CliCommand } from './src/core/CliItems';
import { ClIO, ClIOImpl } from './src/core/ClIO';

const io: ClIO = ClIOImpl.getInstance();

// sample methods. Ideally they should be moved in external files
const sayHello = (io: ClIO) => {
    io.print('Hello world!');
}

const sayGoodbye = (io: ClIO) => {
    io.print('Goodbye world!');
}

// example of a very basic application
const mainList = new Array<CliItem>(
    new CliCommand('say hello', () => sayHello(io)),
    new CliMenu('actions', new Array<CliItem>(
        new CliCommand('say goodbye', () => sayGoodbye(io)),
    ))
);

const entryPoint = CliEntryPoint.getInstace(mainList, io);
entryPoint.start();
