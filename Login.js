import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, StatusBar, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

const Login = ({navigation}) => {

    const [userList, getUserList] = useState([]);

    const [input, setInput] = useState({
        userID: "",
        email: "",
        password: "",
        hashPass: ""
    });

    const loginINFO = []

    const LoginButton = ({title}) => (
        <TouchableOpacity onPress={() => {loginUser()}} style={styles.loginButton}>
            <Text style={styles.loginText}>{title}</Text>
        </TouchableOpacity>
    );
    
    useEffect(() => {
        const getUsers = async () => {
            try {
                axios.get("http://3.233.254.119/api/v1/users/").then((response) => {
                    getUserList(response.data.users);
                }).catch((e) => console.log(e));
            } catch(error) {
                console.log(error);
            }
        }
        getUsers();
    }, []);

    const loginUser = () => {
        
        for(var i in userList) {
            loginINFO.push(userList[i].email);
        }
        if(loginINFO.includes(input.email)) {
            setInput(input.hashPass = userList[loginINFO.indexOf(input.email)].password);

            setInput(input.userID = userList[loginINFO.indexOf(input.email)].id);

            axios.get("http://192.168.1.129:8080/api/v1/users/checkPassword/" + input.password, {params: {hash: input.hashPass}})
            .then((rep) => {
                if(rep.data === true) {
                    navigation.navigate("MenuNav", {accountID: input.userID});
                } else {
                    Alert.alert("Password is incorrect");
                }
            })
            .catch((e) => console.log(e));
        } else {
            Alert.alert("Email is Incorrect");
        }
    }

    return(

        

         <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                </View>
            <View style={styles.lowerHome}>
                <ScrollView>
                    <View>
                        <Text style={{color: "white", fontSize: 30, position: 'absolute', alignSelf: 'center', top: '5%'}}>Welcome Back!</Text>
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
     </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    lowerHome: {
        position: "absolute",
        top: "35%",
        width: deviceWidth,
        height: deviceHieght,
        borderRadius: 30,
        backgroundColor: "#041598",
    },
    inputBox: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'white',
        backgroundColor: 'white',
        top: "30%",
    },
    loginButton: {
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor:"#90ED65",
        position: 'relative',
        top: "30%"
    },
    loginText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
    },
    createAccountButton: {
      alignItems: "center",
      margin: 10,
      position: 'relative',
      top: "30%",
    },  
    createAccountText: {
      fontSize: 14,
      color: "white",
      textTransform: "uppercase",
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
