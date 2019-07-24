import * as React from 'react';

import { useState } from 'react';

import { MarkdownCell, CodeCell, } from '@jupyterlab/cells';

import StyleClasses from './styles';

//import logo from '../../'

import {
  NotebookActions, //INotebookTracker,
} from '@jupyterlab/notebook';
//import { JupyterFrontEnd } from '@jupyterlab/application';

const ActivityBarStyleClasses = StyleClasses.ActivityBarStyleClasses;

export function CreateCell(props: any) {
  const [codeActive, setCodeActive] = useState(true);
  codeActive;
  const [mdActive, setMdActive] = useState(false);
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
      {props.panelWidget.content.mode && <button
      className={ActivityBarStyleClasses.newCellButton}
      onClick={(event) => { 
        NotebookActions.deleteCells(props.panelWidget.content);
      }
      }>-</button>}
      
    </div>
  );
}