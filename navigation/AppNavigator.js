import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function AppNavigator () {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                    headerShown: false 
                }} 
            />
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ 
                    title: 'Minha Conta',
                    headerStyle: {
                        backgroundColor: '#27428f',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} 
            />
        </Stack.Navigator>
    )
}