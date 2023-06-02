import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {themeColor, useTheme} from "react-native-rapi-ui";
import TabBarIcon from "../../components/utils/TabBarIcon";
import TabBarText from "../../components/utils/TabBarText";

import Map from "../../screens/Map";
import {MainTabsParamList} from "../../types/navigation";
import Settings from "../../screens/Settings";
import Routes from "../../screens/Routes";

const Tabs = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
    const {isDarkmode} = useTheme();
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
                    backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
                },
            }}
        >
            {/* these icons using Ionicons */}
            <Tabs.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarLabel: ({focused}) => (
                        <TabBarText focused={focused} title="Map"/>
                    ),
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon focused={focused} icon={"ios-map-outline"}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="Routes"
                component={Routes}
                options={{
                    tabBarLabel: ({focused}) => (
                        <TabBarText focused={focused} title="Routes"/>
                    ),
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon focused={focused} icon={"address"} family={"Entypo"}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: ({focused}) => (
                        <TabBarText focused={focused} title="Settings"/>
                    ),
                    tabBarIcon: ({focused}) => (
                        <TabBarIcon focused={focused} icon={"md-settings"}/>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default MainTabs;
