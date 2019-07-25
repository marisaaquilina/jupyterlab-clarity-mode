import { style } from 'typestyle';

export namespace ActivityBarStyleClasses {
  export const newCellButton = style({
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    padding: 4,
    margin: 2
  });
  
  export const newCellButtonActive = style({
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    padding: 4,
    margin: 2
  });
  
  export const createCellContainer = style({
    backgroundColor: '#111',
    border: 'none',
    padding: 5,
    margin: 10,
    borderRadius: 5
  });

  export const cellActions = style({
    float: 'right',
    fontSize: 20,
  });
}