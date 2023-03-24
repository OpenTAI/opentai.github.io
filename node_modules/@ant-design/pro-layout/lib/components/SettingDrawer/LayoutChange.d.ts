import React from 'react';
import type { ProSettings } from '../../defaultSettings';
import type { SettingItemProps } from './index';
export declare const renderLayoutSettingItem: (item: SettingItemProps) => JSX.Element;
declare const LayoutSetting: React.FC<{
    settings: Partial<ProSettings>;
    changeSetting: (key: string, value: any, hideLoading?: boolean) => void;
    hashId: string;
    prefixCls: string;
}>;
export { LayoutSetting };
