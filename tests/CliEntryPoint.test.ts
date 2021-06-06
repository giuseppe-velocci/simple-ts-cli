import CliEntryPoint from "../src/CliEntryPoint";
import {CliItem, CliCommand, CliMenu} from '../src/CliItems';
import {User, ClIOTest} from './ClIO.test';

test('Entry point should display a list of messages', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
    ];
    const target = new CliEntryPoint(mainMenu, io);

    target.start();
    expect(io.printedValues).toStrictEqual(['1 - say hello', '2 - quit']);
});

test('Entry point should throw error if an empty list of CliItem is passed', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [];
    const target = new CliEntryPoint(mainMenu, io);

    expect(target.start()).toThrowError();
});