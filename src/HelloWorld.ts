import { ClIO } from './ClIO';

export const sayHello = (io: ClIO) => {
    io.print('Hello world!');
}

export const sayGoodbye = (io: ClIO) => {
    io.print('Goodbye world!');
}