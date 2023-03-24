/// <reference types="react" />
import { IRouteComponents, IRoutesById } from './types';
export declare function getHelmetContext(): {};
export declare function getClientRootComponent(opts: {
    routes: IRoutesById;
    routeComponents: IRouteComponents;
    pluginManager: any;
    location: string;
    loaderData: {
        [routeKey: string]: any;
    };
    manifest: any;
}): Promise<JSX.Element>;
