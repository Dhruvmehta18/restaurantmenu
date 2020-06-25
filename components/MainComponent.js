import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DIshdetailComponent';
import {StatusBar, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{title: 'Menu'}}
          />
          <Stack.Screen name="Dishdetail" component={DishDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;
