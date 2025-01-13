import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  // @ts-ignore
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href={{ pathname : '/about'}}>Go to about</Link>
    </View>
  );
}
