import React from 'react';
import type { CheckCardGroupProps } from './Group';
import CheckCardGroup from './Group';
interface CheckCardProps {
    /**
     * 自定义前缀
     *
     * @ignore
     */
    prefixCls?: string;
    /** Change 回调 */
    onChange?: (checked: boolean) => void;
    /** Click 回调 */
    onClick?: (e: Event) => void;
    /** 鼠标进入时的回调 */
    onMouseEnter?: (event: MouseEvent) => void;
    /** 鼠标出来时的回调 */
    onMouseLeave?: (event: MouseEvent) => void;
    /**
     * 默认是否勾选
     *
     * @default false
     * @title 默认勾选
     */
    defaultChecked?: boolean;
    /**
     * 强制勾选
     *
     * @default false
     * @title 强制勾选
     */
    checked?: boolean;
    /**
     * 不可用
     *
     * @default false
     * @title 禁用
     */
    disabled?: boolean;
    /**
     * 选项卡样式
     *
     * @ignore
     */
    style?: React.CSSProperties;
    /**
     * 选项卡 className
     *
     * @ignore
     */
    className?: string;
    /**
     * 左侧头像展示，可以是一个链接也可以是是一个 ReactNode
     *
     * @title 头像
     */
    avatar?: React.ReactNode;
    /**
     * 标题展示
     *
     * @title 标题
     */
    title?: React.ReactNode;
    /**
     * 描述展示
     *
     * @title 描述
     */
    description?: React.ReactNode;
    /**
     * 选项值
     *
     * @title 值
     */
    value?: any;
    /**
     * 内容是否在加载中
     *
     * @default false
     * @title 加载中
     */
    loading?: boolean;
    /**
     * 图片封面默认，该模式下其他展示值被忽略
     *
     * @title 卡片背景图片
     */
    cover?: React.ReactNode;
    /**
     * 组件尺寸，支持大，中，小三种默认尺寸，用户可以自定义宽高
     *
     * @default default
     * @title 选择框大小
     */
    size?: 'large' | 'default' | 'small' | undefined;
    /**
     * 是否显示边框
     *
     * @default true
     * @title 显示边框
     */
    bordered?: boolean;
    /**
     * 卡片右上角的操作区域
     *
     * @title 操作栏
     */
    extra?: React.ReactNode;
}
export interface CheckCardState {
    checked: boolean;
}
declare const CheckCard: React.FC<CheckCardProps> & {
    Group: typeof CheckCardGroup;
};
export type { CheckCardGroupProps, CheckCardProps };
export default CheckCard;
