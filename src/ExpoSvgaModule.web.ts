import { registerWebModule, NativeModule } from 'expo';

import { ExpoSvgaModuleEvents } from './ExpoSvga.types';

class ExpoSvgaModule extends NativeModule<ExpoSvgaModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoSvgaModule);
