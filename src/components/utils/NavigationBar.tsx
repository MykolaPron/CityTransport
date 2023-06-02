import * as NavigationBar from 'expo-navigation-bar';
import {useEffect} from "react";
import {useTheme, themeColor} from "react-native-rapi-ui";
import {component} from "react-native-rapi-ui/constants/colors";

export default () => {
    const {isDarkmode, theme} = useTheme();
    const visibility = NavigationBar.useVisibility()

    useEffect(()=>{
        if(visibility && visibility === 'visible'){
            NavigationBar.setVisibilityAsync("hidden")
        }
    },[visibility])

    useEffect(() => {
        NavigationBar.setBehaviorAsync('overlay-swipe')
    },[])

    useEffect(() => {
        (async ()=>{
            const bgColor = component[theme].statusBar.color
            // const bgColor = isDarkmode ? themeColor.dark100 : themeColor.white100
            await NavigationBar.setBackgroundColorAsync(bgColor);
            await NavigationBar.setButtonStyleAsync(isDarkmode ? "light" : "dark")
        })()
    }, [isDarkmode])

    return null;
}
