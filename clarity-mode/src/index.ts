import {
  JupyterFrontEnd, JupyterFrontEndPlugin
} from '@jupyterlab/application';


/**
 * Initialization data for the clarity-mode extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'clarity-mode',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension clarity-mode is activated!');
  }
};

export default extension;
