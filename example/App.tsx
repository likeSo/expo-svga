import { useEvent } from "expo";
import ExpoSvga, { ExpoSvgaView } from "expo-svga";
import ExpoSvgaModule from "expo-svga/ExpoSvgaModule";
import { useState } from "react";
import { Button, SafeAreaView, ScrollView, Text, View } from "react-native";

/**
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275154284112757.svga
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275155334879886.svga
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275166228604031.svga
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275152111104509.svga
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275151674066591.svga
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275151175788375.svga
 * http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275150568192015.svga
 * 带声音的：
 * http://watermelon-talk.oss-cn-beijing.aliyuncs.com/webStorage/web_1716885620550544.svga
 */

const svgaUriList = [
  "http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275154284112757.svga",
  "http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275155334879886.svga",
  "http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275166228604031.svga",
  "http://chat-bucket-vv.oss-cn-beijing.aliyuncs.com/webStorage/web_17275152111104509.svga",
  "http://watermelon-talk.oss-cn-beijing.aliyuncs.com/webStorage/web_1716885620550544.svga",
];

export default function App() {
  const onChangePayload = useEvent(ExpoSvga, "onChange");
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Module API Example</Text>
        <Group name="Constants">
          <Text>{ExpoSvga.PI}</Text>
        </Group>
        <Group name="Functions">
          <Text>{ExpoSvga.hello()}</Text>
        </Group>
        <Group name="Async functions">
          <Button
            title="Set value"
            onPress={async () => {
              await ExpoSvga.setValueAsync("Hello from JS!");
            }}
          />
        </Group>
        <Group name="Events">
          <Text>{onChangePayload?.value}</Text>
        </Group>
        <Group name="Views">
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
        </Group>
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  view: {
    flex: 1,
    height: 200,
    backgroundColor: "green",
  },
};
