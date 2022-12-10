import React, { useEffect, useState } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity, Image, LogBox, Alert} from 'react-native';
import { IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import { storageBucket } from "./firebaseConfig.js";
import { ref, getDownloadURL, uploadBytes, getStorage } from "firebase/storage";
import uuid from "uuid";
import styles from './components/Styles.js';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from "@react-navigation/native";
import { ip } from './global.js';
import axios from "axios";

const CreateEvent = ({ navigation }) => {

    //creating hooks for user input
    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        capacity: 0,
        photoUrl: ""
    });

    //user information hook
    const [userInfo, setUserInfo] = useState([]);

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

    const [image, setImage] = useState(null);

    //firebase bucket
    const storage = getStorage();
    //pick and image from camera roll
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
    
    //uploading photo to firebase
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
                setInput(prevState => {return {...prevState, photoUrl: downloadURL}});
                Alert.alert("Photo uploaded!");
            })
        } catch(error) {
            console.log(error);
        }
    }

    //gets the user info for who is creating the event
    useFocusEffect(
        React.useCallback(() => {
            const getEventCreator = async () => {
                await axios.get(`http://${ip}:8080/api/test/user`)
                            .then((response) => {
                                setUserInfo(response.data);
                            })
                            .catch((e) => console.log(e));
            }    
            getEventCreator();
        }, [userInfo])
    )

    //this button gets the event credi
    const TheEventButton = ({title}) => (
        <TouchableOpacity onPress={() => createEvent()} style={styles.EventButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    //sending event to the database
    const createEvent = async () => {
        //converting date to a readable string before passing
        let formatStartDate = startDate.toLocaleString();
        let formatEndDate = endDate.toLocaleString();
        await axios.post(
            `http://${ip}:8080/api/v1/events/create`,
            {
                "id": 18,
                "eventStartDateTime": formatStartDate,
                "eventEndDateTime": formatEndDate,
                "eventCreatedDate": null,
                "eventUpdatedDate": null,
                "eventType": null,
                "maxAttendance": input.capacity,
                "currentRSVPS": null,
                "eventTitle": input.title,
                "eventDescription": input.description,
                "eventAddress": input.location,
                "eventPhotoUrl": input.photoUrl,
                "contactPersonName": userInfo.firstName + " " + userInfo.lastName,
                "contactPersonPhoneNumber": userInfo.phoneNumber,
                "contactPersonEmail": userInfo.email,
                "event_url": null,
            })
            .then((response) => {
                console.log(response.data);
                navigation.navigate("Events");
            })
            .catch((e) => console.log(e));
    }

    return (
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                {userInfo.profilePic === null || userInfo.profilePic === "" && (
                        <IconButton icon="account" style={styles.userPhoto}></IconButton>
                    )}
                {userInfo.profilePic != null &&(
                        <Image source={{uri: userInfo.profilePic}} style={{width: 70, height: 70, borderRadius: 20, alignSelf: 'center'}} />
                )}
                <Text style={styles.UpperHomeText}>Create Event</Text>
            </View>
            <View style={styles.lowerHome}>
                <View style={{flex: 1, marginBottom: 200, paddingBottom: 100}}>
                    <ScrollView style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                            {input.photoUrl !== "" && (
                                <Image source={{uri: input.photoUrl}} style={{resizeMode: 'cover', width: 300, height: 300, alignSelf: 'center', borderRadius: 20, marginTop: 10}} />
                            )}
                            <TouchableOpacity style={styles.EventButton} onPress={() => pickImage()}>
                                <Text style={styles.buttonText}>Add a Cover Photo!</Text>
                            </TouchableOpacity>
                            <View style={{display: 'flex', flexDirection: 'column', position: 'relative'}}>
                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Title:</Text>
                                <TextInput 
                                    style={styles.inputBox}
                                    value={input.title}
                                    onChangeText={(value) => setInput(prevState => {return{...prevState, title: value}})}
                                    placeholder={"Enter Event Title"}
                                />
                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Description:</Text>
                                <TextInput 
                                    style={styles.descBox}
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={input.description}
                                    onChangeText={(value) => setInput(prevState => {return{...prevState, description: value}})}
                                    placeholder={"Enter Event Description"}
                                />
                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Address:</Text>
                                <TextInput 
                                    style={styles.inputBox}
                                    value={input.location}
                                    onChangeText={(value) => setInput(prevState => {return{...prevState, location: value}})}
                                    placeholder={"Enter Event Address"}
                                />
                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                    <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Capacity:</Text>
                                    <TextInput 
                                        style={{height: 30, width: 80, margin: 10, borderWidth: 1, borderColor: "black", borderRadius: 10,}}
                                        value={input.capacity}
                                        onChangeText={(value) => setInput(prevState => {return{...prevState, capacity: value}})}
                                        placeholder={"Capacity"}
                                    />
                                </View>
                                <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Time:</Text>
                                <View style={{display: "flex", flexDirection: "row", position: 'relative', backgroundColor: '#90ED65', margin: 10, borderRadius: 10}}>
                                    <View style={{display: 'flex', flexDirection: 'column'}}>
                                        <TouchableOpacity onPress={() => {setShowStart(true); setMode('date');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                            <Text>Set Start Date</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {setShowStart(true); setMode('time');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                            <Text>Set Start Time</Text>
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
                                        <Text style={{fontFamily:"ArialRoundedMTBold"}}>Time Selected: {String(startDate.toLocaleString())}</Text>
                                    )}
                                    </View>
                                </View>
                                <Text style={{position: 'relative', marginLeft: 130, fontSize: 20, fontFamily: 'ArialRoundedMTBold'}}>To: </Text>
                                <View style={{display: "flex", flexDirection: "row", position: 'relative', backgroundColor: '#90ED65', margin: 10, borderRadius: 10}}>
                                    <View style={{display: 'flex', flexDirection: 'column'}}>
                                        <TouchableOpacity onPress={() => {setShowEnd(true); setMode('date');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                            <Text>Set End Date</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {setShowEnd(true); setMode('time');}} title="Event Date" style={{position: "relative", padding: 10, marginLeft: 10}}>
                                            <Text>Set End Time</Text>
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
                                        <Text style={{fontFamily:"ArialRoundedMTBold"}}>Time Selected: {String(endDate.toLocaleString())}</Text>
                                    )}
                                    </View>
                                </View>
                                <TheEventButton title={"Create Event"} size="lg" />
                            </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}

export default CreateEvent;