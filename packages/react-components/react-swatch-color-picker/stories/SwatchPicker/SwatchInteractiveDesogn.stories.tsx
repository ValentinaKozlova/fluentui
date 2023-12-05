import * as React from 'react';
import { SwatchPicker, SwatchPickerProps, SwatchColorPikerCell } from '@fluentui/react-swatch-color-picker';
import { makeStyles, shorthands, mergeClasses } from '@fluentui/react-components';
import { background } from '@storybook/theming';

const customStyles = makeStyles({
  root: {
    ...shorthands.borderRadius('8px'),
    boxShadow: 'rgb(46 46 46 / 43%) 0px 1px 2px 0px',
    ...shorthands.transition('all', '.5s', 'ease-in-out'),
    '&:hover': {
      transform: 'scale(1.3)',
    },
  },
  selected: {
    boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 6px black`,
    ...shorthands.border('none'),
    '&:hover': {
      transform: 'scale(1.3)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 5px black`,
    },
    '&:hover&:active': {
      transform: 'scale(1.3)',
      boxShadow: `inset 0px 0px 0px 3px #00ffff, inset 0px 0px 0px 6px black`,
    },
  },
  picker: {
    gridTemplateColumns: `repeat(4, 30px)`,
    columnGap: '4px',
    rowGap: '4px',
  },
  swatch: {
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 4px black`,
    },
    '&:hover&:active': {
      transform: 'scale(1.2)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 4px black`,
    },
  },
});

const colorsLarge = [
  {
    id: 0,
    swatch: '#2886DE',
  },
  {
    id: 1,
    swatch: '#464FEB',
  },
  {
    id: 2,
    swatch: '#CC007E',
  },
  {
    id: 3,
    swatch: '#008AA9',
  },
  {
    id: 4,
    swatch: '#479EF5',
  },
  {
    id: 5,
    swatch: '#515EF5',
  },
  {
    id: 6,
    swatch: '#E3008C',
  },
  {
    id: 7,
    swatch: '#0099BC',
  },
  {
    id: 8,
    swatch: '#62ABF5',
  },
  {
    id: 9,
    swatch: '#5F71FA',
  },
  {
    id: 10,
    swatch: '#E61C99',
  },
  {
    id: 11,
    swatch: '#18A4C4',
  },
  {
    id: 12,
    swatch: '#77B7F7',
  },
  {
    id: 13,
    swatch: '#7385FF',
  },
  {
    id: 14,
    swatch: '#EA38A6',
  },
  {
    id: 15,
    swatch: '#31AFCC',
  },
];

export const InteractiveDesignStories = (props: Partial<SwatchPickerProps>) => {
  const [gridColor, setGridColor] = React.useState('');
  const styles = customStyles();

  return (
    <>
      <h2>Grid with a lots of colors</h2>
      <SwatchPicker
        layout="grid"
        value={gridColor}
        onChange={(_, data) => setGridColor(data.value)}
        aria-labelledby="colors"
        style={{ gridTemplateColumns: `repeat(4, 28px)` }}
      >
        {colorsLarge.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
        ))}
      </SwatchPicker>
      <SwatchPicker
        layout="grid"
        value={gridColor}
        onChange={(_, data) => setGridColor(data.value)}
        aria-labelledby="colors"
        style={{ gridTemplateColumns: `repeat(4, 28px)`, gap: 4, marginTop: 10 }}
      >
        {colorsLarge.map(item => (
          <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
        ))}
      </SwatchPicker>
      <div style={{ backgroundColor: 'black', padding: 40, marginTop: 10 }}>
        <SwatchPicker
          layout="grid"
          value={gridColor}
          onChange={(_, data) => setGridColor(data.value)}
          aria-labelledby="colors"
          style={{ gridTemplateColumns: `repeat(4, 28px)` }}
        >
          {colorsLarge.map(item => (
            <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
          ))}
        </SwatchPicker>
        <SwatchPicker
          layout="grid"
          value={gridColor}
          onChange={(_, data) => setGridColor(data.value)}
          aria-labelledby="colors"
          style={{ gridTemplateColumns: `repeat(4, 28px)`, gap: 4, marginTop: 10 }}
        >
          {colorsLarge.map(item => (
            <SwatchColorPikerCell key={item.id} id={item.id} name="color" value={item.swatch} swatch={item.swatch} />
          ))}
        </SwatchPicker>
      </div>
      Background can be changed
      <div style={{ backgroundColor: gridColor, width: 50, height: 50 }} />
    </>
  );
};
