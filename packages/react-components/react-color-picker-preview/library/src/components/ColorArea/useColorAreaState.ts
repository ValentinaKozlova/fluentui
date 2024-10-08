import * as React from 'react';
import { clamp, useEventCallback } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { colorAreaCSSVars } from './useColorAreaStyles.styles';
import type { ColorAreaState, ColorAreaProps } from './ColorArea.types';
import { tinycolor } from '@ctrl/tinycolor';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';

const { areaXProgressVar, areaYProgressVar, thumbColorVar, mainColorVar } = colorAreaCSSVars;

const MIN = 0;
const MAX = 100;

const getPercent = (value: number) => {
  return ((value - MIN) / (MAX - MIN)) * 100;
};

type Coordinates = {
  x: number;
  y: number;
};

export const useColorAreaState_unstable = (state: ColorAreaState, props: ColorAreaProps) => {
  'use no memo';

  const { targetDocument } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const { onChange = onChangeFromContext, color } = props;

  const hsvColor = tinycolor(color).toHsv();
  const saturation = hsvColor.s * 100;
  const value = hsvColor.v * 100;
  const [coordinates, setCoordinates] = React.useState<Coordinates>({ x: saturation, y: value });

  function getCoordinates(event: React.MouseEvent<HTMLDivElement>) {
    const ref = state.root.ref as React.MutableRefObject<HTMLInputElement>;
    const rect = ref ? ref.current?.getBoundingClientRect() : event.currentTarget.getBoundingClientRect();
    const newX = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const newY = 100 - Math.round(((event.clientY - rect.top) / rect.height) * 100);

    return {
      x: clamp(newX, MIN, MAX),
      y: clamp(newY, MIN, MAX),
    };
  }

  const requestColorChange = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const _coordinates = getCoordinates(event);
    setCoordinates(_coordinates);
    const newColor = { h: hsvColor.h, s: _coordinates.x / 100, v: coordinates.y / 100 };
    onChange?.(event, {
      event,
      color: tinycolor(newColor).toHexString(),
    });
  });

  const _onMouseUp = useEventCallback(() => {
    targetDocument?.removeEventListener('mousemove', requestColorChange as unknown as EventListener);
    targetDocument?.removeEventListener('mouseup', _onMouseUp as unknown as EventListener);
  });

  const _onMouseDown = useEventCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    requestColorChange(event);
    targetDocument?.addEventListener('mousemove', requestColorChange as unknown as EventListener);
    targetDocument?.addEventListener('mouseup', _onMouseUp as unknown as EventListener);
  });

  const inputOnChange = state.inputX.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    const newColor = { h: hsvColor.h, s: newValue / 100, v: coordinates.y / 100 };
    inputOnChange?.(event);
    onChange?.(event, {
      type: 'change',
      event,
      color: tinycolor(newColor).toHexString(),
    });
  });

  const _onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('down');
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      if (event.key === 'ArrowUp') {
        setCoordinates({ x: coordinates.x, y: clamp(coordinates.y + 1, MIN, MAX) });
      } else {
        setCoordinates({ x: coordinates.x, y: clamp(coordinates.y - 1, MIN, MAX) });
      }
    }
  });

  const rootVariables = {
    [areaXProgressVar]: `${getPercent(coordinates.x)}%`,
    [areaYProgressVar]: `${getPercent(coordinates.y)}%`,
    [thumbColorVar]: 'transparent',
    [mainColorVar]: color || '#fff',
  };

  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  state.inputX.value = coordinates.x;
  state.inputY.value = coordinates.y;
  state.inputX.onChange = _onChange;
  state.inputX.onKeyDown = _onKeyDown;
  state.root.onMouseDown = _onMouseDown;
  state.root.onMouseUp = _onMouseUp;

  return state;
};
