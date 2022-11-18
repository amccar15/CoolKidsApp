import React, { useEffect, useState } from 'react';
import { View, Text ,Button, FlatList, ScrollView } from 'react-native';
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
    }, []);

    return (
        <View>
            
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={styles.UpperHomeText}>{currentEvent.eventType}</Text>
            </View>
            <View style={styles.lowerHome}>
                {/* <Text>{currentEvent.eventStartDateTime}</Text>
                <Text>{currentEvent.eventDescription}</Text> */}
                <ScrollView style={styles.eventScrollView} contentContainerStyle={{flex:1}} >
                <Text style= {styles.EventTitle}>{testEvent.eventTitle}</Text>
                <Text >{testEvent.eventStartDateTime} to {testEvent.eventEndDateTime}</Text>
                <Text>Location: {testEvent.eventAddress}</Text>
                <Button title='RSVP for event!'></Button>
                <Text>Current RSVPs: {testEvent.currentRSVPS}</Text>
                <Text>Max attendance: {testEvent.maxAttendance}</Text>
                <Text style={styles.EventText}>{testEvent.eventDescription}</Text>
                
                <Text>Host: {testEvent.contactPersonName}</Text>
                <Text>Email: {testEvent.contactPersonEmail}</Text>
                <Text>Phone: {testEvent.contactPersonPhoneNumber}</Text>
                </ScrollView>

                

                
                

            </View>
            
        </View>
    );
}
 export default TheEvent;