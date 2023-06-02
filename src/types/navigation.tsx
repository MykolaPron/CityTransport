import {CompositeScreenProps, NavigatorScreenParams} from "@react-navigation/native";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {NativeStackScreenProps} from "@react-navigation/native-stack";



export type MainStackParamList = {
    MainTabs: NavigatorScreenParams<MainTabsParamList>;
    RouteInfo: undefined;
};

export type MainTabsParamList = {
    Map: undefined;
    Routes: undefined;
    Settings: undefined;
};

export type MainStackPageProps<T extends keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>

export type MainTabPageProps<T extends keyof MainTabsParamList> =
    CompositeScreenProps<BottomTabScreenProps<MainTabsParamList, T>,
        NativeStackScreenProps<MainStackParamList>>
