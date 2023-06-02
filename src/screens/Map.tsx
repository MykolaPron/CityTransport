import React, {useEffect, useState} from "react";

import {View, StyleSheet} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {Layout} from "react-native-rapi-ui";
import * as Location from 'expo-location';

import {useAtom} from "jotai";

import {MainTabPageProps} from "../types/navigation";
import MapTopNav from "../components/map/MapTopNav";
import SelectedRoutesList from "../components/SelectedRoutesList";
import {mapRegionAtom} from "../store";
import {LocationObject} from "expo-location/src/Location.types";

export default function ({navigation}: MainTabPageProps<"Map">) {
    const [mapRegion, setMapRegion] = useAtom(mapRegionAtom)
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <Layout>
            <MapTopNav/>
            <SelectedRoutesList/>
            <View
                style={styles.container}
            >
                <MapView
                    provider={PROVIDER_GOOGLE}

                    style={styles.map}
                    region={mapRegion}
                    onRegionChangeComplete={(region, details)=>{
                        setMapRegion(region)
                    }}
                >
                    {location && <Marker
                        coordinate={location.coords}
                    />}
                </MapView>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    map: {width: '100%', height: '100%'}
})
