import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADER_HEIGHT = 75 + Constants.statusBarHeight;

export default function Settings({ navigation }) {
  const isFocused = useIsFocused();
  const [imageWide, setImageWide] = useState(0);
  const [IsEng, setIsEng] = useState(0);
  const toggleSize = async (n) => {
    setImageWide(n);
    await AsyncStorage.setItem("imageWide", JSON.stringify(n));
  };
  const toggleLang = async (n) => {
    setIsEng(n);
    await AsyncStorage.setItem("LangIsEng", JSON.stringify(n));
  };
  useEffect(() => {
    if(isFocused){
      const restoreValue = async () => {
          await AsyncStorage.getItem("imageWide").then((value)=>{
            if(value != null) setImageWide(parseInt(value))
          });
          await AsyncStorage.getItem("LangIsEng").then((value)=>{
            if(value != null) setIsEng(parseInt(value))
          });
      };
      restoreValue();
    }
  }, [isFocused,AsyncStorage, setImageWide, setIsEng]);
  const languageJson = require("../data/language.json");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    headerText: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingHorizontal: 15
    },
    header:{
      flexDirection:'row'
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    sizeButton:{
      color: 'black',
      fontWeight: 'bold',
      fontSize:20,
      backgroundColor: (imageWide==0) ? '#EFCE8E' : '#A6843A',
      padding:10
    },
    EngButton:{
      color: 'black',
      fontWeight: 'bold',
      fontSize:20,
      backgroundColor: (IsEng==0) ? '#EFCE8E' : '#A6843A',
      padding:10
    },
    ArabButton:{
      color: 'black',
      fontWeight: 'bold',
      fontSize:20,
      backgroundColor: (IsEng==1) ? '#EFCE8E' : '#A6843A',
      padding:10
    },
    language:{
      color: 'black', flex:1, alignItems:'center', marginVertical: 15,
      fontWeight: 'bold', 
      fontSize:20, 
      padding:10
    }
  });

  return (
    <View style={styles.container}>
        <View style={{flex: 1,
            backgroundColor: "#EFCE8E",
            height: HEADER_HEIGHT,
            paddingTop: Constants.statusBarHeight,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <TouchableOpacity style={styles.header} onPress={() => navigation.toggleDrawer()}>
            <Ionicons name="settings-outline" size={26} color="black" />
            <Text style={styles.headerText}>{languageJson[IsEng]["screens"][3]}   </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 6, marginHorizontal:20}}>
        <View style={styles.button}>
          {IsEng ?  <Text style={styles.language} >{"Page Size :"}</Text> : null }
          {imageWide==1 ? 
          <TouchableOpacity style={{flex:1, alignItems:'center', marginVertical: 15}} onPress={() => {toggleSize(0)}}>
            <Text style={styles.sizeButton} >{languageJson[IsEng]["settings"][0]}</Text>
          </TouchableOpacity>
          : 
          <TouchableOpacity style={{flex:1, alignItems:'center', marginVertical: 15}} onPress={() => {toggleSize(1)}}>
            <Text style={styles.sizeButton} >{languageJson[IsEng]["settings"][1]}</Text>
          </TouchableOpacity>
          }
          {IsEng ?  null : <Text style={styles.language} >{"حجم الصفحة :"}</Text>}
        </View>
        <View style={styles.button}>
          {IsEng ?  <Text style={styles.language} >{"Language :"}</Text> : null }
          <TouchableOpacity style={{flex:1, alignItems:'center', marginVertical: 15}} onPress={() => {toggleLang(1);}}>
            <Text style={styles.EngButton} >{"English"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flex:1, alignItems:'center', marginVertical: 15}} onPress={() => {toggleLang(0);}}>
            <Text style={styles.ArabButton} >{"العربية"}</Text>
          </TouchableOpacity>
          {IsEng ?  null : <Text style={styles.language} >{"اللغة :"}</Text>}
          
        </View>
      </View>
    </View>
  );

  
}





