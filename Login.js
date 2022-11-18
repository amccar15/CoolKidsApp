import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, StatusBar, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import ImageLogo from './components/ImageLogo';
import LoginComponent from './components/LoginCoponent';

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

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
            await axios.get("http://3.233.254.119/api/v1/users/").then((response) => console.log(response))
        } catch(error) {
            console.log(error);
        }
    }

    return(

        <View>
            <ImageLogo 
            imageSource={require('./CoolKidsLogo.png')}
            />
        
                <View style= {{backgroundColor: "#041598", width: '100%', height:'66%'}}>
                <Text style={{color: "white", fontSize: 30, position: 'absolute', alignSelf: 'center', top: '5%'}}>Welcome!</Text>
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
            
            
            
        </View>


    );

        

        // <View style={styles.container}>
        //         <View style={styles.imageContainer}>
        //             <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
        //         </View>
        //     <View style={styles.lowerHome}>
        //         <ScrollView>
        //             <View>
        //                 <Text style={{color: "white", fontSize: 30, position: 'absolute', alignSelf: 'center', top: '5%'}}>Welcome Back!</Text>
        //                 <TextInput
        //                     style={styles.inputBox}
        //                     value={input.email}
        //                     onChangeText={value => setInput(prevState => {return {...prevState, email: value}})}
        //                     placeholder={"Enter Email"}
        //                 />
        //                 <TextInput 
        //                     style={styles.inputBox}
        //                     value={input.password}
        //                     onChangeText={value => setInput(prevState => {return {...prevState, password: value}})}
        //                     placeholder={"Enter Password"}
        //                 />
        //                 <LoginButton title={"Login"} size="lg" backgroundColor="#90ED65"/>
        //                 <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate("createAccount")}>
        //                     <Text style={styles.createAccountText}>Create an Account</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </ScrollView>
        //         </View>
        // </View>
    //);
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
      backgroundColor:"#90ED65"
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
