import React, { useState, useEffect } from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, LogBox, Image} from 'react-native';
import { IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { storageBucket } from "./firebaseConfig.js";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import uuid from "uuid";
import { ip } from './global.js';
import styles from './components/Styles.js';
import axios from "axios";

const Settings = ({navigation}) => {

    useEffect(() => {
        const getProfileInfo = async () => {
            axios.get(`http://${ip}:8080/api/test/user`)
                        .then((response) => {
                            setUserInfo(response.data)
                        })
                        .catch((e) => console.log(e));
        }
        getProfileInfo();
    }, []);

    const[image, setImage] = useState(null);

    const storage = getStorage();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });
        console.log(result);
        LogBox.ignoreAllLogs();

        if(result.assets != null) {
            setImage(result.assets[0].uri);
            uploadPhoto(result.assets[0].uri);
        }
    }

    const uploadPhoto = async (uri) => {
        try {
            const blob = await new Promise((resolve, rejcet) => {
                const data = new XMLHttpRequest();
                data.onload = function () {
                    resolve(data.response);
                };
                data.onerror = function (e) {
                    rejcet(new TypeError("Network request failure"));
                };
                data.responseType = 'blob';
                data.open("GET", uri, true);
                data.send(null);
            });

            const fileRef = ref(storage, uuid.v4());
            const result = await uploadBytes(fileRef, blob);
            blob.close();

            setUpdateInfo({profilePhoto : getDownloadURL(fileRef)});
            console.log(result);
        } catch(error) {
            console.log(error);
        }
    }

    const [userInfo, setUserInfo] = useState([]);

    const [updateInfo, setUpdateInfo] = useState({
        profilePhoto: "",
        email: "",
        phoneNumber: "",
        oldPassword: "",
        newPassword: "",
        confimrPassword: ""
    })

    const [showUpdate, setShow] = useState(false);

    return(
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>

                <View style={settingStyle.topContainer}>
                    <IconButton icon="image" style={settingStyle.pickImageButton} onPress={() => pickImage()}></IconButton>
                    {image === null && (
                        <IconButton icon="account" style={settingStyle.userPhoto}></IconButton>
                    )}
                    {image != null && (
                        <Image source={{uri: image}} style={{width: 70, height: 70, borderRadius: 20, alignSelf: 'center'}} />
                    )}
                    <Text style={settingStyle.usernameText}>{userInfo.username}</Text>
                </View>

                <Text style={styles.UpperHomeText}>Profile</Text>
            </View>
            <View style={styles.lowerHome}>
                <View style={{position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <ScrollView>
                        {showUpdate === false &&  (
                            <View>
                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Email:</Text>
                                <View style={{backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                    <Text style={{position: 'relative', textAlign: 'center', padding: 5, fontSize: 20, fontFamily:"Baskerville-SemiBold", color: 'white'}}>{userInfo.email}</Text>
                                </View>

                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Phone Number:</Text>
                                <View style={{backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                    <Text style={{position: 'relative', textAlign: 'center', padding: 5, fontSize: 20, fontFamily:"Baskerville-SemiBold", color: 'white', }}>{userInfo.phoneNumber}</Text>
                                </View>

                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Password?</Text>
                                <TouchableOpacity style={styles.EventButton} onPress={() => setShow(true)}>
                                    <Text style={styles.buttonText}>Change Information</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {showUpdate === true && (
                        <View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Email:</Text>
                            <View style={{alignSelf: 'flex-start'}}>
                                <TextInput
                                    style={settingStyle.inputBox}
                                    value={updateInfo.email}
                                    onChangeText = {value => setUpdateInfo(prevState => {return {...prevState, email: value}})}
                                    placeholder={userInfo.email}
                                />      
                            </View>   
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Phone Number:</Text>           
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.phoneNumber}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, phoneNumber: value}})}
                                    placeholder={userInfo.phoneNumber}
                                />    
                            </View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Password?</Text>     
                            <View style={{alignSelf: 'flex-start'}}>          
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.oldPassword}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, oldPassword: value}})}
                                    placeholder={"Enter Old Password"}
                                    placeholderTextColor={"white"}
                                />
                            </View>     
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>New Password</Text>
                            <View style={{alignSelf: 'flex-start'}}>
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.newPassword}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, newPassword: value}})}
                                    placeholder={"Enter New Password"}
                                    placeholderTextColor={"white"}
                                />
                            </View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Confirm Password</Text>
                            <View style={{alignSelf: 'flex-start'}}>
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.confimrPassword}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, confimrPassword: value}})}
                                    placeholder={"Confrim New Password"}
                                    placeholderTextColor={"white"}
                                />
                            </View>
                            <TouchableOpacity style={styles.EventButton} onPress={() => setShow(false)}>
                                <Text style={styles.buttonText}>Update Account</Text>
                            </TouchableOpacity>
                        </View>
                        )}  
                        <Text style={{position: 'relative', fontSize: 40, alignSelf: 'center', color: "#640D7A"}}>My Events</Text>              
                    </ScrollView>
                </View>
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
    pickImageButton: {
        backgroundColor: 'white',

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
        marginTop: 30,
        fontFamily: 'Baskerville-SemiBold'
    },
    inputBox: {
        margin: 10,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        padding: 7,
        borderRadius: 10,
        width: "100%",
        backgroundColor: '#041598',
        color: 'white'
    }
});

export default Settings;