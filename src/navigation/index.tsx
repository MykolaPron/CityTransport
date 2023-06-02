import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Loading from '../screens/utils/Loading';
import Main from "./MainStack";

export default () => {
	return (
		<NavigationContainer>
			{/*<Loading />*/}
			<Main/>
		</NavigationContainer>
	);
};
