import CliEntryPoint from "../src/core/CliEntryPoint";
import {CliItem, CliCommand, CliMenu} from '../src/core/CliItems';
import {User, ClIOTest} from './ClIO.test';

test('Entry point should display a list of messages', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
    ];
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues[0]).toBe('1 - say hello');
});

test('Entry point should add quit method at top level', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
    ];
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues).toStrictEqual(['1 - say hello', '2 - quit']);
});

test('Entry point should allow program exit fater quit method has been selected', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
    ];
    user.willInput(['2']);
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues[2]).toBe('exit');
});

test('Entry point should add back action to lower navigation levels', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
        new CliMenu('actions', [
            new CliMenu('one', [
                new CliCommand('cmd', () => {})
            ])
        ]),
    ];
    user.willInput(['2']);
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues).toStrictEqual([
        '1 - say hello', '2 - actions',  '3 - quit', 
        '1 - one', '2 - back'
    ]);
});

test('Entry point should allow navigation of menus', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
        new CliMenu('actions', [
            new CliMenu('one', [
                new CliCommand('cmd', () => {})
            ])
        ]),
    ];
    user.willInput(['2', '1', '2', '2', '3']);
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues).toStrictEqual([
        '1 - say hello', '2 - actions', '3 - quit',
        '1 - one', '2 - back',
        '1 - cmd', '2 - back',
        '1 - one', '2 - back',
        '1 - say hello', '2 - actions', '3 - quit',
        'exit'
    ]);
});

test('Entry point should print again options when a CliCommand is executed', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {io.print('hello world!')})
    ];
    user.willInput(['1']);
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues).toStrictEqual([
        '1 - say hello', '2 - quit',
        'hello world!',
        '1 - say hello', '2 - quit',
    ]);
});

test('Entry point should print again options when a CliCommand is executed in lower level menus', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [
        new CliCommand('say hello', () => {}),
        new CliMenu('actions', [
            new CliMenu('one', [
                new CliCommand('cmd', () => {io.print('cmd executed!')})
            ])
        ]),
    ];
    user.willInput(['2', '1', '1']);
    const target = CliEntryPoint.getInstace(mainMenu, io);

    target.start();
    expect(io.printedValues).toStrictEqual([
        '1 - say hello', '2 - actions', '3 - quit',
        '1 - one', '2 - back',
        '1 - cmd', '2 - back',
        'cmd executed!',
        '1 - cmd', '2 - back',
    ]);
});

test('Entry point should throw error if an empty list of CliItem is passed', () => {
    const user = new User();
    const io = new ClIOTest(user);
    const mainMenu: Array<CliItem> = [];
    const target = CliEntryPoint.getInstace(mainMenu, io);

    expect(() => target.start()).toThrowError('Must be provided a list of CliItem');
});