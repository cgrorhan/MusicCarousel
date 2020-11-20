import React from 'react';
import {StyleSheet,View,Text,StatusBar} from 'react-native';
import PlayerScreen from './src/PlayerScreen';
const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
        <PlayerScreen/>
    </View>
  );
};

const styles = StyleSheet.create({
 container:{
   flex:1,
   alignItems:'center',
   justifyContent:'center'
 }
});

export default App;
