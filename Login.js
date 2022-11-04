import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const deviceWidth = Dimensions.get('window').width;

const Login = ({navigation}) => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const LoginButton = ({title}) => (
        <TouchableOpacity onPress={() => {navigation.navigate("MenuNav"); getUsers()}} style={styles.loginButton}>
            <Text style={styles.loginText}>{title}</Text>
        </TouchableOpacity>
    );
    
    const getUsers = async () => {
        try {
            await axios.get("http://localhost:8080/api/v1/users").then((response) => console.log(response))
        } catch(error) {
            console.log(error);
        }
    }

    return(
        <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                </View>
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.inputBox}
                        value={input.email}
                        onChangeText={value => setInput(prevState => {return {...prevState, email: value}})}
                        placeholder={"Enter Email"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={input.password}
                        onChangeText={value => setInput(prevState => {return {...prevState, password: value}})}
                        placeholder={"Enter Password"}
                    />
                    <LoginButton title={"Login"} size="lg" backgroundColor="#90ED65"/>
                    <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate("createAccount")}>
                        <Text style={styles.createAccountText}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    inputBox: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        flex: 1,
    },
    loginButton: {
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor:"#90ED65",
        flex: 1,
    },
    loginText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
      flex: 1,
    },
    createAccountButton: {
      alignItems: "center",
      margin: 10,
      flex: 1,
    },  
    createAccountText: {
      alignItems: "center",
      fontSize: 14,
      color: "black",
      textTransform: "uppercase",
      flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    image: {
        alignContent: 'center',
        width: deviceWidth,
        height: 300,
    }
  });
  

export default Login;
