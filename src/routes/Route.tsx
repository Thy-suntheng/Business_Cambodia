import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CustomDrawer from '../components/CustomDrawer';
import HeaderScreen from '../custom/HeaderScreen';
import { useSelector } from 'react-redux';
import MainCategory from '../components/MainCategory';
import CategoryHeader from '../custom/CategoryHeader';
import DetailScreen from '../components/DetailScreen';
import Setting from '../components/Setting';
import Search from '../custom/Search';

const Stack = createStackNavigator();
const Drawer: any = createDrawerNavigator();
const Tab: any = createMaterialTopTabNavigator();

const Route = () => {
    const headerBar = () => {
        return (
            <>
                <HeaderScreen />
                <CategoryHeader />
            </>
        )
    }
    function MainStack() {
        return (
            <Stack.Navigator
                screenOptions={{
                    cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                    headerShown: false
                }}>
                <Stack.Screen name="MainHome" component={DrawerMainNavigator} />
                <Stack.Screen name="Setting" component={Setting} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
                <Stack.Screen name="Search" component={Search} />
            </Stack.Navigator >

        )
    }
    function DrawerMainNavigator() {
        return (
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        width: '85%',
                    },
                }}

                edgeWidth={80}
                drawerContent={() => <CustomDrawer />}>
                <Drawer.Screen name="Home" component={MainTab} />
            </Drawer.Navigator>
        );
    }
    function screenRender(category: any) {
        return (
            <MainCategory category={category} />
        )
    }
    function MainTab() {
        const categories = useSelector((state: any) => state.categories)
        return (
            <>
                {headerBar()}
                <Tab.Navigator
                    timingConfig={{
                        duration: 0,
                    }}
                    removeClippedSubviews={false}
                    screenOptions={{
                        tabBarShowLabel: false,
                        tabBarShowIcon: false,
                        animationEnabled: false,
                        tabBarItemStyle: {
                            height: 0
                        },
                        tabBarIndicatorStyle: {
                            height: 0
                        },
                        tabBarStyle: {
                            height: 0
                        }
                    }}
                >
                    {categories.data.map((category: any) => (
                        <Tab.Screen
                            key={category.id}
                            name={category.name}
                            children={() => screenRender(category)} />
                    ))}
                </Tab.Navigator>
            </>
        );
    }
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
export default React.memo(Route);

