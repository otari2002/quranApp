import { useState } from 'react';
import { TextInput, SafeAreaView, Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';

const HEADER_HEIGHT = 55 + Constants.statusBarHeight;
export default function Sourat({ navigation }) {
  const sourat = require('../data/index.json');

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
      { item.nameFr != "" ? 
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", marginHorizontal:20, marginVertical: 8}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: "space-between"}}>
            <Text style={styles.details}>{"عدد الآيات : "}{item.ayat}</Text>
            <Text style={styles.details}>{"نوع السورة : "}{item.type}</Text>
          </View>
          <Text style={styles.title}>{item.name}</Text>
        </SafeAreaView>
      : <SafeAreaView style={{ flex: 1, margin:20, alignItems: 'center', justifyContent: "space-between", marginHorizontal:20, marginVertical: 8 }}>
          <Text style={styles.title}>{item.name}</Text>
        </SafeAreaView>
      }
      </TouchableOpacity>
      
    )
  }

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
        <Feather name="sidebar" size={30} color="black" />
        <Text style={styles.headerText}>{"السور"}   </Text>
      </TouchableOpacity>
      <TextInput
        value={Soura}
        onChangeText={(Soura) =>{
          setSoura(Soura);
          if(Soura != "") setSourat(sourat.filter(x=> x.name.includes(Soura)));
        }}
        placeholder="اسم السورة : "
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
    fontSize: 25,
    padding: 12,
    color: 'black',
    fontWeight: 'bold'
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
    textAlign: 'center'
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
