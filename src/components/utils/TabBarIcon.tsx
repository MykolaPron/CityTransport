import React from "react";
import {themeColor, useTheme} from "react-native-rapi-ui";
import * as Family from "@expo/vector-icons";

type TTabBarProps = {
    icon: any,
    focused: boolean,
    family?: keyof typeof Family
}
const TabBar: React.FC<TTabBarProps> = ({icon, focused, family = 'Ionicons'}) => {
    const {isDarkmode} = useTheme();
    const Component = Family[family]

    return (
        <Component
            name={icon}
            style={{marginBottom: -7}}
            size={24}
            color={
                focused
                    ? isDarkmode
                        ? themeColor.white100
                        : themeColor.primary
                    : "rgb(143, 155, 179)"
            }
        />
    );
};

export default TabBar
