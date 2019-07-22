import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTools,
  INotebookTracker,
  //NotebookPanel
} from '@jupyterlab/notebook';

import ActivityTool from './components/ActivityTool';
/** 
// Status Bar
import * as React from 'react';

import {
    Notebook,
    NotebookMode
} from '@jupyterlab/notebook';

import { VDomRenderer, VDomModel } from '@jupyterlab/apputils';
import { ISignal } from '@phosphor/signaling';
import { IDisposable } from '@phosphor/disposable';
import { Token } from '@phosphor/coreutils';


const CommandEditComponent = (
  props: CommandEditComponent.IProps
): React.ReactElement<CommandEditComponent.IProps> => {
  return (
      <p>{props.notebookMode}</p>
  );
};

namespace CommandEditComponent {
  export interface IProps {
      notebookMode: NotebookMode;
  }
}

class CommandEdit extends VDomRenderer<CommandEdit.Model>
  implements ICommandEdit {
  constructor(opts: CommandEdit.IOptions) {
      super();
      this._tracker = opts.tracker;

      this._tracker.currentChanged.connect(this._onNotebookChange);

      this.model = new CommandEdit.Model(
          this._tracker.currentWidget && this._tracker.currentWidget.content
      );
      this.node.title = `Notebook is in ${this.model.notebookMode} mode`;
  }

  render() {
      if (this.model === null) {
          return null;
      } else {
          this.node.title = `Notebook is in ${this.model.notebookMode} mode`;
          return (
              <CommandEditComponent notebookMode={this.model.notebookMode} />
          );
      }
  }

  dispose() {
      super.dispose();

      this._tracker.currentChanged.disconnect(this._onNotebookChange);
  }

  private _onNotebookChange = (
      tracker: INotebookTracker,
      notebook: NotebookPanel | null
  ) => {
      if (notebook === null) {
          this.model!.notebook = null;
      } else {
          this.model!.notebook = notebook.content;
      }
  };

  private _tracker: INotebookTracker;
}

namespace CommandEdit {
  export class Model extends VDomModel implements ICommandEdit.IModel {
      constructor(notebook: Notebook | null) {
          super();

          this.notebook = notebook;
      }

      get notebookMode() {
          return this._notebookMode;
      }

      set notebookMode(notebookMode: NotebookMode) {
          this._notebookMode = notebookMode;
      }

      set notebook(notebook: Notebook | null) {
          const oldNotebook = this._notebook;
          if (oldNotebook !== null) {
              oldNotebook.stateChanged.disconnect(this._onChanged);
              oldNotebook.activeCellChanged.disconnect(this._onChanged);
              oldNotebook.modelContentChanged.disconnect(this._onChanged);
          }

          const oldState = this._getAllState();
          this._notebook = notebook;
          if (this._notebook === null) {
              this._notebookMode = 'command';
          } else {
              this._notebookMode = this._notebook.mode;
              this._notebook.stateChanged.connect(this._onChanged);
              this._notebook.activeCellChanged.connect(this._onChanged);
              this._notebook.modelContentChanged.connect(this._onChanged);
          }

          this._triggerChange(oldState, this._getAllState());
      }

      private _onChanged = (_notebook: Notebook) => {
          const oldState = this._getAllState();
          if (_notebook !== null && _notebook !== undefined) {
              this._notebookMode = _notebook.mode;
          } else {
              this._notebookMode = 'command';
          }
          this._triggerChange(oldState, this._getAllState());
      };

      private _getAllState(): NotebookMode {
          return this._notebookMode;
      }

      private _triggerChange(oldState: NotebookMode, newState: NotebookMode) {
          if (oldState !== newState) {
              this.stateChanged.emit(void 0);
          }
      }

      private _notebookMode: NotebookMode = 'command';
      private _notebook: Notebook | null = null;
  }

  export interface IOptions {
      tracker: INotebookTracker;
  }
}

export interface ICommandEdit extends IDisposable {
  readonly model: ICommandEdit.IModel | null;
  readonly modelChanged: ISignal<this, void>;
}

export namespace ICommandEdit {
  export interface IModel {
      readonly notebookMode: NotebookMode;
      readonly notebook: Notebook | null;
  }
}

// tslint:disable-next-line:variable-name
export const ICommandEdit = new Token<ICommandEdit>(
  '@jupyterlab/statusbar:ICommandEdit'
);

// Status Bar
**/

/**
 * Initialization data for the clarity-mode extension.
 */
function activate(
  app: JupyterFrontEnd,
  cellTools: INotebookTools,
  notebookTracker: INotebookTracker,
  //panel: NotebookPanel
) {
  console.log(33);
  const activityTool = new ActivityTool(app, notebookTracker);
  cellTools.addItem({ tool: activityTool });
}

const clarityMode: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-clarity',
  autoStart: true,
  requires: [INotebookTools, INotebookTracker],
  activate: activate
};
export default clarityMode;

/** 
export const commandEditItem: JupyterFrontEndPlugin<ICommandEdit> = {
  id: '@jupyterlab/statusbar:command-edit-item',
  autoStart: true,
  provides: ICommandEdit,
  requires: [INotebookTracker],
  activate: (
      app: JupyterFrontEnd,
      tracker: INotebookTracker
  ) => {const item = new CommandEdit({tracker}); console.log("Mode:", item.model.notebookMode);return item;}
};

**/