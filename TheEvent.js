import React, { useEffect, useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import styles from './components/Styles.js';

const TheEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);

    const config = {
        method: 'get',
        url: 'http://192.168.1.117:8080/api/v1/events/' + route.params.eventID,
        headers: {
            Authorization: "Bearer " + route.params.userToken
        }
    }

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