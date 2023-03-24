import type { DependencyList } from 'react';
export declare const isDeepEqual: (a: any, b: any, ignoreKeys?: string[]) => boolean;
export declare function useDeepCompareEffect(effect: React.EffectCallback, dependencies: DependencyList, ignoreKeys?: string[]): void;
export declare function useDeepCompareEffectDebounce(effect: React.EffectCallback, dependencies: DependencyList, ignoreKeys?: string[], waitTime?: number): void;
