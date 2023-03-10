import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import FullQuran from './screens/fullquran';
import Sourat from './screens/sourat';
import Ahzab from './screens/ahzab';
import Settings from './screens/settings';
import { DrawerContent } from './data/drawer';
import { useOrientation } from './data/orientation';;

const Drawer = createDrawerNavigator();

export default function App() {
  const orientation = useOrientation();

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        useLegacyImplementation 
        initialRouteName="quran"
        drawerContent={props => <DrawerContent {...props} /> }
        screenOptions={{
          drawerStyle: {
            width: (orientation === 'PORTRAIT' ? Dimensions.get('screen').width / 1.7 : Dimensions.get('screen').width / 2.5)
          },
          drawerPosition:'right'
        }}
      >
        <Drawer.Screen name="quran" component={FullQuran} options={{headerShown: false}} initialParams={{ imageResize: "normal" }}/>
        <Drawer.Screen name="sourat" component={Sourat} options={{headerShown: false}}/>
        <Drawer.Screen name="ahzab" component={Ahzab} options={{headerShown: false}}/>
        <Drawer.Screen name="settings" component={Settings} options={{headerShown: false}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

