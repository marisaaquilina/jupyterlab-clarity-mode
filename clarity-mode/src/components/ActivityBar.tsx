import * as React from 'react';

import { useState } from 'react';

import StyleClasses from './styles';

import {
  NotebookActions, INotebookTracker
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
  const [codeActive, setCodeActive] = useState(true);
  const [mdActive, setMdActive] = useState(false);
  return (
    
    <div className={ActivityBarStyleClasses.createCellContainer}>
      <button
        className={codeActive ? ActivityBarStyleClasses.newCellButtonActive : ActivityBarStyleClasses.newCellButton}
        onClick={() => {
          setCodeActive(true);
          setMdActive(false);
        }}
      >
        Code
      </button>
      <button
        className={mdActive ? ActivityBarStyleClasses.newCellButtonActive : ActivityBarStyleClasses.newCellButton}
        onClick={() => {
          setCodeActive(false);
          setMdActive(true);
        }}
      >
        Text
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