import * as React from 'react';
import type { TagGroupContextValues, TagGroupState } from './TagGroup.types';

export function useTagGroupContextValues_unstable(state: TagGroupState): TagGroupContextValues {
  const { handleTagDismiss, handleTagSelect, size, disabled, appearance, dismissible, role, selectedValues } = state;
  return {
    tagGroup: React.useMemo(
      () => ({ handleTagDismiss, handleTagSelect, size, disabled, appearance, dismissible, role, selectedValues }),
      [handleTagDismiss, handleTagSelect, size, disabled, appearance, dismissible, role, selectedValues],
    ),
  };
}
