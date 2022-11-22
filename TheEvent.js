import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import styles from './components/Styles.js';

const TheEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);

    const testEvent={
        eventTitle: "Title of Event!",
        eventStartDateTime: "11/01/2022 10:00am",
        eventEndDateTime: "4:00pm",
        eventType: "Social",
        contactPersonEmail:"admin@email.com",
        contactPersonName: "Admin",
        contactPersonPhoneNumber: "123-456-7890",
        currentRSVPS: 50,
        eventAddress: "123 address way",
        eventCreateDate: "10/21/2022",
        eventDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        eventUpdateDate: "10/31/2022",
        maxAttendance: 100

    }

    useEffect(() => {
        const getEventById = async () => {
            axios
                .get("http://192.168.1.117:8080/api/v1/events/" + route.params.eventID)
                .then((response) => {
                    setCurrentEvent(response.data);
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
        getEventById();
    });

    const RSVPButton = ({title}) => (
        <TouchableOpacity style={styles.RSVPButton}>
            <Text style={styles.RSVPText}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={styles.UpperHomeText}>{currentEvent.eventType}</Text>
            </View>
            <View style={styles.lowerHome}>
                <ScrollView>
                    <View style={{flex: 1, height: 1000}}>
                        <Image source={require('./CoolKidsLogo.png')} style={styles.image}/>
                        <RSVPButton title="RSVP For the Event" size='lg'/>
                        <Text>{currentEvent.eventStartDateTime} to {testEvent.eventEndDateTime}</Text>
                        <Text>Location: {testEvent.eventAddress}</Text>
                        <Text style={{fontFamily: 'ArialRoundedMTBold', fontSize: 25, marginLeft: 10, padding: 10}}>Going: {currentEvent.currentRSVPS} / {currentEvent.maxAttendance}</Text>
                        <View style={{margin: 10, borderStyle: "solid", borderColor: "black", borderWidth: 1, height: 200}}>
                            <Text style={{marginLeft: 10}}>{currentEvent.eventDescription}</Text>
                        </View>
                        <Text style={{marginLeft: 10, fontSize: 20, fontWeight: "bold"}}>Contact Info: </Text>
                        <Text style={{marginLeft: 25}}>{currentEvent.contactPersonName}</Text>
                        <Text style={{marginLeft: 25}}>{currentEvent.contactPersonPhoneNumber}</Text>
                        <Text style={{marginLeft: 25}}>{currentEvent.contactPersonEmail}</Text>
                    </View>
                </ScrollView>
            </View>
            
        </View>
    );
}
 export default TheEvent;