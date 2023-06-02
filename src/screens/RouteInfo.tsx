import React from "react";
import {useWindowDimensions, View,Pressable} from "react-native";
import {MainStackPageProps} from "../types/navigation";
import {
    Layout,
    TopNav,
    themeColor,
    useTheme,
} from "react-native-rapi-ui";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {SceneMap, TabView} from "react-native-tab-view";
import HoursList from "../components/HoursList";
import RouteStopPoints from "../components/RouteStopPoints";
import {routeDirectionAtom} from "../store";
import {useAtom} from "jotai";
import {CDefaultRouteDirection} from "../constants";

export default function ({navigation}: MainStackPageProps<"RouteInfo">) {
    const [routeDirection, setRouteDirection] = useAtom(routeDirectionAtom)
    const {isDarkmode} = useTheme();
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'stopPoints', title: 'Stop Points'},
        {key: 'weekDays', title: 'Weekdays'},
        {key: 'weekendDays', title: 'Weekend'},
    ]);

    const handleRouteDirection = () => {
        setRouteDirection(prev => prev === CDefaultRouteDirection ? 'reversed' : 'direct')
    }

    return (
        <Layout>
            <TopNav
                middleContent={`Route Name (${routeDirection})`}
                leftContent={
                    <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.dark}
                    />
                }
                leftAction={() => navigation.goBack()}
                rightContent={
                    <Pressable onPressOut={handleRouteDirection}>
                        {({pressed}) => (
                            <Entypo
                                name="retweet"
                                size={20}
                                style={{opacity: pressed ? 0.5 : 1}}
                                color={isDarkmode ? themeColor.white100 : themeColor.dark}
                            />
                        )}</Pressable>

                }
                rightAction={() => {

                }}
            />
                <TabView
                    navigationState={{index, routes}}
                    renderScene={SceneMap({
                        stopPoints: RouteStopPoints,
                        weekDays: HoursList,
                        weekendDays: HoursList,
                    })}
                    onIndexChange={setIndex}
                    initialLayout={{
                        width: layout.width,
                        height: layout.height
                }}
                />
        </Layout>
    );
}
