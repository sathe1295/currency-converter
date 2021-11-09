import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { BORDER_GRAY,INPUT_BOX_BUTTON } from '../constants/ColorConstants';

const InputBox = props => {
  const {onButtonPress, placeholder, icon, title} = props;
  const [value, setValue] = React.useState('');

  const handleChangeText = text => {
    setValue(text);
  };

  const onSubmit = () => {
    onButtonPress(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          onSubmitEditing={onSubmit}
        />
        <TouchableOpacity onPress={onSubmit} style={styles.button}>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginHorizontal: 20, marginVertical: 10},
  textInputContainer: {flexDirection: 'row'},
  inputBox: {
    height: 50,
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: BORDER_GRAY,
    borderRadius: 5,
    shadowOffset: {
      width: 0.5,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 1,
  },
  button: {
    right: 0,
    position: 'absolute',
    paddingHorizontal: 8,
    height: 50,
    backgroundColor: INPUT_BOX_BUTTON,
  },
  icon: {height: 20, width: 20, top: 12},
  title: {fontWeight: '400', marginBottom: 5},
});

export default InputBox;
