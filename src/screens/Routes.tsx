import React from "react";
import {useWindowDimensions, FlatList, Alert} from "react-native";
import {MainTabPageProps} from "../types/navigation";
import {Button, Layout, Section, SectionContent, themeColor, TopNav, useTheme} from "react-native-rapi-ui";
import {SceneMap, TabView} from "react-native-tab-view";
import {maxSelectedRoutesAtom, selectedRoutesAtom} from "../store";
import {useAtom, useAtomValue} from "jotai";
import {useNavigation} from "@react-navigation/native";
import {Entypo, Ionicons, FontAwesome} from "@expo/vector-icons";
import {CSelectedRouteColorList} from "../constants";

const RouteScene = () => {
    const {isDarkmode} = useTheme();

    const navigation = useNavigation()
    const [selectedRoutes, setSelectedRoutes] = useAtom(selectedRoutesAtom)
    const maxSelectedRoutes = useAtomValue(maxSelectedRoutesAtom)


    const toggleRoute = (id: number) => {
        if (selectedRoutes.length >= maxSelectedRoutes) {
            Alert.alert(`You can select only ${maxSelectedRoutes} Route`)
            return;
        }
        setSelectedRoutes(prev => {
            const usedColors = prev.map(e => e.color)
            const freeColors = CSelectedRouteColorList.filter(e => !usedColors.includes(e))
            const color = freeColors[Math.floor(Math.random() * freeColors.length)]

            return prev.some(e => e.id === id) ? prev.filter(e => e.id !== id) : [...prev, {id, color}]
        })
    }

    return (
        <Section>
            <SectionContent>
                <FlatList
                    columnWrapperStyle={{
                        gap: 5,
                        marginTop: 5
                    }}
                    numColumns={4}
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={({item}) => {
                        const selected = selectedRoutes.some(e => e.id === item)
                        return <Button
                            outline={selected}
                            style={{flex: 1}}
                            text={`${item}`}
                            status="primary"
                            rightContent={
                                <Entypo
                                    name="info"
                                    size={20}
                                    color={
                                        selected
                                            ? isDarkmode
                                                ? themeColor.primary
                                                : themeColor.primary
                                            : themeColor.white
                                    }
                                />
                            }
                            onPress={() => toggleRoute(item)}
                            onLongPress={() => {
                                // @ts-ignore
                                navigation.navigate("RouteInfo")
                            }}
                        />
                    }}
                />
            </SectionContent>
        </Section>
    )
};

export default function ({navigation}: MainTabPageProps<"Routes">) {
    const {isDarkmode} = useTheme();
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes, setRoutes] = React.useState([
        {key: 'bus', title: 'Bus'},
        {key: 'trolleybus', title: 'Trolleybus'},
    ]);
    const [selectedRoutes, setSelectedRoutes] = useAtom(selectedRoutesAtom)

    return (
        <Layout>
            <TopNav
                middleContent={'Routes' + (selectedRoutes.length > 0 ? ` (${selectedRoutes.length})` : '')}
                rightContent={
                    <FontAwesome
                        name={"trash-o"}
                        size={20}
                        color={isDarkmode ? themeColor.white100 : themeColor.dark}
                    />
                }
                rightAction={() => {
                    setSelectedRoutes([])
                }}
            />
            <TabView
                navigationState={{
                    index, routes
                }}
                renderScene={SceneMap({
                    bus: () => <RouteScene/>,
                    trolleybus: () => <RouteScene/>,
                })}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
            />
        </Layout>
    );
}
