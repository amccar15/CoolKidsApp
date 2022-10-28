import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image, Dimensions, ScrollView, StatusBar } from 'react-native';
import React from 'react';

const deviceWidth = Dimensions.get('window').width;

const LoginButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.loginButton}>
        <Text style={styles.loginText}>{title}</Text>
    </TouchableOpacity>
);

const Login = ({navigation}) => {
    const [email, enteredEmail] = React.useState(null);
    const [passWord, enteredPassword] = React.useState(null);
    return(
        <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                </View>
            <ScrollView>
                <View>
                    <TextInput
                        style={styles.inputBox}
                        value = {email}
                        onChangeText = {enteredEmail}
                        placeholder={"Enter Email"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={passWord}
                        onChangeText={enteredPassword}
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
