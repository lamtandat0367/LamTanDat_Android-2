import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView, ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const HandleRegister = async () => {
    if(!username || !password || !confirmpassword){
      alert("Vui lòng nhập đầy đủ"); 
      return;
    }
    if(password !== confirmpassword){
      alert("Mật khẩu không trùng khớp");
      return;
    }
    
    const userInfo = {
      username: username,
      password: password,
    };
    const existingAccount = await AsyncStorage.getItem("user");
    if (existingAccount) {
      const parsedAccount = JSON.parse(existingAccount);
      var flag = parsedAccount.find((account) => account.username == username);
      if (flag) {
        alert("Tài khoản đã tồn tại");
        return;
      }
      parsedAccount.push(userInfo);
      AsyncStorage.setItem("user", JSON.stringify(parsedAccount)).then(() => {
        AsyncStorage.getItem("user").then((res) => {
          alert("Đăng kí thành công");
          navigation.navigate("Login");
        });
      });
    } else {
      AsyncStorage.setItem("user", JSON.stringify([userInfo])).then(() => {
        AsyncStorage.getItem("user").then((res) => {
          alert( "Đăng kí thành công");
          navigation.navigate("Login");
        });
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View>
        <ImageBackground style={styles.background}>
          <Text style={styles.title}>ĐĂNG KÍ TÀI KHOẢN</Text>
          <View style={{ marginTop: 40 }}>
            <View style={styles.iconinput}>
              <Icon name="user" size={30} color="grey" />
              <TextInput style={styles.input}
                placeholderTextColor={"#000033"}
                placeholder="Nhập tên đăng nhập hoặc email" onChangeText={(e) => setUsername(e)}/>
            </View>

            <View style={styles.iconinput}>
              <Icon name="lock" size={30} color="grey" />
              <TextInput style={styles.input}
                placeholderTextColor={"#000033"}
                placeholder="Nhập mật khẩu" onChangeText={(e) => setPassword(e)} />
            </View>
            <View style={styles.iconinput}>
              <Icon name="lock" size={30} color="grey"/>
              <TextInput style={styles.input}
                placeholderTextColor={"#000033"}
                placeholder="Xác nhận mật khẩu"  onChangeText={(e) => setConfirmPassword(e)}/>
            </View>

          </View>
          <TouchableOpacity style={styles.button} onPress={() => HandleRegister()}>
            <Text style={styles.buttonText}>Đăng kí</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <Text style={{ alignSelf: 'flex-end' }}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ textAlign: 'center', color: '#191970' }}> Đăng nhập</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: 'white',
    paddingHorizontal: 10,

  },
  button: {
    backgroundColor: '#d9d9d9',
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    width: 300,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  background: {
    flex: 1,

    backgroundColor: 'white',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    width: 420
  },
});

export default Register;
