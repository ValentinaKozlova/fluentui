import * as React from 'react';
import { InteractionTagState, InteractionTagContextValues } from './InteractionTag.types';

export function useInteractionTagContextValues_unstable(state: InteractionTagState): InteractionTagContextValues {
  const {
    appearance,
    disabled,
    handleTagDismiss,
    handleTagSelect,
    interactionTagPrimaryId,
    selected,
    shape,
    size,
    value,
    selectedValues,
  } = state;

  return {
    interactionTag: React.useMemo(
      () => ({
        appearance,
        disabled,
        handleTagDismiss,
        handleTagSelect,
        interactionTagPrimaryId,
        selected,
        shape,
        size,
        value,
        selectedValues,
      }),
      [
        appearance,
        disabled,
        handleTagDismiss,
        handleTagSelect,
        interactionTagPrimaryId,
        selected,
        shape,
        size,
        value,
        selectedValues,
      ],
    ),
  };
}
