import { View } from "react-native";
import {Link} from "expo-router";
import { Button } from "react-native-paper";

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
        <Link href={{ pathname : '/login/login'}} asChild>
            <Button icon="home" mode="contained">
                Login
            </Button>
        </Link>
    </View>
  );
}
