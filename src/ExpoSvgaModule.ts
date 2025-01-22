import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSvgaModuleEvents } from './ExpoSvga.types';

declare class ExpoSvgaModule extends NativeModule<ExpoSvgaModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSvgaModule>('ExpoSvga');
