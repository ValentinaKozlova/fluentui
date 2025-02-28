import * as React from 'react';
import {
  TagGroup,
  InteractionTag,
  InteractionTagPrimary,
  Tag,
  makeStyles,
  TagGroupProps,
} from '@fluentui/react-components';

const WithTags = () => (
  <TagGroup aria-label="Simple tag group with Tag" role="list">
    <Tag role="listitem">Tag 1</Tag>
    <Tag role="listitem">Tag 2</Tag>
    <Tag role="listitem">Tag 3</Tag>
  </TagGroup>
);

const WithInteractionTags = () => (
  <TagGroup aria-label="Simple tag group with InteractionTag">
    <InteractionTag>
      <InteractionTagPrimary>Tag 1</InteractionTagPrimary>
    </InteractionTag>
    <InteractionTag>
      <InteractionTagPrimary>Tag 2</InteractionTagPrimary>
    </InteractionTag>
    <InteractionTag>
      <InteractionTagPrimary>Tag 3</InteractionTagPrimary>
    </InteractionTag>
  </TagGroup>
);

const WithMultiselectTags = () => {
  const [seletedTags, setSelectedTags] = React.useState([]);
  const selectItem: TagGroupProps['onSelectionChange'] = (_e, { value }) => {
    console.log('test');
    // setSelectedTags([...seletedTags].filter(tag => tag.value !== value));
  };
  return (
    <TagGroup onSelectionChange={selectItem} aria-label="Tag group with Multiselect Tag">
      <InteractionTag>
        <InteractionTagPrimary>Tag 1</InteractionTagPrimary>
      </InteractionTag>
      <InteractionTag>
        <InteractionTagPrimary>Tag 2</InteractionTagPrimary>
      </InteractionTag>
      <InteractionTag>
        <InteractionTagPrimary>Tag 3</InteractionTagPrimary>
      </InteractionTag>
    </TagGroup>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Default = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      Example with Tag:
      <WithTags />
      Example with InteractionTag:
      <WithInteractionTags />
      Example with Multiselect Tag:
      <WithMultiselectTags />
    </div>
  );
};
