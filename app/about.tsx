import {Text, View} from "react-native";
import {Stack} from "expo-router";
import {Button, Icon, ListItem} from "@rneui/themed";

const about = () => {
    return (
        <View>
            <Text>Welcome (about).</Text>
            <Button radius={"sm"} type="solid">
                Save
                <Icon name="save" color="white" />
            </Button>
            <ListItem>
                <Icon name="inbox" type="material-community" color="grey" />
                <ListItem.Content>
                    <ListItem.Title>Inbox</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem>
                <Icon name="trash-can-outline" type="material-community" color="grey" />
                <ListItem.Content>
                    <ListItem.Title>Trash</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        </View>
    )
}


export default about;
