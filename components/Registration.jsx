import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput, Pressable, TouchableOpacity, Keyboard } from 'react-native';
import ButtonAuth from './UI/ButtonAuth';
import axios from "axios";

export default function Registration({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry((previousState) => !previousState);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePhone = (phone) => {
    const re = /^\d{10,15}$/;
    return re.test(phone);
  }  

  const handleSubmit = () => {
    if (password.trim() && email.trim() && phone.trim()) {
      if (!validateEmail(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      if (!validatePhone(phone)) {
        setPhoneError(true);
      } else {
        setPhoneError(false);
      }
      if (emailError || phoneError) {
        return;
      }
      setIsSubmitted(false);
      const data = {
        email: email,
        phoneNumber: phone,
        password: password
      };
      axios({
        method: 'post',
        url: 'http://89.111.172.224/api/Auth',
        params: data
      }).then(response => {
        Alert.alert('Вы зарегистрировались');
        navigation.navigate("Home");
      }).catch(error => {
        Alert.alert('Возникла ошибка');
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
        {emailError && <Text style={{ color: 'red' }}>Введите валидный email</Text>}
        <TextInput
          style={styles.input}
          onChangeText={onChangePhone}
          value={phone}
          inputMode='tel'
          dataDetectorTypes='phoneNumber'
          placeholder="Телефон"
        />
        {isSubmitted && !phone && <Text style={{ color: 'red' }}>Это поле обязательно для заполнения</Text>}
        {phoneError && <Text style={{ color: 'red' }}>Введите валидный номер телефона</Text>}
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

      <ButtonAuth title="Зарегестрироваться" onPress={handleSubmit} />

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
