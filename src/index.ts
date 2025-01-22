// Reexport the native module. On web, it will be resolved to ExpoSvgaModule.web.ts
// and on native platforms to ExpoSvgaModule.ts
export { default } from './ExpoSvgaModule';
export { default as ExpoSvgaView } from './ExpoSvgaView';
export * from  './ExpoSvga.types';
