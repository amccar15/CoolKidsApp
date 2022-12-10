import React, { useState, useEffect } from "react";
import {Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, LogBox, Image, Alert, KeyboardAvoidingView} from 'react-native';
import { IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { storageBucket } from "./firebaseConfig.js";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import uuid from "uuid";
import { useFocusEffect } from "@react-navigation/native";
import { ip } from './global.js';
import styles from './components/Styles.js';
import axios from "axios";

const Settings = ({route, navigation}) => {
    //get user information when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            const getProfileInfo = async () => {
                await axios.get(`http://${ip}:8080/api/test/user`)
                            .then((response) => {
                                setUserInfo(response.data)
                            })
                            .catch((e) => console.log(e));
            }
            getProfileInfo();
        }, [userInfo])
    )

     //store image data in hook
     const[image, setImage] = useState(null);
     //get storage bucket from firebase
     const storage = getStorage();
     //let user pick photo from camera roll
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
     //upload the photo chosen in pickImage to firebase
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
 
             getDownloadURL(fileRef).then((downloadURL) => {
                 console.log('File at: ', downloadURL);
                 setUpdateInfo((prevState => { return {...prevState, profilePhoto: downloadURL}}));
                 Alert.alert("Photo uploaded!");
             })
         } catch(error) {
             console.log(error);
         }
     }

    //validate users input
    const verifyInput = () => {
        if(updateInfo.oldPassword != route.params.usrPassword) {
            Alert.alert("Old password is incorrect");
        }
        else if(updateInfo.newPassword != updateInfo.confimrPassword) {
            Alert.alert("Passwords do not match");
        }
        else {
            updateUser();
        }
    }

    //update user information
    const updateUser = async () => {
        await axios.patch(`http://${ip}:8080/api/test/patchUser`, {
            "firstName": updateInfo.firstName,
            "lastName": updateInfo.lastName,
            "password": updateInfo.confimrPassword,
            "birthdate": updateInfo.birthdate,
            "address": updateInfo.address,
            "phoneNumber": updateInfo.phoneNumber,
            "profilePic": updateInfo.profilePhoto,
        }).then((response) => {
            console.log(response.data);
            getProfileInfo();
        }).catch((e) => console.trace(e));
    }

    //store user info in hook
    const [userInfo, setUserInfo] = useState([]);
    //store all update fields
    const [updateInfo, setUpdateInfo] = useState({
        profilePhoto: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        birthdate: "",
        oldPassword: "",
        newPassword: "",
        confimrPassword: ""
    })
    //if set true shows the edit fields if false just shows user info
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
                <View style={{flex: 1, marginBottom: 200, paddingBottom: 100}}>
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


                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Name:</Text>
                                <View style={{backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                    <Text style={{position: 'relative', textAlign: 'center', padding: 5, fontSize: 20, fontFamily:"Baskerville-SemiBold", color: 'white', }}>{userInfo.firstName} {userInfo.lastName} </Text>
                                </View>

                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Address:</Text>
                                <View style={{backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                    <Text style={{position: 'relative', textAlign: 'center', padding: 5, fontSize: 20, fontFamily:"Baskerville-SemiBold", color: 'white', }}>{userInfo.address}</Text>
                                </View>

                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Birthday:</Text>
                                <View style={{backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                    <Text style={{position: 'relative', textAlign: 'center', padding: 5, fontSize: 20, fontFamily:"Baskerville-SemiBold", color: 'white', }}>{userInfo.birthdate}</Text>
                                </View>

                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Password?</Text>
                                <TouchableOpacity style={styles.EventButton} onPress={() => setShow(true)}>
                                    <Text style={styles.buttonText}>Change Information</Text>
                                </TouchableOpacity>
                        </View>
                        )}
                        {showUpdate === true && (
                        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Current Email:</Text>
                            <View style={{backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                    <Text style={{position: 'relative', textAlign: 'center', padding: 5, fontSize: 20, fontFamily:"Baskerville-SemiBold", color: 'white'}}>{userInfo.email}</Text>
                            </View>  
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Phone Number:</Text>           
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.phoneNumber}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, phoneNumber: value}})}
                                    placeholder={userInfo.phoneNumber}
                                    placeholderTextColor={"white"}
                                />    
                            </View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change First Name:</Text>           
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.firstName}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, firstName: value}})}
                                    placeholder={userInfo.firstName}
                                placeholderTextColor={"white"}
                                />    
                            </View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Last Name:</Text>           
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.lastName}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, lastName: value}})}
                                    placeholder={userInfo.lastName}
                                placeholderTextColor={"white"}
                                />    
                            </View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Address:</Text>           
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.address}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, address: value}})}
                                    placeholder={userInfo.address}
                                placeholderTextColor={"white"}
                                />    
                            </View>
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Birthday:</Text>           
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={settingStyle.inputBox}
                                    value={updateInfo.birthdate}
                                    onChangeText={value => setUpdateInfo(prevState => {return {...prevState, birthdate: value}})}
                                    placeholder={userInfo.birthdate}
                                placeholderTextColor={"white"}
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
                            <TouchableOpacity style={styles.EventButton} onPress={() => {setShow(false); verifyInput();}}>
                                <Text style={styles.buttonText}>Update Account</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        )}                
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