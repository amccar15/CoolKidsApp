import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import styles from './components/Styles.js';
import * as Calendar from 'expo-calendar';


const TheEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);

    const config = {
        method: 'get',
        url: 'http://192.168.1.117:8080/api/v1/events/' + route.params.eventID,
        headers: {
            Authorization: "Bearer " + route.params.userToken
        }
    }

// ask for permission to use device calendar
    useEffect(() => {
        (async () => {
          const { status } = await Calendar.requestCalendarPermissionsAsync();
          if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync(
              Calendar.EntityTypes.EVENT
            );
            console.log('Here are all your calendars:');
            console.log({ calendars });
          }
        })();
      }, []);

    useEffect(() => {
        const getEventById = async () => {
            await axios(config)
                .then((response) => {
                    setCurrentEvent(response.data);
                    console.log(response.data);
                })
                .catch(error => console.log(error));
        }
        getEventById();
    }, []);

    const RSVPButton = ({title}) => (
        <TouchableOpacity style={styles.RSVPButton}>
            <Text style={styles.RSVPText}>{title}</Text>
        </TouchableOpacity>
    );

    const AddToCalenderBtn = ({title}) => (
        <TouchableOpacity style={styles.RSVPButton} onPress={addEventToDeviceCalendar}>
            <Text style={styles.RSVPText}>{title}</Text>
        </TouchableOpacity>
    );
    const AddToDeviceCalendarButton = () =>{
        <Button style= {styles.RSVPButton} onPress = {addEventToDeviceCalendar}>
            <Text>Add to Calendar</Text>
        </Button>
    }

    const addEventToDeviceCalendar = async () => {
        try{
            //Test Dates
            const newDateId = new Date("DEC 11 2022, 7:00:00");
            const newEndDate = new Date("DEC 11 2022, 10:00:00");
            //startDate - UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
            //endDate - UTC, format: 'YYYY-MM-DDTHH:mm:ss.SSSZ'

            //TODO use moment to convert strings to proper times
            const res = await Calendar.createEventAsync("1", {
      
        
                //startDate: "2022-12-10T03:00:00.000Z",
                startDate: newDateId,
                endDate: newEndDate,
                //title: 'Breakfast with Santa Fundraiser' ,
                title: currentEvent.eventTitle
        });
        Calendar.openEventInCalendar(res);
        } catch (e) {
            console.log(e);
        }
    }

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
                        <AddToCalenderBtn title="Add to calendar" size = 'lg'/>
                        <Text>{currentEvent.eventStartDateTime} to {currentEvent.eventEndDateTime}</Text>
                        <Text>Location: {currentEvent.eventAddress}</Text>
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