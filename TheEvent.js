import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import styles from './components/Styles.js';

const TheEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);

    useEffect(() => {
        const getEventById = async () => {
            axios
                .get("http://192.168.1.129:8080/api/v1/events/" + route.params.eventID)
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