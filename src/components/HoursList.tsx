import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {routeInfo} from "../data/routeInfo";
import {useTheme, themeColor, Text} from "react-native-rapi-ui";

const passedTimeOpacity = 0.3

export default () => {
    const {isDarkmode} = useTheme();

    const list = routeInfo.timeList
    const [currentHour, setCurrentHour] = useState(0)
    const [currentMinute, setCurrentMinute] = useState(0)

    const maxCol = list.reduce((a, v) => {
        const q = v.minutes.length + 1
        return q < a ? a : q
    }, 0)

    useEffect(() => {
        const date = new Date()
        setCurrentHour(date.getHours())
        setCurrentMinute(date.getMinutes())
    }, [])

    return (
        <FlatList
            data={list}
            extraData={{maxCol}}
            renderItem={({item, index}) => {
                const textHourOpacity = (currentHour > +item.hour) ? passedTimeOpacity : 1
                const bgColor = isDarkmode
                    ? checkIndexIsEven(index) ? themeColor.dark : themeColor.dark100
                    : checkIndexIsEven(index) ? themeColor.white100 : themeColor.white200

                return (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            backgroundColor: bgColor
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                borderRightWidth: 2,
                                borderStyle: 'dotted',
                                paddingVertical: 5,
                                width: 35,
                                opacity: textHourOpacity,
                                backgroundColor: isDarkmode ? checkIndexIsEven(index) ? themeColor.dark100 : themeColor.dark200
                                    : checkIndexIsEven(index) ? themeColor.white200 : themeColor.gray100
                            }}
                        >
                            {item.hour}
                        </Text>
                        {item.minutes.map((m, i) => {
                            const textMinuteOpacity = (currentHour > +item.hour || (currentHour === +item.hour && currentMinute > +m)) ? passedTimeOpacity : 1
                            return <Text
                                key={i}
                                style={{
                                    textAlign: "right",
                                    width: 35,
                                    paddingVertical: 5,
                                    opacity: textMinuteOpacity
                                }}
                            >{m}</Text>
                        })}
                    </View>
                )
            }}
        />
    )
}


function checkIndexIsEven(n: number) {
    return n % 2 == 0;
}
