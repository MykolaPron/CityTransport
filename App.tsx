import React, {useEffect} from "react";
import {useColorScheme} from "react-native";
import {ThemeProvider} from "react-native-rapi-ui";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {useSetAtom} from "jotai";

import Navigation from "./src/navigation";
import NavigationBar from "./src/components/utils/NavigationBar";
import {maxSelectedRoutesAtom} from "./src/store";

export default function App() {
    let colorScheme = useColorScheme();
    const setMaxSelectedRoutes = useSetAtom(maxSelectedRoutesAtom)

    useEffect(() => {
        (async () => {
            try {
                const value = await AsyncStorage.getItem('@maxSelectedRoutes')
                if (value !== null) {
                    // value previously stored
                    setMaxSelectedRoutes(JSON.parse(value))
                } else {
                    await AsyncStorage.setItem('@maxSelectedRoutes', JSON.stringify(2))
                    setMaxSelectedRoutes(2)
                }
            } catch (e) {
                // error reading value
            }
        })()
    }, [])

    return (
        <ThemeProvider theme={colorScheme ?? undefined}>
            <Navigation/>
            {/*<StatusBar />*/}
            <NavigationBar/>
        </ThemeProvider>
    );
}
