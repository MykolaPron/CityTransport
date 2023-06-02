import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabs from "./MainTabs";
import {MainStackParamList} from "../types/navigation";
import RouteInfo from "../screens/RouteInfo";

const MainStack = createNativeStackNavigator<MainStackParamList>();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="RouteInfo" component={RouteInfo} />
    </MainStack.Navigator>
  );
};

export default Main;
