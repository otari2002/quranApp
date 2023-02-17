import { useState, useEffect } from 'react';
import { TextInput, SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HEADER_HEIGHT = 55 + Constants.statusBarHeight;
export default function Sourat({ navigation }) {
  const isFocused = useIsFocused();
  const sourat = require('../data/sourat.json');
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
              name: "quran",
              params: { page: item.page },
              merge: true,
            });
        }}
      >
      { item.type != "" ? 
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginHorizontal:5, marginVertical: 8}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: "space-between"}}>
            <Text style={styles.details}>{languageJson[IsEng]["sourat"][0]}{item.ayat}</Text>
            <Text style={styles.details}>{languageJson[IsEng]["sourat"][1]}{IsEng ? item.typeFr : item.type}</Text>
          </View>
          <Text style={styles.title}>{IsEng ? item.nameFr : item.name}</Text>
        </SafeAreaView>
      : <SafeAreaView style={{ flex: 1, margin:20, alignItems: 'center', justifyContent: "space-between", marginHorizontal:20, marginVertical: 8 }}>
          <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.title}>{IsEng ? item.nameFr : item.name}</Text>
        </SafeAreaView>
      }
      </TouchableOpacity>
    )
  }
  const languageJson = require("../data/language.json");
  const [Soura, setSoura] = useState('');
  const [Sourat, setSourat] = useState(sourat);

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
        <Entypo name="list" size={30} color="black" />
        <Text style={styles.headerText}>{languageJson[IsEng]["screens"][1]}   </Text>
      </TouchableOpacity>
      <TextInput
        value={Soura}
        onChangeText={(Soura) =>{
          setSoura(Soura);
          if(Soura != "") setSourat(sourat.filter(x=> x.name.includes(Soura)));
        }}
        placeholder={languageJson[IsEng]["input"][0]}
        placeholderTextColor="black"
        style={styles.input}
      />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Sourat}
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
    fontWeight: 'bold',
  },
  header:{
    flexDirection:'row'
  },
  details: {
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
