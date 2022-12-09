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
import * as Calendar from 'expo-calendar';
import { async } from '@firebase/util';

const TheEvent = ({route, navigation}) => {
    const ROLE = route.params.role;

    const [currentEvent, setCurrentEvent] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    //RSVP USER For EVENT
    const RSVP = async () => {
        await axios.post(`http://${ip}:8080/api/test/addEvent/` + currentEvent.eventTitle)
            .then((response) => {console.log(response.data); Alert.alert("Successfully RSVP'd")})
            .catch((e) => {console.log(e); Alert.alert("Could not RSVP you")});
    }

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

    const checkIfUserIsRSVPD = async () => {
        let fullID = route.params.eventID
        let id = fullID.slice(-1);

        await axios.get(`http://${ip}:8080/api/test/eventsRsvpd`)
        .then((response) => {
            if(response.data === id) {
                console.log(true);
            } else {
                RSVP();
            }
        })
        .catch((e) => console.trace(e));
    }

    // ask for permission to use device calendar, necessary to read and write.
    const GetCalendarPermission = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if(status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            addEventToDeviceCalendar();
        }
    }

    //function needs permissions to work, otherwise will fail
    const addEventToDeviceCalendar = async () => {
        try{
            //Test Dates
            const newDateId = new Date("DEC 11 2022, 7:00:00");
            const newEndDate = new Date("DEC 11 2022, 10:00:00");
            //If using string format must follow:
            //startDate - UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' PS. UTC is 5 hours behind EST time adjust accordingly with moment
            //endDate - UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'


            const defaultCalendarSource = Platform.OS === 'ios' ? await Calendar.getDefaultCalendarAsync() : { isLocalAccount: true, name: "New Calendar" };
            const newCalendar = await Calendar.createCalendarAsync({
      
                //TEST DATES HARDCODED
                title: "New Calendar",
                color: "blue",
                entityType: Calendar.EntityTypes.EVENT,
                sourceId: defaultCalendarSource.id,
                source: defaultCalendarSource,
                name: "internalCalendarName",
                ownerAccount: "personal",
                accessLevel: Calendar.CalendarAccessLevel.OWNER,
                //startDate: currentEvent.eventStartDateTime,
                //endDate: currentEvent.eventEndDateTime,
                //title: currentEvent.eventTitle
        });
        Calendar.openEventInCalendar(newCalendar);
        } catch (e) {
            console.log(e);
        }


    }

    //creating the map link for either apple maps or google maps
    const createMapLink = (addressStr, mapProvider) => {
        if (mapProvider === 'apple') {
            return `http://maps.apple.com/?q=${addressStr}`;
        }
        return `https://www.google.com/maps/search/?api=1&query=${addressStr}`;
    };
    //opening app for either apple or google
    const openNavigationApp = (addressStr) => {
        const mapProvider = (Platform.OS === 'ios') ? 'apple' : 'google';
        const mapLink = createMapLink(addressStr, mapProvider);

        Linking.openURL(mapLink)
            .catch(err => console.error('An error occurred', err));
    };

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
                <Text style={{fontSize: 25, color: "white", fontWeight: "bold", alignSelf: "center", textTransform: "uppercase", position: 'relative', paddingTop: 5}} numberOfLines={1}>{currentEvent.eventTitle}</Text>
            </View>
            <View style={styles.lowerHome}>
                <View style={{flex: 1, marginBottom: 200, paddingBottom: 100}}>
                    <ScrollView style={{borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                            <Image source={{uri: currentEvent.eventPhotoUrl}} style={styles.image}/>

                            <TouchableOpacity style={styles.RSVPButton} onPress={() => checkIfUserIsRSVPD()}>
                                <Text style={styles.RSVPText}>RSVP For the Event</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.RSVPButton} onPress={() => GetCalendarPermission()}>
                                <Text style={styles.RSVPText}>Add to your Calendar</Text>
                            </TouchableOpacity>

                            {currentEvent.eventEndDateTime === null && (
                                <View style={{margin: 10, padding: 10, backgroundColor: '#90ED65', borderRadius: 10}}>
                                     <Text style={{fontSize: 20, fontFamily: 'ArialRoundedMTBold'}}>{currentEvent.eventStartDateTime}</Text>
                                </View>
                            )}
                            {currentEvent.eventEndDateTime != null && (
                                <View style={{margin: 10, padding: 10, backgroundColor: '#90ED65', borderRadius: 10}}>
                                    <Text style={{fontSize: 20, fontFamily: 'ArialRoundedMTBold'}}>{currentEvent.eventStartDateTime} to {currentEvent.eventEndDateTime}</Text>
                                </View>
                            )}

                            <TouchableOpacity onPress={() => openNavigationApp(currentEvent.eventAddress)} style={{margin: 10, padding: 5, backgroundColor: '#90ED65', borderRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{fontFamily: 'ArialRoundedMTBold', top: 10, width: "80%"}}>Location: {currentEvent.eventAddress}</Text>
                                <IconButton icon="map-marker" iconColor="#FFFFFF" style={{
                                            backgroundColor: "#3B48AF", 
                                            borderRadius: 10, 
                                            height: 30, 
                                            width: 60,
                                        }}></IconButton>
                            </TouchableOpacity>

                            <Text style={{fontFamily: 'ArialRoundedMTBold', fontSize: 25, marginLeft: 10, padding: 10}}>Going: {currentEvent.currentRSVPS} / {currentEvent.maxAttendance}</Text>

                            <View style={{margin: 10, borderStyle: "solid", borderColor: "black", borderWidth: 1, height: 200}}>
                                <Text style={{marginLeft: 10}}>{currentEvent.eventDescription}</Text>
                            </View>

                            <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold"}}>Contact Info: </Text>
                            <Text style={{marginLeft: 25}}>{currentEvent.contactPersonName}</Text>
                            <Text style={{marginLeft: 25}}>{currentEvent.contactPersonPhoneNumber}</Text>
                            <Text style={{marginLeft: 25}}>{currentEvent.contactPersonEmail}</Text>
                            {ROLE == "ADMIN" && (
                            <TouchableOpacity style={styles.EventButton} onPress={() => navigation.navigate("EditEvent", {eventID: route.params.eventID})}>
                                <Text style={styles.buttonText}>See an issue?, click to edit!</Text>
                            </TouchableOpacity>
                            )}
                    </ScrollView>
                </View>
            </View>
            
        </View>
    );
}
 export default TheEvent;