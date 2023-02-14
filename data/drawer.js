import { TouchableOpacity ,Text, SafeAreaView, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer';
import { Entypo, SimpleLineIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const win = Dimensions.get('screen');
const ratio = win.width/1872;

export function DrawerContent(props) {
  const IsOpen = useDrawerStatus();
  const [IsEng, setIsEng] = useState(0);
  useEffect(() => {
    if(IsOpen == "open"){
      const restoreValue = async () => {
          await AsyncStorage.getItem("LangIsEng").then((value)=>{
            if(value != null) setIsEng(parseInt(value))
          });
      };
      restoreValue();
    }
  }, [IsOpen, AsyncStorage, setIsEng]);
  const languageJson = require("./language.json");
  const headerPic = require("./quranpic.png");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#EFCE8E' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Image source={headerPic} style={styles.image} />

          <Drawer.Section style={styles.drawerSection}>
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal:20}} onPress={() => {
                props.navigation.navigate('القرآن الكريم');
              }}>
              <SimpleLineIcons name="book-open" size={26} color="black" />
              <Text style={styles.labelStyle} >{languageJson[IsEng]["screens"][0]}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "black", height: 1.5 }} />
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal:20}} onPress={() => {
                props.navigation.navigate("السور");
              }}>
              <Entypo name="list" size={30} color="black" />
              <Text style={styles.labelStyle} >{languageJson[IsEng]["screens"][1]}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "black", height: 1.5 }} />
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal:20}} onPress={() => {
                props.navigation.navigate("الأحزاب");
              }}>
              <MaterialIcons name="format-list-numbered" size={30} color="black" />
              <Text style={styles.labelStyle} >{languageJson[IsEng]["screens"][2]}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "black", height: 1.5 }} />
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal:20}} onPress={() => {
                props.navigation.navigate("الإعدادات");
              }}>
              <Ionicons name="settings-outline" size={26} color="black" />
              <Text style={styles.labelStyle} >{languageJson[IsEng]["screens"][3]}</Text>
            </TouchableOpacity>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  labelStyle:{
    flex:1,
    flexWrap: 'wrap',
    color: 'black',
    fontWeight: 'bold',
    fontSize:20,
    paddingHorizontal: 15
  },
  image: {
    marginLeft: '10%',
    resizeMode: 'contain',
    width: (win.width/2)-25,
    height: (2048 * ratio/2) -25,
  }
});
