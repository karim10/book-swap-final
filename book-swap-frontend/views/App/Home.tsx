import { createBottomTabNavigator } from "react-navigation";
import { Feed } from './Feed';
import MyLibrary from "./MyLibrary";
import Settings from "./Settings";
import Inbox from "./Inbox";
export default createBottomTabNavigator({
    MyLibrary: {
        screen: MyLibrary,
    },
    Feed: {
        screen: Feed
    },
    Settings: {
        screen: Settings
    },
    Inbox: {
        screen: Inbox
    }
})