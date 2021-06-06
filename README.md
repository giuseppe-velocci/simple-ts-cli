# simple-ts-cli
A simple typescript framework to create cli apps.

This minimal framework allows the creation of simple cli application where a list of option is shown to users that can interact by inputing the corresponding index of the desired action. 

**Prerequisites:**

- node v16+
- typescript

**Installation:**

- open a terminal and point to directory of this repository
- run `npm i` to install all local dependencies
- run `npm start` to execute the application
- run `npm test` to run unit tests

**Extensibility:**

To create a custom application all is needed is mapping the desired system as a tree composed by two elements:
- __CliMenu__(s) that structure navigation levels (branches)
- __CliCommand__(s) that allow method execution (leaves)

Both elements impleents __CliItem__ interface that exposes a string message that will be the label for each element.

Root of the tree will be __CliEntryPoint__ that will take care of managing navigation and input/output leveraging methods exposed by __ClIO__ implementation (a layer to allow unit testing with io operations).

Creating an array with these elements inside index.ts and then passing it to a __CliEntryPoint__ instance will be enough to have it up and running.

Example code:
```typescript
import CliEntryPoint from './src/core/CliEntryPoint';
import { CliMenu, CliItem, CliCommand } from './src/core/CliItems';
import { ClIO, ClIOImpl } from './src/core/ClIO';

// needed to handle io operations. Should be a singleton.
const io: ClIO = ClIOImpl.getInstance();

// sample methods. Ideally they should be moved in external files
const sayHello = (io: ClIO) => {
    io.print('Hello world!');
}

const sayGoodbye = (io: ClIO) => {
    io.print('Goodbye world!');
}

// example of a very basic application --> this is where app structure should be defined
const mainList = new Array<CliItem>(
    new CliCommand('say hello', () => sayHello(io)),
    new CliMenu('actions', new Array<CliItem>(
        new CliCommand('say goodbye', () => sayGoodbye(io)),
    ))
);

// then simply pass this list to CliEntryPoint singleton and start()
const entryPoint = new CliEntryPoint(mainList, io);
entryPoint.start();
```


**Enjoy!**
