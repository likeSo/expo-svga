### Expo SVGA
此乃[SVGAPlayer-iOS](https://github.com/svga/SVGAPlayer-iOS)和[SVGAPlayer-Android](https://github.com/svga/SVGAPlayer-Android) 两个SVGA播放器的expo版本。
按理说web的适配也可以加上，基于[SVGAPlayer-Web-Lite](https://github.com/svga/SVGAPlayer-Web-Lite)。但是暂时没时间，而且web的支持从实际业务考虑来说意义不大，SVGA应该主要是语音房App在使用，这类App通常不会考虑Web App...吧。

### 使用
```tsx
          <ExpoSvgaView
            source={{ uri: svgaUriList[index % svgaUriList.length] }}
            // onLoad={({ nativeEvent: { url } }) => console.log(`Loaded: ${url}`)}
            onFinish={() => console.warn("播放结束了")}
            style={styles.view}
            loops={false}
            clearsAfterStop
            fillMode={'clear'}
          />
          <Button
            title="下一个"
            onPress={() => {
              setIndex((prev) => prev + 1);
            }}
          />
```

目前安卓和iOS都测试过，带声音的文件也支持播放。


## 联系我
QQ群：682911244
