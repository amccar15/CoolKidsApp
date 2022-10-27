import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from "react-native";

const AccountButton = ({onPress, title}) => (
    <TouchableOpacity onPress={onPress} style={styles.accountButton}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const deviceWidth = Dimensions.get('window').width;

const CreateAccount = () => {
    const [email, enteredEmail] = React.useState(null);
    const [phone, enteredPhone] = React.useState(null);
    const [passWord, enteredPassword] = React.useState(null);
    const [first, enteredFirst] = React.useState(null);
    const [last, enteredLast] = React.useState(null);
    return (
            <View style={styles.inputContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                </View>
                <ScrollView>
                    <TextInput
                        style={styles.inputBox}
                        value = {email}
                        onChangeText = {enteredEmail}
                        placeholder={"Enter Email"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={phone}
                        onChangeText={enteredPhone}
                        placeholder={"Enter Phone Number"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={passWord}
                        onChangeText={enteredPassword}
                        placeholder={"Enter Password"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={first}
                        onChangeText={enteredFirst}
                        placeholder={"Enter First Name"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={last}
                        onChangeText={enteredLast}
                        placeholder={"Enter Last Name"}
                    />
                    <AccountButton title={"Create Account"} size="lg"/>
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
    },
    inputBox: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    accountButton: {
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
        paddingBottom: 30,
    },
    image: {
        alignContent: 'center',
        width: deviceWidth,
        height: 300,
    }
});

export default CreateAccount;