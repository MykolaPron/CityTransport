import {FlatList, TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {useState} from "react";
import {routeInfo} from "../data/routeInfo";
import {FontAwesome} from "@expo/vector-icons";
import {themeColor, useTheme} from "react-native-rapi-ui";
import {useAtomValue} from "jotai";
import {routeDirectionAtom} from "../store";
import {CDefaultRouteDirection} from "../constants";

const selectedIconSize = 35;


export default ({}) => {
    const {isDarkmode} = useTheme();
    const routeDirection = useAtomValue(routeDirectionAtom)

    const [position, setPosition] = useState(0)
    const data = routeDirection === CDefaultRouteDirection ?  routeInfo.stopPoints : routeInfo.stopPoints.reverse();

    return (
        <FlatList
            data={data}
            renderItem={({item, index}) => {
                const isFirstOrLast = index === 0 || index === data.length - 1
                const iconName = (position === index)
                    ? 'dot-circle-o'
                    : (position > index || isFirstOrLast)
                        ? 'circle' : 'circle-o'
                const iconSize = position === index ? selectedIconSize : 25
                const iconColor = (position === index || isFirstOrLast)
                    ? (isDarkmode ? themeColor.white : themeColor.primary)
                    : (isDarkmode ? themeColor.primary : themeColor.black)

                const timeColor = position > index
                    ? "transparent"
                    : isDarkmode
                        ? themeColor.white
                        : themeColor.black
                const passedOpacity = position > index ? 0.3 : 1

                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.button}
                        onPress={() => {
                            setPosition(index)
                        }}
                    >
                        <Text style={[styles.time, {
                            color: timeColor
                        }]}>{item.time}</Text>
                        <View style={styles.iconContainer}>
                            {/*<View style={styles.line}/>*/}
                            <FontAwesome
                                style={{opacity: passedOpacity}}
                                name={iconName}
                                size={iconSize}
                                color={iconColor}
                            />
                        </View>
                        <Text style={{
                            opacity: passedOpacity,
                            color: isDarkmode ? themeColor.white : themeColor.black
                        }}>{item.text}</Text>
                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10
    },
    time: {
        minWidth: 30,
        textAlign: "center",
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: selectedIconSize,
        height: selectedIconSize,
        marginHorizontal: 10,
    },
    line: {
        position: "absolute",
        width: 2,
        backgroundColor: "white",
        height: "100%"
    },
})
