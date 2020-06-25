import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DIshdetailComponent';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './HomeComponent';
import ContactUs from './ContactComponent';
import About from './AboutComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About Us" component={About} />
          <Drawer.Screen name="Menu" component={MenuScreen} />
          <Drawer.Screen name="Contact Us" component={ContactUs} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const MenuScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />
      <Stack.Screen name="Dishdetail" component={DishDetail} />
    </Stack.Navigator>
  );
};

export default Main;
