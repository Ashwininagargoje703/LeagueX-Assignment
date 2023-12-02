import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import App from "./App";

const AppWraper = () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

registerRootComponent(AppWraper);
