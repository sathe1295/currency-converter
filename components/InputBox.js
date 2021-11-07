import React from 'react';

import {
  StyleSheet,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const InputBox = props => {
  const {onButtonPress, placeholder, buttonLabel} = props;
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
      <TouchableOpacity onPress={onSubmit}>
        <Text>{buttonLabel}</Text>
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
  },
});

export default InputBox;
