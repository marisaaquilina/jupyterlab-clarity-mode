import {
  NotebookTools,
  INotebookTracker,
  NotebookPanel,
  NotebookActions
} from '@jupyterlab/notebook';

import { Message } from '@phosphor/messaging';

import { PanelLayout } from '@phosphor/widgets';

import { MarkdownCell, CodeCell } from '@jupyterlab/cells';

import { JupyterFrontEnd } from '@jupyterlab/application';

import { CreateCell } from './ActivityBar';

import { ReactWidget } from '@jupyterlab/apputils';

import * as React from 'react';

import StyleClasses from './styles';

const ActivityBarStyleClasses = StyleClasses.ActivityBarStyleClasses;

export function CreateInsertButton(props: any) {
  return (
    <button
      className={ActivityBarStyleClasses.newCellButton}
      onClick={() => {
        NotebookActions.insertBelow(props.panelWidget.content);
      }}
    >
      +
    </button>
  );
}

class ActivityTool extends NotebookTools.Tool {
  readonly app: JupyterFrontEnd;
  constructor(
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    panel: NotebookPanel
  ) {
    super();
    this.app = app;
    let layout = (this.layout = new PanelLayout());
    const cellWidget = ReactWidget.create(<CreateCell />);
    layout.addWidget(cellWidget);
    const insertButtonWidget = ReactWidget.create(
      <CreateInsertButton panelWidget={panel} />
    );
    layout.addWidget(insertButtonWidget);
  }

  protected onActiveCellChanged(msg: Message): void {
    if (this.notebookTools.activeCell instanceof MarkdownCell) {
      console.log('The active cell is markdown.');
      const markdownCell = this.notebookTools.activeCell;
      markdownCell;
      //const widget = new ProseMirrorEditor(markdownCell.model as MarkdownCellModel);
      //markdownCell.inputArea.renderInput(widget);
    }
    if (this.notebookTools.activeCell instanceof CodeCell) {
      console.log('The active cell is markdown.');
      const codeCell = this.notebookTools.activeCell;
      codeCell;
      //const widget = new ProseMirrorEditor(markdownCell.model as MarkdownCellModel);
      //markdownCell.inputArea.renderInput(widget);
    }
  }
}

export default ActivityTool;