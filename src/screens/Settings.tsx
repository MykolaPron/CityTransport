import React from "react";
import {Switch, View} from "react-native";
import {MainTabPageProps} from "../types/navigation";
import {Layout, Text, Section, SectionContent, useTheme} from "react-native-rapi-ui";
import Slider from '@react-native-community/slider';
import {useAtom} from "jotai/index";
import {maxSelectedRoutesAtom, selectedRoutesAtom} from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({navigation}: MainTabPageProps<"Settings">) {
    const {isDarkmode, setTheme} = useTheme();
    const [maxSelectedRoutes, setMaxSelectedRoutes] = useAtom(maxSelectedRoutesAtom)

    return (
        <Layout>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Settings</Text>
                <Section>
                    <SectionContent>
                        <Text>Max Selected Routes</Text>
                        <Slider
                            value={maxSelectedRoutes}
                            minimumValue={2}
                            maximumValue={5}
                            step={1}
                            onValueChange={async (value)=>{
                                await AsyncStorage.setItem('@maxSelectedRoutes', JSON.stringify(value))
                                setMaxSelectedRoutes(value)
                            }}
                        />
                    </SectionContent>
                </Section>
                <Section>
                    <SectionContent>
                        <Text>Default theme</Text>
                        <Switch value={isDarkmode} onValueChange={() =>{
                            setTheme(isDarkmode? "light":"dark");
                        }}/>
                    </SectionContent>
                </Section>
            </View>
        </Layout>
    );
}
