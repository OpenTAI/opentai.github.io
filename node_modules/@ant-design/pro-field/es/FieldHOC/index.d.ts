import React from 'react';
import type { ProFieldLightProps } from '../index';
declare function FieldHOC<T extends ProFieldLightProps>(props: T & {
    children: React.ReactNode;
    isLight?: boolean;
}): JSX.Element;
export default FieldHOC;
