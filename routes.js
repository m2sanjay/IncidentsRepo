import Screen2 from './src/Screens/Screen2';
import Screen1 from './src/Screens/Screen1';
import LoginScreen from './src/Screens/LoginScreen';
import Home from './src/Screens/Home';
import AddIncident from './src/Screens/AddIncident';
import IncidentDetailsScreen from './src/Screens/IncidentDetailsScreen';
import SearchMap from './src/Screens/SearchMap';
import Register from './src/Screens/Register';
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
    Home: {
      screen: Home
    },
    AddIncident: {
      screen: AddIncident
    },
    IncidentDetailsScreen: {
      screen: IncidentDetailsScreen
    },
    SearchMap: {
      screen: SearchMap,
    },
    Register: {
      screen: Register
    }
    }, {
      defaultNavigationOptions: {
          header: null
      }
  });
  


  export default createAppContainer(AppNavigator);
