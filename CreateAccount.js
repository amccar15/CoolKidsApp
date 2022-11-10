import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Alert } from "react-native";
import axios from "axios";

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

const CreateAccount = ({navigation}) => {
    
    const [input, setInput] = useState({
        email: "",
        phoneNumber: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const AccountButton = ({title}) => (
        <TouchableOpacity onPress={registerUser} style={styles.accountButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    const config = {
        method: 'post',
        url: 'http://3.233.254.119/api/v1/register',
        data : {
            "firstName": input.firstName,
            "lastName": input.lastName,                    
            "email": input.email,
            "password": input.password
        }
    }

    const registerUser = async () => {
        try {
            await axios(config).then((response) => {
                console.log(response);  
                navigation.navigate("HomePage");                
            }).catch((e) => {
                console.log(e);
                Alert.alert("Could not register account");
            });
        } catch(error) {
            console.log(error);
        }
    }

    return (
            <View style={styles.inputContainer}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                </View>
                <View style={styles.lowerHome}>
                    <ScrollView>
                        <Text style={{color: "white", fontSize: 30, position: 'absolute', alignSelf: 'center', top: '5%'}}>Create Account</Text>
                        <TextInput
                            style={styles.inputBox}
                            value={input.email}
                            onChangeText = {value => setInput(prevState => {return {...prevState, email: value}})}
                            placeholder={"Enter Email"}
                        />
                        <TextInput 
                            style={styles.inputBox}
                            value={input.phoneNumber}
                            onChangeText={value => setInput(prevState => {return {...prevState, phoneNumber: value}})}
                            placeholder={"Enter Phone Number"}
                        />
                        <TextInput 
                            style={styles.inputBox}
                            value={input.password}
                            onChangeText={value => setInput(prevState => {return {...prevState, password: value}})}
                            placeholder={"Enter Password"}
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
                        <AccountButton title={"Create Account"} size="lg"/>
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
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        top: '15%'
    },
    accountButton: {
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor:"#90ED65",
        top: '15%'
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