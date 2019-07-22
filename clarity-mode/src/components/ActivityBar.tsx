import * as React from 'react';

import { useState, useEffect } from 'react';

import StyleClasses from './styles';

import {
  NotebookActions
} from '@jupyterlab/notebook';

const ActivityBarStyleClasses = StyleClasses.ActivityBarStyleClasses;
export function CreateInsertButton(props: any) {
  return (
    <button
      className={ActivityBarStyleClasses.newCellButton}
      onClick={(event) => {
        NotebookActions.insertBelow(props.panelWidget.content);
      }}
    >
      +
    </button>
  );
}


export function CreateCell(props: any) {
  const [codeActive, setCodeActive] = useState(true);
  const [mdActive, setMdActive] = useState(false);
  useEffect(() => {
    // Update the document title using the browser API
    const mdIsActive = mdActive;
    const codeIsActive = codeActive;
    if (mdIsActive) {
      console.log('Markdown cell');
    }
    if (codeIsActive) {
      console.log('Code cell');
    }
  });
  return (
    <div className={ActivityBarStyleClasses.createCellContainer}>
      {codeActive && (
        <button
          className={ActivityBarStyleClasses.newCellButtonActive}
          onClick={() => {
            setCodeActive(true);
            setMdActive(false);
          }}
        >
          Code
        </button>
      )}
      {!codeActive && (
        <button
          className={ActivityBarStyleClasses.newCellButton}
          onClick={() => {
            setCodeActive(true);
            setMdActive(false);
          }}
        >
          Code
        </button>
      )}
      {mdActive && (
        <button
          className={ActivityBarStyleClasses.newCellButtonActive}
          onClick={() => {
            setCodeActive(false);
            setMdActive(true);
          }}
        >
          Text
        </button>
      )}
      {!mdActive && (
        <button
          className={ActivityBarStyleClasses.newCellButton}
          onClick={() => {
            setCodeActive(false);
            setMdActive(true);
          }}
        >
          Text
        </button>
      )}
      <CreateInsertButton panelWidget={props.panelWidget} />
    </div>
  
  );
}