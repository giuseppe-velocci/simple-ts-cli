export interface CliItem {
    message: string;
}

export class CliMenu implements CliItem {
    message: string;
    menuItems: Array<CliItem>;

    constructor(message: string, menuItems: Array<CliItem>) {
        this.message = message;
        this.menuItems = menuItems;
    }

    items(): Array<CliItem> {
        return this.menuItems.slice(0);
    }
}

export class CliCommand implements CliItem {
    message: string;
    action: () => void;

    constructor(message: string, action: () => void) {
        this.message = message;
        this.action = action;
    }
}