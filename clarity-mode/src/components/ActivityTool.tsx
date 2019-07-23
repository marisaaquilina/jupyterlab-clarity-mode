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

class ActivityTool extends NotebookTools.Tool {
  readonly app: JupyterFrontEnd;
  constructor(app: JupyterFrontEnd, notebookTracker: INotebookTracker) {
    super();
    this.app = app;
    this.notebookTracker = notebookTracker;
    this.layout = new PanelLayout();
  }

  protected onAfterAttach() {
    this.notebookTracker.currentWidget.context.ready.then(() => {
      let layout = this.layout as PanelLayout;
      let count = layout.widgets.length;
      for (let i = 0; i < count; i++) {
        layout.widgets[0].dispose();
      }
      const panel: NotebookPanel = this.notebookTracker.currentWidget;
      const cellWidget = ReactWidget.create(<CreateCell panelWidget={panel} activeCellType={this.notebookTools.activeCell} />);
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
    const cellWidget = ReactWidget.create(<CreateCell panelWidget={panel} activeCellType={this.notebookTools.activeCell}/>);
    layout.addWidget(cellWidget);
    if (this.notebookTools.activeCell instanceof MarkdownCell) {
      console.log('The active cell is markdown.');
      const markdownCell = this.notebookTools.activeCell;
      markdownCell;
      //const widget = new ProseMirrorEditor(markdownCell.model as MarkdownCellModel);
      //markdownCell.inputArea.renderInput(widget);
    }
    if (this.notebookTools.activeCell instanceof CodeCell) {
      console.log('The active cell is code.');
      const codeCell = this.notebookTools.activeCell;
      codeCell;
      //const widget = new ProseMirrorEditor(markdownCell.model as MarkdownCellModel);
      //markdownCell.inputArea.renderInput(widget);
    }
  }
  private notebookTracker:INotebookTracker;
}

export default ActivityTool;