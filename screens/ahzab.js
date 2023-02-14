import { useState, useEffect } from 'react';
import { TextInput, SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADER_HEIGHT = 55 + Constants.statusBarHeight;

export default function Ahzab({ navigation }) {
  const isFocused = useIsFocused();
  const ahzab = require('../data/ahzab.json');
  const [IsEng, setIsEng] = useState(0);

  useEffect(() => {
    if(isFocused){
      const restoreValue = async () => {
          await AsyncStorage.getItem("LangIsEng").then((value)=>{
            if(value != null) setIsEng(parseInt(value))
          });
      };
      restoreValue();
    }
  }, [isFocused,AsyncStorage, setIsEng]);

  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
    );
};

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity 
        onPress={()=>{
          navigation.navigate({
              name: "القرآن الكريم",
              params: { page: item.page },
              merge: true,
            });
        }}
      >
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginHorizontal:20, marginVertical: 8}}>
          <Text style={styles.id}>{item.id}</Text>
          <Text style={styles.title}>{item.aya}</Text>
        </SafeAreaView>
      </TouchableOpacity>
      
    )
  }
  const languageJson = require("../data/language.json");
  const [Hizb, setHizb] = useState('');
  const [Ahzab, setAhzab] = useState(ahzab);

  const ListHeader = ({navigation}) => {
    return (
      <View style={{flex: 1,
        backgroundColor: "#EFCE8E",
        height: HEADER_HEIGHT+80,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
        }}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.toggleDrawer()}>
        <MaterialIcons name="format-list-numbered" size={30} color="black" />
        <Text style={styles.headerText}>{languageJson[IsEng]["screens"][2]}   </Text>
      </TouchableOpacity>
      <TextInput
        value={Hizb}
        onChangeText={(Hizb) =>{
          setHizb(Hizb);
          if(Hizb != "") setAhzab(ahzab.filter(x=> x.aya.includes(Hizb)));
        }}
        placeholder={languageJson[IsEng]["input"][1]}
        placeholderTextColor="black"
        style={styles.input}
      />
      </View>
    )
  }

  

  return (
    <View style={styles.container}>
      <FlatList
        data={Ahzab}
        bounces={false}
        renderItem={ renderItem }
        ItemSeparatorComponent={ItemSeparatorView}
        ListHeaderComponent={ListHeader({navigation})}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1'
  },
  title: {
    fontSize: 20,
    padding: 12,
    color: 'black',
    fontWeight: 'bold'
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
  id:{
    fontSize: 20,
    padding: 12,
    color: '#c29e7a',
    fontWeight: 'bold'
  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    margin: 10,
    backgroundColor: '#ecf0f1',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

