interface RouteLoaders {
    [key: string]: () => Promise<any>;
}
interface CreateRequestHandlerOptions {
    routesWithServerLoader: RouteLoaders;
    PluginManager: any;
    manifest: (() => {
        assets: Record<string, string>;
    }) | {
        assets: Record<string, string>;
    };
    getPlugins: () => any;
    getValidKeys: () => any;
    getRoutes: (PluginManager: any) => any;
    getClientRootComponent: (PluginManager: any) => any;
    helmetContext: any;
    createHistory: (opts: any) => any;
}
export declare function createMarkupGenerator(opts: CreateRequestHandlerOptions): (url: string) => Promise<unknown>;
export default function createRequestHandler(opts: CreateRequestHandlerOptions): (req: any, res: any, next: any) => Promise<any>;
export {};
