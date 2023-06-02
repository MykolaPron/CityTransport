import {Pressable, StyleSheet, TouchableOpacity, View, ViewProps} from "react-native";
import {component} from "react-native-rapi-ui/constants/colors";
import {useTheme, Text, themeColor, Picker} from "react-native-rapi-ui";
import {FontAwesome} from "@expo/vector-icons";
import {useState} from "react";
import {useSetAtom} from "jotai";
import {mapRegionAtom, selectedRoutesAtom} from "../../store";
import {citiInfo} from "../../data/citiInfo";

interface Props extends ViewProps {
    height?: number;
    backgroundColor?: string;
    borderColor?: string;
}

export default ({height = 64, backgroundColor, borderColor, ...rest}: Props) => {
    const {theme} = useTheme();

    const setMapRegion = useSetAtom(mapRegionAtom)

    return (
        <View
            {...rest}
            style={{
                height: height,
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: backgroundColor
                    ? backgroundColor
                    : component[theme].topNav.backgroundColor,
                alignItems: "center",
                borderColor: backgroundColor
                    ? borderColor
                    : component[theme].topNav.borderColor,
                borderBottomWidth: 1,
            }}
        >
            {/*<View*/}
            {/*    style={{*/}
            {/*        justifyContent: "flex-start",*/}
            {/*        paddingHorizontal: 10*/}
            {/*    }}*/}
            {/*>*/}
            {/*</View>*/}
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 5,
                    paddingHorizontal: 10
                }}
            >

            </View>
            <View style={{
                justifyContent: "flex-end",
                flexDirection: 'row',
                gap: 20, paddingHorizontal: 20
            }}>
                <Pressable onPressOut={() => {
                }}>
                    {({pressed}) => (
                        <FontAwesome
                            name="street-view"
                            size={25}
                            color={component[theme].text.color}
                            style={{opacity: pressed ? 0.5 : 1}}
                        />
                    )}
                </Pressable>
                <Pressable onPressOut={() => {
                    setMapRegion(citiInfo)
                }}>
                    {({pressed}) => (
                        <FontAwesome
                            name="bullseye"
                            size={25}
                            color={component[theme].text.color}
                            style={{opacity: pressed ? 0.5 : 1}}
                        />
                    )}
                </Pressable>
            </View>
        </View>
    )
}
