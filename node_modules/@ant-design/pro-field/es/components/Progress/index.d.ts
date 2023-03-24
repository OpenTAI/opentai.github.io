import React from 'react';
import 'antd/es/input-number/style';
import 'antd/es/progress/style';
export declare function getProgressStatus(text: number): 'success' | 'exception' | 'normal' | 'active';
declare const _default: React.ForwardRefExoticComponent<import("@ant-design/pro-provider").BaseProFieldFC & import("@ant-design/pro-provider").ProRenderFieldPropsType & {
    text: string | number;
    placeholder?: any;
} & React.RefAttributes<any>>;
export default _default;
