import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTools,
  INotebookTracker,
  NotebookPanel
} from '@jupyterlab/notebook';

import ActivityTool from './components/ActivityTool';

/**
 * Initialization data for the clarity-mode extension.
 */
function activate(
  app: JupyterFrontEnd,
  cellTools: INotebookTools,
  notebookTracker: INotebookTracker,
  panel: NotebookPanel
) {
  console.log(17);
  const activityTool = new ActivityTool(app, notebookTracker, panel);
  cellTools.addItem({ tool: activityTool });
}

const clarityMode: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-clarity',
  autoStart: true,
  requires: [INotebookTools, INotebookTracker],
  activate: activate
};

export default clarityMode;
