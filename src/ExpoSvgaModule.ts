import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSvgaModuleEvents } from './ExpoSvga.types';

declare class ExpoSvgaModule extends NativeModule<ExpoSvgaModuleEvents> {
  PI: number;
  // 这俩方法只有安卓实现了；安卓和iOS原生框架的API不一致，没办法
  setLogEnabled: (enabled: boolean) => void;
  loggerEnabled: () => boolean;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSvgaModule>('ExpoSvga');
