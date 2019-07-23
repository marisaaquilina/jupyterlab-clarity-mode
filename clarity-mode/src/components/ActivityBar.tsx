import * as React from 'react';

import { useState } from 'react';

import { MarkdownCell, CodeCell, } from '@jupyterlab/cells';

import StyleClasses from './styles';

import {
  NotebookActions, INotebookTracker,
} from '@jupyterlab/notebook';
import { JupyterFrontEnd } from '@jupyterlab/application';

const ActivityBarStyleClasses = StyleClasses.ActivityBarStyleClasses;

export function createRunCommand(app: JupyterFrontEnd, notebookTracker: INotebookTracker) {
  // const shiftRunCommand = "rich-text:run-markdown-cell-and-advance";
  // app.commands.addCommand(shiftRunCommand, {
  //   execute: () => {
  //     app.commands.execute("rich-text:run-markdown-cell")
  //     app.commands.execute("notebook:run-cell-and-select-next");
  //     // NotebookActions.run((nbTracker.currentWidget as NotebookPanel).content);
  //     console.log(app.commands);
  //   }
  // });
  
  // app.commands.addKeyBinding({
  //   command: shiftRunCommand,
  //   keys: ["Shift Enter"],
  //   selector: '.header'
  // });
  console.log(1);
}

export function CreateCell(props: any) {
  const [codeActive, setCodeActive] = useState(props.activeCellType instanceof CodeCell);
  const [mdActive, setMdActive] = useState(props.activeCellType instanceof MarkdownCell);
  return (
    <div className={ActivityBarStyleClasses.createCellContainer}>
       <button
        className={mdActive ? ActivityBarStyleClasses.newCellButtonActive : ActivityBarStyleClasses.newCellButton}
        onClick={() => {
          setCodeActive(false); 
          setMdActive(true);
          if (props.activeCellType && props.activeCellType instanceof MarkdownCell) {
            //NotebookActions.changeCellType(this._notebook, event.target.value as nbformat.CellType);
            console.log('instanceof MarkdownCell')
          }
        }}
      >
        Text
      </button>
      <button
        className={codeActive ? ActivityBarStyleClasses.newCellButtonActive : ActivityBarStyleClasses.newCellButton}
        onClick={() => {
          setCodeActive(true);
          setMdActive(false);
          if (props.activeCellType && props.activeCellType instanceof CodeCell) {
            //NotebookActions.changeCellType(this._notebook, event.target.value as nbformat.CellType);
            console.log('instanceof CodeCell')
          }
        }}
      >
        Code
      </button>
      <button
      className={ActivityBarStyleClasses.newCellButton}
      onClick={(event) => { 
        NotebookActions.insertBelow(props.panelWidget.content);
        if (mdActive) {
          NotebookActions.changeCellType(props.panelWidget.content, 'markdown')
        };
      }
      }>+</button>
    </div>
  );
}