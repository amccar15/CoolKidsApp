import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Alert } from "react-native";
import { ip } from './global.js';
import axios from "axios";

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

const CreateAccount = ({navigation}) => {
    
    const [input, setInput] = useState({
        email: "",
        username: "",
        phoneNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        birthdate: "",
        role: ""
    });

    const AccountButton = ({title}) => (
        <TouchableOpacity onPress={() => verifyInput()} style={styles.accountButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    const verifyInput = () => {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        let regDate = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        let regUser = /^[a-zA-Z0-9]+$/;

        if(regEmail.test(input.email) === false) {
            Alert.alert("Email is not entered correctly");
        }
        else if(regPhone.test(input.phoneNumber) === false) {
            Alert.alert("Phone is not entered correctly");
        }
        else if(regDate.test(input.birthdate) === false) {
            Alert.alert("Birthday is not entered correctly");
        }
        else if(regUser.test(input.username) === false) {
            Alert.alert("Username is entered incorrectly");
        }
        else if(input.password === "" || input.password.length < 6){
            Alert.alert("Password must be greater than 6 characters");
        }
        else if(input.firstName === "" || input.lastName === "") {
            Alert.alert("Need input for both First and Last name");
        }
        else if(!(input.role === 'ADMIN' || input.role === 'USER')) {
            Alert.alert("Not a Valid Referral code");
        }
        else {
            registerUser();
        }
    }

    const config = {
        method: 'post',
        url: `http://${ip}:8080/api/auth/signup`,
        data : {
            "username": input.username,
            "firstName": input.firstName,
            "lastName": input.lastName,
            "email": input.email,
            "phoneNumber": input.phoneNumber,
            "birthDate": input.birthdate,
            "password": input.password,
            "role": [input.role],
        }
    }

    const registerUser = async () => {
        await axios(config)
            .then(() => {                      
                navigation.navigate("Login");                
            }).catch((e) => {
                console.log(e);
                Alert.alert("Could not register account, Try again");
            });
    }

    return (
            <View style={styles.inputContainer}>
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                </View>
                <View style={styles.lowerHome}>
                    <ScrollView style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                        <View style={{height: 1200}}>
                            <Text style={{color: "white", fontSize: 30, position: 'relative', alignSelf: 'center', marginTop: 10}}>Create Account</Text>
                            <TextInput
                                style={styles.inputBox}
                                value={input.email}
                                onChangeText = {value => setInput(prevState => {return {...prevState, email: value}})}
                                placeholder={"Enter Email"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.username}
                                onChangeText={value => setInput(prevState => {return {...prevState, username: value}})}
                                placeholder={"Enter Username"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.password}
                                onChangeText={value => setInput(prevState => {return {...prevState, password: value}})}
                                placeholder={"Enter Password"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.phoneNumber}
                                onChangeText={value => setInput(prevState => {return {...prevState, phoneNumber: value}})}
                                placeholder={"Enter Phone Number: xxx-xxx-xxxx"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.firstName}
                                onChangeText={value => setInput(prevState => {return {...prevState, firstName: value}})}
                                placeholder={"Enter First Name"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.lastName}
                                onChangeText={value => setInput(prevState => {return {...prevState, lastName: value}})}
                                placeholder={"Enter Last Name"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.birthdate}
                                onChangeText={value => setInput(prevState => {return {...prevState, birthdate: value}})}
                                placeholder={"Enter Birthday! DD/MM/YYYY"}
                            />
                            <TextInput 
                                style={styles.inputBox}
                                value={input.role}
                                onChangeText={value => setInput(prevState => {return {...prevState, role: value}})}
                                placeholder={"Enter Referal Code"}
                            />
                            <AccountButton title={"Create Account"} size="lg"/>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
            </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        flex: 1,
    },
    lowerHome: {
        position: "absolute",
        top: '35%',
        width: deviceWidth,
        height: deviceHieght,
        borderRadius: 30,
        backgroundColor: "#041598",
    },
    inputBox: {
        position: 'relative',
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10
    },
    accountButton: {
        position: 'relative',
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor:"#90ED65",
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15,
    },
    image: {
        alignContent: 'center',
        width: deviceWidth,
        height: 300,
    }
});

export default CreateAccount;