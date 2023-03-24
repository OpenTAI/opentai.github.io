import type { AvatarProps, BreadcrumbProps, TagType } from 'antd';
import { Breadcrumb } from 'antd';
import * as React from 'react';
import type { ContentWidth } from '../../defaultSettings';
import 'antd/es/breadcrumb/style';
export interface PageHeaderProps {
    backIcon?: React.ReactNode;
    prefixCls?: string;
    title?: React.ReactNode;
    subTitle?: React.ReactNode;
    style?: React.CSSProperties;
    childrenContentStyle?: React.CSSProperties;
    breadcrumb?: BreadcrumbProps | React.ReactElement<typeof Breadcrumb>;
    breadcrumbRender?: (props: PageHeaderProps, defaultDom: React.ReactNode) => React.ReactNode;
    tags?: React.ReactElement<TagType> | React.ReactElement<TagType>[];
    footer?: React.ReactNode;
    extra?: React.ReactNode;
    avatar?: AvatarProps;
    onBack?: (e?: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    contentWidth?: ContentWidth;
    ghost?: boolean;
    children?: React.ReactNode;
}
declare const PageHeader: React.FC<PageHeaderProps>;
export { PageHeader };
