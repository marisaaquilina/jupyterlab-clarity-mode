import {
  NotebookTools,
  INotebookTracker,
  NotebookPanel,
} from '@jupyterlab/notebook';

import { Message } from '@phosphor/messaging';

import { PanelLayout } from '@phosphor/widgets';

import { MarkdownCell, CodeCell } from '@jupyterlab/cells';

import { JupyterFrontEnd } from '@jupyterlab/application';

import { CreateCell} from './ActivityBar';

import { ReactWidget } from '@jupyterlab/apputils';

import * as React from 'react';

import logo from '../static/add-icon.svg';

class ActivityTool extends NotebookTools.Tool {
  readonly app: JupyterFrontEnd;
  constructor(app: JupyterFrontEnd, notebookTracker: INotebookTracker) {
    super();
    this.app = app;
    this.notebookTracker = notebookTracker;
    this.layout = new PanelLayout();
    //const panel: NotebookPanel = this.notebookTracker.currentWidget;
    //const cellWidget = ReactWidget.create(<CreateCell panelWidget={panel} />);
    //let layout = this.layout as PanelLayout;
    //layout.addWidget(cellWidget);
  }

  protected onAfterAttach() {
    this.notebookTracker.currentWidget.context.ready.then(() => {
      let layout = this.layout as PanelLayout;
      let count = layout.widgets.length;
      for (let i = 0; i < count; i++) {
        layout.widgets[0].dispose();
      }
      const panel: NotebookPanel = this.notebookTracker.currentWidget;
      const cellWidget = ReactWidget.create(<CreateCell panelWidget={panel} />);
      layout.addWidget(cellWidget);
    });
  }

  protected onActiveCellChanged(msg: Message): void {
    let layout = this.layout as PanelLayout;
    let count = layout.widgets.length;
    for (let i = 0; i < count; i++) {
      layout.widgets[0].dispose();
    }
    const panel: NotebookPanel = this.notebookTracker.currentWidget;
    const cellWidget = ReactWidget.create(<CreateCell panelWidget={panel} />);
    layout.addWidget(cellWidget);
    if (this.notebookTools.activeCell instanceof MarkdownCell) {
      console.log('The active cell is markdown.');
    }
    if (this.notebookTools.activeCell instanceof CodeCell) {
      console.log('The active cell is code.');
    }
  }
  private notebookTracker:INotebookTracker;
}

export default ActivityTool;