import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { useTagGroupContext_unstable } from '../../contexts/tagGroupContext';

/**
 * Create the state required to render InteractionTag.
 *
 * The returned state can be modified with hooks such as useInteractionTagStyles_unstable,
 * before being passed to renderInteractionTag_unstable.
 *
 * @param props - props from this instance of InteractionTag
 * @param ref - reference to root HTMLDivElement of InteractionTag
 */
export const useInteractionTag_unstable = (
  props: InteractionTagProps,
  ref: React.Ref<HTMLDivElement>,
): InteractionTagState => {
  const {
    handleTagDismiss,
    size: contextSize,
    disabled: contextDisabled,
    appearance: contextAppearance,
    handleTagSelect,
    selectedValues = [], // TODO remove from state, it shoyldn't fgo to deeper state
  } = useTagGroupContext_unstable();

  const id = useId('fui-InteractionTag-', props.id);

  console.log(selectedValues);

  const interactionTagPrimaryId = useId('fui-InteractionTagPrimary-');

  const {
    appearance = contextAppearance ?? 'filled',
    disabled = false,
    selected = false,
    shape = 'rounded',
    size = contextSize,
    value = id,
  } = props;

  // TOOD selected from props and from selection itself, what priority is higher?
  return {
    appearance,
    disabled: contextDisabled ? true : disabled,
    handleTagDismiss,
    handleTagSelect,
    interactionTagPrimaryId,
    selected: selectedValues?.includes(value) ?? selected,
    shape,
    size,
    value,
    selectedValues,

    components: {
      root: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        disabled: contextDisabled ? true : disabled,
        id,
      }),
      { elementType: 'div' },
    ),
  };
};
