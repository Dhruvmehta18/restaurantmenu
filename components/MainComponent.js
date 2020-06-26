import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DIshdetailComponent';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import About from './AboutComponent';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
              drawerIcon: () => (
                <Icon name="home" type="font-awesome-5" size={24} />
              ),
            }}
          />
          <Drawer.Screen
            name="About Us"
            component={AboutScreen}
            options={{
              drawerIcon: () => (
                <Icon name="info-circle" type="font-awesome-5" size={24} />
              ),
            }}
          />
          <Drawer.Screen
            name="Menu"
            component={MenuScreen}
            options={{
              drawerIcon: () => (
                <Icon name="list" type="font-awesome-5" size={24} />
              ),
            }}
          />
          <Drawer.Screen
            name="Contact Us"
            component={ContactScreen}
            options={{
              drawerIcon: () => (
                <Icon name="address-card" type="font-awesome-5" size={22} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          title: route.name,
          headerLeft: props => (
            <Icon
              name="menu"
              size={24}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ContactScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={({navigation, route}) => ({
          title: route.name,
          headerLeft: props => (
            <Icon
              name="menu"
              size={24}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AboutScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={About}
        options={({navigation, route}) => ({
          title: route.name,
          headerLeft: props => (
            <Icon
              name="menu"
              size={24}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const MenuScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={({navigation, route}) => ({
          title: route.name,
          headerLeft: props => (
            <Icon
              name="menu"
              size={24}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen name="Dishdetail" component={DishDetail} />
    </Stack.Navigator>
  );
};

export default Main;
