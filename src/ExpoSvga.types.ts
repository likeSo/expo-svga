import type { StyleProp, ViewStyle, Image, ViewProps } from "react-native";

export type OnLoadEventPayload = {
  url: string;
};

export type OnAnimateToPercentEventPayload = {
  percent: number;
};

export type ExpoSvgaModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type ExpoSvgaSource = {
  uri: string;
};

type ExpoSvgaFillMode = 'backward' | 'forward' | 'clear'

export type ExpoSvgaViewProps = {
  source: ExpoSvgaSource;
  loops?: boolean;
  clearsAfterStop?: boolean;
  fillMode?: ExpoSvgaFillMode;
  onFinish?: (event: { nativeEvent: any }) => void;
  onAnimateToPercent?: (event: {
    nativeEvent: OnAnimateToPercentEventPayload;
  }) => void;
} & ViewProps;
