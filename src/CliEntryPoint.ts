import { CliMenu, CliCommand, CliItem } from './CliItems';
import { ClIO } from './ClIO';

export default class CliEntryPoint {
  items: Array<CliItem>;
  io: ClIO;

  constructor(items: Array<CliItem>, io: ClIO) {
    if (!items || items.length < 1)
      throw new Error('Must be provided a list of CliItem');

    this.items = items;
    this.io = io;
  }

  start() {
    const rootmenu = new CliMenu("", this.items);
    const quitCommand = new QuitCommand(this.io);
    this.execMenu(rootmenu, quitCommand);
  }

  private execMenu(menu: CliMenu, backCommand: NavCommand) {
    const navMenu: Array<CliItem> = menu.items();
    navMenu.push(backCommand);
    for (let k in navMenu) {
      this.io.print(`${+k + 1} - ${navMenu[k].message}`);
    }

    const actOnSelectedItem = (choice: string) => {
      const selectedItem = navMenu[+choice - 1];
      if (selectedItem instanceof CliMenu) {
        this.execMenu(selectedItem, new BackCommand(() => this.execMenu(menu, backCommand)));
      } else if (selectedItem instanceof CliCommand) {
        this.execCommand(selectedItem, () => this.execMenu(menu, backCommand));
      } else {
        this.io.error('invalid selection');
      }
    };

    this.io.prompt(actOnSelectedItem);
  }

  private execCommand(cmd: CliCommand, actionAfterExecution: () => void) {
    cmd.action();
    actionAfterExecution();
  }
}

class NavCommand implements CliItem {
  message: string;
  action: () => void;

  constructor(message: string, action: () => void) {
    this.message = message;
    this.action = action;
  }
}

class QuitCommand extends NavCommand {
  constructor(io: ClIO) {
    super('quit', () => io.exitProgram());
  }
}

class BackCommand extends NavCommand {
  constructor(action: () => void) {
    super('back', action);
  }
}