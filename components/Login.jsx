import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput, Pressable, TouchableOpacity, Keyboard } from 'react-native';
import ButtonAuth from './UI/ButtonAuth';

import axios from "axios";


export default function Registration({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry((previousState) => !previousState);
  };

  const handleSubmit = () => {
    if (password.trim() && email.trim()) {
      setIsSubmitted(false);
      const params = {
        email: email,
        password: password
      };
      axios.get('http://89.111.172.224/api/Auth', { params })
      .then(response => {
        Alert.alert('Вы вошли');
        navigation.navigate("Home");
      })
      .catch(error => {
        Alert.alert('Такого пользователя не существует');
      });
    } else {
      setIsSubmitted(true);
    }
  };

  const forgonPassword = () => {
    Alert.alert('Ссылка на восстановление пароля отправлена на почту');
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.userData}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={onChangeEmail}
          autoComplete='email'
          inputMode='email'
          placeholder="Введите email"
        />
        {isSubmitted && !email && <Text style={{ color: 'red' }}>Это поле обязательно для заполнения</Text>}
        <View style={styles.containerPassword}>
          <TextInput
            style={styles.inputPassword}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Пароль"
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity style={styles.buttonPassword} onPress={toggleSecureEntry}>
            <Text style={{ color: '#8AC0FF' }}>{secureTextEntry ? 'Показать' : 'Скрыть'}</Text>
          </TouchableOpacity>
        </View>
        {isSubmitted && !password && <Text style={{ color: 'red' }}>Это поле обязательно для заполнения</Text>}
      </View>

      <ButtonAuth title="Войти" onPress={handleSubmit} />

      <Pressable style={{ height: 51, justifyContent: 'center', fontSize: '20px' }} onPress={forgonPassword}>
        <Text >Забыли свой пароль?</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    color: '#BDBDBD',
    borderColor: '#E8E8E8',
    width: '100%',
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textAuth: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },

  containerPassword: {
    margin: 12,
    width: '100%',
    flexDirection: 'row',
  },
  inputPassword: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    color: '#BDBDBD',
    borderColor: '#E8E8E8',
    width: '100%',
    height: 50,
    borderWidth: 1,
    padding: 10,
  },
  buttonPassword: {
    position: 'absolute',
    top: 14,
    right: 10,
  }
});