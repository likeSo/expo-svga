import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoSvgaViewProps } from './ExpoSvga.types';

const NativeView: React.ComponentType<ExpoSvgaViewProps> =
  requireNativeView('ExpoSvga');

export default function ExpoSvgaView(props: ExpoSvgaViewProps) {
  return <NativeView {...props} />;
}
