import Screen2 from './src/Screens/Screen2';
import Screen1 from './src/Screens/Screen1';
import LoginScreen from './src/Screens/LoginScreen';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
    LoginScreen: {
      screen: LoginScreen,
    },
    Screen1: {
      screen: Screen1,
    },
    Screen2: {
      screen: Screen2
    },
  }, {
      defaultNavigationOptions: {
          header: null
      }
  });
  


  export default createAppContainer(AppNavigator);
