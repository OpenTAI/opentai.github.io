import type { RequestData, UseFetchDataAction, UseFetchProps } from './typing';
declare const useFetchData: <T extends RequestData<any>>(getData: ((params?: {
    pageSize: number;
    current: number;
}) => Promise<T>) | undefined, defaultData: any[] | undefined, options: UseFetchProps) => UseFetchDataAction;
export default useFetchData;
