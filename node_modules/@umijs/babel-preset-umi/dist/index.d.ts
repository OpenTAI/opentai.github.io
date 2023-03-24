interface IOpts {
    presetEnv: any;
    presetReact: any;
    presetTypeScript: any;
    pluginTransformRuntime: any;
    pluginLockCoreJS: any;
    pluginDynamicImportNode: any;
    pluginAutoCSSModules: any;
    stripExports: {
        exports: string[];
    };
    classPropertiesLoose: any;
    pluginStyledComponents: any;
}
declare const _default: (_context: any, opts: IOpts) => {
    presets: any[][];
    plugins: any[];
};
export default _default;
