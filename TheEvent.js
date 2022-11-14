import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import axios from 'axios';
import styles from './Styles.js';

const TheEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);

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
                <Text>{currentEvent.eventStartDateTime}</Text>
                <Text>{currentEvent.eventDescription}</Text>
            </View>
        </View>
    );
}
 export default TheEvent;