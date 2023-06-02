import {StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {Button} from "react-native-rapi-ui";
import {useAtom} from "jotai";
import {selectedRoutesAtom} from "../store";
import {useNavigation} from "@react-navigation/native";


export default () => {
    const navigation = useNavigation()

    const [activeRoute, setActiveRoute] = useState<number>(0)
    const [selectedRoutes] = useAtom(selectedRoutesAtom)

    return (
        <View
            style={styles.container}
        >
            {selectedRoutes.map((e) => <Button
                    key={e.id}
                    style={styles.item}
                    outline={activeRoute !== e.id}
                    text={`${e.id}`}
                    status={e.color}
                    onPress={()=>{
                        setActiveRoute(prevState => prevState===e.id ? 0 : e.id)
                    }}
                    onLongPress={() => {
                        // @ts-ignore
                        navigation.navigate("RouteInfo")
                    }}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 5,
        zIndex: 1,
        top: 64,
        marginTop: 5,
        marginHorizontal: 5
    },
    item:{
    }
})
