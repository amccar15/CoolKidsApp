import React, { useState } from "react";
import {Text, View, StyleSheet} from 'react-native';
import { IconButton } from "react-native-paper";
import styles from './Styles.js';

const Settings = () => {

    const [userInfo, setUserInfo] = useState({
        username: "TestUserName",
        userTitle: "TestUserTitle"
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