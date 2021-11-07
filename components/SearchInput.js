import React from 'react';

 import {
   StyleSheet,
   TextInput,
   useColorScheme,
   TouchableOpacity,
   View,
   Text
 } from 'react-native';
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 
 const SearchInput = (props) => {
   const [searchKey, setSearchKey] = React.useState('');
  
   const handleChangeText = text => {
     setSearchKey(text);
   };
  
   const search = () => {
     props.onSearch(searchKey)
   }
  
   return (
       <View style={{flexDirection:"row",marginHorizontal:20, marginVertical:20,}}>
       <TextInput
       style={{ height:50, padding:10,flex:1, borderWidth:1, borderColor:"gray", borderRadius:5}}
           placeholder="Search"
           value={searchKey}
           onChangeText={handleChangeText}
           onSubmitEditing={search}
         />
         <TouchableOpacity onPress={search}>
        <Text>Search</Text></TouchableOpacity>
         </View>
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default SearchInput;
 