import React, { useState, useEffect } from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { IconButton } from "react-native-paper";
import { ip } from './global.js';
import styles from './components/Styles.js';
import axios from "axios";

const Settings = ({navigation}) => {

    useEffect(() => {
        const getProfileInfo = async () => {
            axios.get(`http://${ip}:8080/api/test/user`)
                        .then((response) => {
                            setUserInfo(prevState => {return {...prevState, username: response.data.username}});
                            setUserInfo(prevState => {return {...prevState, userRole: response.data.roles}});
                        })
                        .catch((e) => console.log(e));
        }
        getProfileInfo();
    }, []);

    const [userInfo, setUserInfo] = useState({
        username: "",
        userRole: [""],
        email: "",
        phoneNumber: "",
        password: "",
        personalDesc: ""
    });

    const [updateInfo, setUpdateInfo] = useState(false);

    return(
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>

                <View style={settingStyle.topContainer}>
                    <IconButton icon="account" style={settingStyle.userPhoto}></IconButton>
                    <Text style={settingStyle.usernameText}>{userInfo.username}</Text>
                </View>

                <Text style={styles.UpperHomeText}>Profile</Text>
            </View>
            <View style={styles.lowerHome}>
                {updateInfo === false && (
                    <ScrollView>
                        <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Email:</Text>
                        <View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>{userInfo.email}</Text>
                        </View>
                        <TouchableOpacity style={styles.EventButton} onPress={() => setUpdateInfo(true)}>
                            <Text style={styles.buttonText}>Change Information</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
                {updateInfo === true && (
                <ScrollView>
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
                    <TouchableOpacity style={styles.EventButton} onPress={() => setUpdateInfo(false)}>
                        <Text style={styles.buttonText}>Update Account</Text>
                    </TouchableOpacity>
                </ScrollView>
                )}
            </View>
        </View>
    );
}

const settingStyle = StyleSheet.create({
    topContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center'
    },
    userPhoto: {
        width: 70,
        height: 70,
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        position: 'relative',
    },
    usernameText: {
        fontSize: 20, 
        color: "white", 
    },
});

export default Settings;