import React from "react";
import * as Family from "@expo/vector-icons";

type VectorIconProps = {
    icon: any
    family?: keyof typeof Family
}
export default ({icon, family, ...rest}: VectorIconProps) => {

    const Component = !family ? Family['Ionicons'] : Family[family]

    return <Component name={icon} {...rest}/>
}
