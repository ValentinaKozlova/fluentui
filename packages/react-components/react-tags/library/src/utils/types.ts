import * as React from 'react';

export type TagAppearance = 'filled' | 'outline' | 'brand';
export type TagShape = 'rounded' | 'circular';
export type TagSize = 'extra-small' | 'small' | 'medium';

export type TagValue = string;

export type TagDismissData<Value = TagValue> = {
  value: Value;
};

export type TagSelectData<Value = TagValue> = {
  value: Value;
};

export type TagDismissEvent = React.MouseEvent | React.KeyboardEvent;

export type TagSelectEvent = React.MouseEvent | React.KeyboardEvent;

export type TagDismissHandler<Value = TagValue> = (e: TagDismissEvent, data: TagDismissData<Value>) => void;

export type TagSelectionHandler<Value = TagValue> = (e: TagSelectEvent, data: TagSelectData<Value>) => void;
