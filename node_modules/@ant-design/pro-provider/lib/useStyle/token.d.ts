import type { GlobalToken } from 'antd/es/theme/interface';
export declare const defaultToken: GlobalToken;
export declare const hashCode: (str: string, seed?: number) => number;
export declare const emptyTheme: import("@ant-design/cssinjs").Theme<any, any>;
export declare const token: {
    theme: import("@ant-design/cssinjs").Theme<any, any>;
    token: GlobalToken;
    hashId: string;
};
export declare const useToken: () => {
    theme: import("@ant-design/cssinjs").Theme<any, any>;
    token: GlobalToken;
    hashId: string;
};
export declare const darkAlgorithm: () => GlobalToken;
export declare const defaultAlgorithm: () => GlobalToken;
export declare const compactAlgorithm: () => GlobalToken;
