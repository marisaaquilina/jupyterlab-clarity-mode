import {
  JupyterFrontEnd, 
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTools,
  INotebookTracker
} from '@jupyterlab/notebook';

import ActivityTool from './components/ActivityTool';

import { CommandEditStatus } from './components/ModeStatus';

import { IStatusBar } from '@jupyterlab/statusbar';

/**
 * Initialization data for the clarity-mode extension.
 */
function activate(
  app: JupyterFrontEnd,
  cellTools: INotebookTools,
  notebookTracker: INotebookTracker,

  //panel: NotebookPanel
) {
  console.log(3);
  const activityTool = new ActivityTool(app, notebookTracker);
  cellTools.addItem({ tool: activityTool });

  const item = new CommandEditStatus();

  // Keep the status item up-to-date with the current notebook.
  notebookTracker.currentChanged.connect(() => {
      const current = notebookTracker.currentWidget;
      item.model.notebook = current && current.content;
      console.log(item.model.notebookMode);
  });

}

const clarityMode: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-clarity',
  autoStart: true,
  requires: [INotebookTools, INotebookTracker, IStatusBar],
  activate: activate
};
export default clarityMode;