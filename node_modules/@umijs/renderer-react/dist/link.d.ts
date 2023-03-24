import React, { PropsWithChildren } from 'react';
import { LinkProps } from 'react-router-dom';
export declare function LinkWithPrefetch(props: PropsWithChildren<{
    prefetch?: boolean;
} & LinkProps & React.RefAttributes<HTMLAnchorElement>>): JSX.Element | null;
