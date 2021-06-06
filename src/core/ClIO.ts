const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

export interface ClIO {
    prompt(action: (choice: string) => void): void;
    print(message: string): void;
    error(message: string): void;
    exitProgram(): void;
}

export class ClIOImpl implements ClIO {
    private static instance: ClIOImpl;

    private constructor() {}

    static getInstance(){
        if (! ClIOImpl.instance)
            ClIOImpl.instance = new ClIOImpl();

        return ClIOImpl.instance;
    }

    prompt(action: (choice: string) => void): void {
        rl.question('', (line) => {
            action(line);
        });
    }

    print(message: string): void {
        console.log(message);
    }

    error(message: string): void {
        console.error(message);
    }

    exitProgram(): void {
        process.exit(0);
    }
}