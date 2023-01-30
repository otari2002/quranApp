import { TouchableOpacity ,Text, SafeAreaView, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { Entypo, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

const win = Dimensions.get('screen');
const ratio = win.width/1872;

export function DrawerContent(props) {
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
              <Text style={styles.labelStyle} >{"القرآن الكريم"}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "black", height: 1.5 }} />
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal:20}} onPress={() => {
                props.navigation.navigate("السور");
              }}>
              <Entypo name="list" size={30} color="black" />
              <Text style={styles.labelStyle} >{"السور"}</Text>
            </TouchableOpacity>
            <View style={{ backgroundColor: "black", height: 1.5 }} />
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between', marginVertical: 15, marginHorizontal:20}} onPress={() => {
                props.navigation.navigate("الأحزاب");
              }}>
              <MaterialIcons name="format-list-numbered" size={30} color="black" />
              <Text style={styles.labelStyle} >{"الأحزاب"}</Text>
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
    fontSize:20
  },
  image: {
    marginLeft: '10%',
    resizeMode: 'contain',
    width: (win.width/2)-25,
    height: (2048 * ratio/2) -25,
  }
});
