import React, { useState, useEffect } from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { IconButton } from "react-native-paper";
import styles from './components/Styles.js';
import axios from "axios";

const Settings = ({route, navigation}) => {

    useEffect(() => {
        const getProfileInfo = async () => {
            axios.get('http://172.16.254.143:8080/api/v1/users/id/' + route.params.userID)
                        .then((response) => {
                            setUserInfo(prevState => {return {...prevState, username: response.data.firstName + " " + response.data.lastName}});
                            setUserInfo(prevState => {return {...prevState, userTitle: response.data.userRole}});
                        })
                        .catch((e) => console.log(e));
        }
        getProfileInfo();
    }, []);

    const UpdateAccountButton = ({title}) => (
        <TouchableOpacity style={styles.EventButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    const [userInfo, setUserInfo] = useState({
        username: "",
        userTitle: "",
        email: "",
        phoneNumber: "",
        password: "",
        personalDesc: ""
    })

    return(
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={settingStyle.usernameText}>{userInfo.username}</Text>
                <Text style={settingStyle.userTitleText}>{userInfo.userTitle}</Text>
                <Text style={styles.UpperHomeText}>Profile</Text>
            </View>
            <View style={styles.lowerHome}>
            <ScrollView>
                    <Text style={{color: "white", fontSize: 30, position: 'absolute', alignSelf: 'center', top: '5%'}}>Create Account</Text>
                    <TextInput
                        style={styles.inputBox}
                        value={userInfo.email}
                        onChangeText = {value => setInput(prevState => {return {...prevState, email: value}})}
                        placeholder={"Change Email"}
                    />                        
                    <TextInput 
                        style={styles.inputBox}
                        value={userInfo.phoneNumber}
                        onChangeText={value => setInput(prevState => {return {...prevState, phoneNumber: value}})}
                        placeholder={"Change Phone Number"}
                    />                        
                    <TextInput 
                        style={styles.inputBox}
                        value={userInfo.password}
                        onChangeText={value => setInput(prevState => {return {...prevState, password: value}})}
                        placeholder={"Change Password"}
                    />
                    <TextInput 
                        style={styles.descBox}
                        value={userInfo.personalDesc}
                        onChangeText={value => setInput(prevState => {return {...prevState, personalDesc: value}})}
                        placeholder={"Change your personal desc"}
                    />
                    <UpdateAccountButton title={"Update Account"} size="lg"/>
                </ScrollView>
            </View>
        </View>
    );
}

const settingStyle = StyleSheet.create({
    usernameText: {
        fontSize: 20, 
        color: "white", 
        position: 'absolute', 
        alignSelf: 'flex-end', 
        top: '32%', 
        marginRight: '15%'
    },
    userTitleText: {
        fontSize: 15, 
        color: "white", 
        position: 'absolute', 
        alignSelf: 'flex-end', 
        top: '40%', 
        marginRight: '40%',
        padding: 10,
    }
});

export default Settings;