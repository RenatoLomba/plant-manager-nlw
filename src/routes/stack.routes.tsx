import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import colors from '../styles/colors';
import { Welcome } from '../screens/Welcome';
import { UserIdentification } from '../screens/UserIdentification';
import { Confirmation } from '../screens/Confirmation';
import { PlantSelect } from '../screens/PlantSelect';
import { PlantSave } from '../screens/PlantSave';
import { MyPlants } from '../screens/MyPlants';
import AuthRoutes from './tab.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => (
    <Stack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <Stack.Screen
            name="Welcome"
            component={Welcome}
        />
        <Stack.Screen
            name="UserIdentification"
            component={UserIdentification}
        />
        <Stack.Screen
            name="Confirmation"
            component={Confirmation}
        />
        <Stack.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />
        <Stack.Screen
            name="PlantSave"
            component={PlantSave}
        />
        <Stack.Screen
            name="MyPlants"
            component={AuthRoutes}
        />
    </Stack.Navigator>
)

export default Routes
