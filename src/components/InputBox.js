import React from 'react';

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

const InputBox = props => {
  const {onButtonPress, placeholder, icon} = props;
  const [value, setValue] = React.useState('');

  const handleChangeText = text => {
    setValue(text);
  };

  const onSubmit = () => {
    onButtonPress(value);
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginHorizontal: 20, marginVertical: 20},
  inputBox: {
    height: 50,
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
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
    borderLeftWidth: 1,
    borderLeftColor: 'green',
    paddingHorizontal: 8,
    height: 50,
    backgroundColor: 'green',
  },
  icon: {height: 20, width: 20, top: 12},
});

export default InputBox;
