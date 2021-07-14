import React, { memo } from "react";
import { View } from "react-native";
import { HtmlScreen } from "./src/HtmlScreen";
const App=memo(() => {
  return(
    <View style={{flex: 1}}>
    <HtmlScreen/>
    </View>
  )
})
export default App;
