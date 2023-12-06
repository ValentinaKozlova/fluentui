import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SwatchColorPikerCellSlots, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const swatchColorPikerCellClassNames: SlotClassNames<SwatchColorPikerCellSlots> = {
  root: 'fui-SwatchColorPikerCell',
  input: 'fui-SwatchColorPikerCell__input',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    ...shorthands.transition('transform', '.5s', 'ease-in-out'),
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 4px black`,
    },
    '&:hover&:active': {
      transform: 'scale(1.2)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 4px black`,
    },
    '&:focus, &:active': {
      ...shorthands.border('2px', 'solid'),
    },
  },
  input: {
    cursor: 'pointer',
    opacity: 0,
    width: 'inherit',
    height: 'inherit',
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  small: {
    width: '24px',
    height: '24px',
  },
  medium: {
    width: '28px',
    height: '28px',
  },
  large: {
    width: '32px',
    height: '32px',
  },
  selected: {
    boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 6px black`,
    ...shorthands.border('none'),
    '&:hover': {
      transform: 'scale(1.2)',
      boxShadow: `inset 0px 0px 0px 2px #00ffff, inset 0px 0px 0px 5px black`,
    },
    '&:hover&:active': {
      transform: 'scale(1.2)',
      boxShadow: `inset 0px 0px 0px 3px #00ffff, inset 0px 0px 0px 6px black`,
    },
  },
});

/**
 * Apply styling to the SwatchColorPikerCell slots based on the state
 */
export const useSwatchColorPikerCellStyles_unstable = (state: SwatchColorPikerCellState): SwatchColorPikerCellState => {
  const styles = useStyles();
  const shape = state.shape === 'circular' ? styles.circular : styles.square;
  const size = state.size || 'medium';
  const selectedStyle = state.selected ? styles.selected : '';

  state.root.className = mergeClasses(
    swatchColorPikerCellClassNames.root,
    styles.root,
    shape,
    styles[size],
    selectedStyle,
    state.root.className,
  );

  state.input.className = mergeClasses(styles.input, state.input.className);
  return state;
};
