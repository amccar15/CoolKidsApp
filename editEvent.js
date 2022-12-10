import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Linking, Alert, TextInput, KeyboardAvoidingView, LogBox } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { storageBucket } from "./firebaseConfig.js";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import uuid from "uuid";
import { useFocusEffect } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { ip } from './global.js';
import axios from 'axios';
import styles from './components/Styles.js';

const EditEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const [updateEventInfo, setUpdateEventInfo] = useState({
        photoUrl: "",
        title: "",
        address: "",
        desc: "",
        maxAttendance: "",
        contactName: "",
        contactEmail: "",
        contactPhone: ""
    })

    //get user and event info when page is focuses
    useFocusEffect(
        React.useCallback(() => {
            const getUserInfo = async () => {
                await axios.get(`http://${ip}:8080/api/test/user`)
                            .then((response) => {
                                setUserInfo(response.data);
                            })   
                            .catch((e) => {
                                console.log(e);
                            });
            }
            const getEventById = async () => {
                await axios.get(`http://${ip}:8080` + route.params.eventID)
                    .then((response) => {
                        setCurrentEvent(response.data);
                    })
                    .catch(error => console.log(error));
            }
            getEventById();
            getUserInfo();
        }, [userInfo])
    )

        //creating hooks for date picker
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());        
    const [mode, setMode] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    
        //when the date or time is selected, set the hook to the current date choosen and close picker
    const onChangeStart = (selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setShowStart(false);
    }
    
        //when the date or time is selected set the end date hook to current date or time
    const onChangeEnd = (selectedDate) => {
        const currentDate = selectedDate || startDate;
        setEndDate(currentDate);
        setShowEnd(false);
    }

        //store image data in hook
    const[image, setImage] = useState(null);

    const storage = getStorage();
        
        //allow user to pick a new image
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
                setUpdateEventInfo((prevState => { return {...prevState, photoUrl: downloadURL}}));
                Alert.alert("Photo uploaded!");
            })
        } catch(error) {
            console.log(error);
        }
    }
     
    const verifyInput = () => {
        updateEvent();
    }

    //update event data
            const updateEvent = async () => {
                console.log("File Link: ", updateEventInfo.photoUrl);
                let photo = updateEventInfo.photoUrl;
                await axios.patch(`http://${ip}:8080` + route.params.eventID, {
                    "eventStartDateTime": startDate.toLocaleString(),
                    "eventEndDateTime": endDate.toLocaleString(),
                    "eventTitle": updateEventInfo.title,
                    "eventPhotoUrl": photo,
                    "maxAttendance": updateEventInfo.maxAttendance,
                    "eventAddress": updateEventInfo.address,
                    "eventDescription":  updateEventInfo.desc,
                    "contactPersonName": updateEventInfo.contactName,
                    "contactPersonPhoneNumber": updateEventInfo.contactPhone,
                    "contactPersonEmail": updateEventInfo.contactEmail,
                }).then((response) => {
                    console.log(response.data);
                    navigation.navigate("HomePage") 
                }).catch((e) => console.log(e));
            }

    return(
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                {userInfo.profilePic === null || userInfo.profilePic === "" && (
                        <IconButton icon="account" style={styles.userPhoto}></IconButton>
                    )}
                {userInfo.profilePic != null &&(
                    <Image source={{uri: userInfo.profilePic}} style={{width: 70, height: 70, borderRadius: 20, alignSelf: 'center'}} />
                )}
                <Text style={{fontSize: 25, color: "white", fontWeight: "bold", alignSelf: "center", textTransform: "uppercase", position: 'relative', paddingTop: 5}} numberOfLines={1}>Edit Event</Text>
            </View>
            <View style={styles.lowerHome}>
                <View style={{flex: 1, marginBottom: 200, paddingBottom: 100}}>
                        <ScrollView style={{borderTopRightRadius: 30, borderTopLeftRadius: 30}}>
                        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                            {image === null && (
                                 <Image source={{uri: currentEvent.photoUrl}}  style={{resizeMode: 'cover', width: 300, height: 300, alignSelf: 'center', borderRadius: 20, marginTop: 10}} />
                            )}
                            {image != null && (
                                <Image source={{uri: image}}  style={{resizeMode: 'cover', width: 300, height: 300, alignSelf: 'center', borderRadius: 20, marginTop: 10}} />
                            )}
                            <IconButton icon="image" style={{position: 'absolute', backgroundColor: "white", margin: 10, top: 255}} onPress={() => pickImage()}></IconButton>

                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Title:</Text>
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={{margin: 10, fontSize: 20,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        padding: 7,
                                        borderRadius: 10,
                                        width: "100%",
                                        backgroundColor: '#041598',
                                        color: 'white'
                                    }}
                                    value={updateEventInfo.title}
                                    onChangeText={value => setUpdateEventInfo(prevState => {return {...prevState, title: value}})}
                                    placeholder={currentEvent.eventTitle}
                                    placeholderTextColor={"white"}
                                />    
                            </View>

                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Time:</Text>
                            <View style={{display: "flex", flexDirection: "row", position: 'relative', backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={() => {setShowStart(true); setMode('date');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10,}}>
                                        <Text style={{color: 'white'}}>Set Start Date</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {setShowStart(true); setMode('time');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                        <Text style={{color: 'white'}}>Set Start Time</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{position: 'relative', marginLeft: 10, padding: 10, width: "50%"}}>
                                    {showStart === true && (<RNDateTimePicker
                                        style={{height: 50, width: "65%"}}
                                        value={startDate}
                                        mode={mode}
                                        is24Hour={true}
                                        display='default'
                                        onChange={(event, selectedDate) => onChangeStart(selectedDate)}
                                    />)}
                                </View>
                                <View style={{position: 'absolute', marginLeft: 150, padding: 10, width: "60%"}}>
                                {showStart === false && (
                                    <Text style={{fontFamily:"ArialRoundedMTBold", color: 'white'}}>Time Selected: {String(startDate.toLocaleString())}</Text>
                                )}
                                </View>
                            </View>
                            <Text style={{position: 'relative', marginLeft: 130, fontSize: 20, fontFamily: 'ArialRoundedMTBold'}}>To: </Text>
                            <View style={{display: "flex", flexDirection: "row", position: 'relative', backgroundColor: '#041598', margin: 10, borderRadius: 10}}>
                                <View style={{display: 'flex', flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={() => {setShowEnd(true); setMode('date');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                        <Text style={{color: 'white'}}>Set End Date</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {setShowEnd(true); setMode('time');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                        <Text style={{color: 'white'}}>Set End Time</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{position: 'relative', marginLeft: 10, padding: 10, width: "50%"}}>
                                    {showEnd === true && (<RNDateTimePicker
                                        style={{height: 50, width: "65%"}}
                                        value={endDate}
                                        mode={mode}
                                        is24Hour={true}
                                        display='default'
                                        onChange={(event, selectedDate) => onChangeEnd(selectedDate)}
                                    />)}
                                </View>
                                <View style={{position: 'absolute', marginLeft: 150, padding: 10, width: "60%"}}>
                                {showEnd === false && (
                                    <Text style={{fontFamily:"ArialRoundedMTBold", color: "white"}}>Time Selected: {String(endDate.toLocaleString())}</Text>
                                )}
                                </View>
                            </View>

                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change address:</Text>
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={{margin: 10, fontSize: 20,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        padding: 7,
                                        borderRadius: 10,
                                        height: 'auto',
                                        backgroundColor: '#041598',
                                        color: 'white'
                                    }}
                                    multiline={true}
                                    value={updateEventInfo.address}
                                    onChangeText={value => setUpdateEventInfo(prevState => {return {...prevState, address: value}})}
                                    placeholder={currentEvent.eventAddress}
                                    placeholderTextColor={"white"}
                                />    
                            </View>

                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Change Description:</Text>
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={{margin: 10, fontSize: 20,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        padding: 7,
                                        borderRadius: 10,
                                        height: 'auto',
                                        backgroundColor: '#041598',
                                        color: 'white'
                                    }}
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={updateEventInfo.desc}
                                    onChangeText={value => setUpdateEventInfo(prevState => {return {...prevState, desc: value}})}
                                    placeholder={currentEvent.eventDescription}
                                    placeholderTextColor={"white"}
                                />    
                            </View>


                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Conact Name:</Text>
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={{margin: 10, fontSize: 20,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        padding: 7,
                                        borderRadius: 10,
                                        height: 'auto',
                                        backgroundColor: '#041598',
                                        color: 'white'
                                    }}
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={updateEventInfo.contactName}
                                    onChangeText={value => setUpdateEventInfo(prevState => {return {...prevState, contactName: value}})}
                                    placeholder={currentEvent.contactPersonName}
                                    placeholderTextColor={"white"}
                                />    
                            </View>
                            
                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Conact Email:</Text>
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={{margin: 10, fontSize: 20,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        padding: 7,
                                        borderRadius: 10,
                                        height: 'auto',
                                        backgroundColor: '#041598',
                                        color: 'white'
                                    }}
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={updateEventInfo.contactEmail}
                                    onChangeText={value => setUpdateEventInfo(prevState => {return {...prevState, contactEmail: value}})}
                                    placeholder={currentEvent.contactPersonEmail}
                                    placeholderTextColor={"white"}
                                />    
                            </View>

                            <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Conact Phone:</Text>
                            <View style={{alignSelf: 'flex-start'}}>    
                                <TextInput 
                                    style={{margin: 10, fontSize: 20,
                                        borderWidth: 1,
                                        borderColor: 'black',
                                        padding: 7,
                                        borderRadius: 10,
                                        height: 'auto',
                                        backgroundColor: '#041598',
                                        color: 'white'
                                    }}
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={updateEventInfo.contactPhone}
                                    onChangeText={value => setUpdateEventInfo(prevState => {return {...prevState, contactPhone: value}})}
                                    placeholder={currentEvent.contactPersonPhoneNumber}
                                    placeholderTextColor={"white"}
                                />    
                            </View>

                            <TouchableOpacity style={styles.EventButton} onPress={() => verifyInput()}>
                                <Text style={styles.buttonText}>Save Changes</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default EditEvent;