import * as React from 'react';

import { ExpoSvgaViewProps } from './ExpoSvga.types';

export default function ExpoSvgaView(props: ExpoSvgaViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
