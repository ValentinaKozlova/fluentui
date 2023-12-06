import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { RadioProps, RadioSlots } from '@fluentui/react-components';

export type SwatchColorPikerCellSlots = Pick<RadioSlots, 'root' | 'input'>;

/**
 * SwatchColorPikerCell Props
 */
export type SwatchColorPikerCellProps = ComponentProps<SwatchColorPikerCellSlots> &
  Pick<RadioProps, 'name' | 'value'> & {
    shape?: 'circular' | 'square';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    swatch: string;
  };

/**
 * State used in rendering SwatchColorPikerCell
 */
export type SwatchColorPikerCellState = ComponentState<SwatchColorPikerCellSlots> &
  Required<Pick<SwatchColorPikerCellProps, 'name' | 'value' | 'onChange' | 'disabled'>> &
  Partial<Omit<SwatchColorPikerCellProps, 'name' | 'value' | 'onChange' | 'disabled'>> & {
    selected?: boolean;
  };
