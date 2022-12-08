import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Platform, Linking, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { ip } from './global.js';
import axios from 'axios';
import styles from './components/Styles.js';

const TheEvent = ({route, navigation}) => {

    const [currentEvent, setCurrentEvent] = useState([]);
    const config = {
        method: 'get',
        url: `http://${ip}:8080` + route.params.eventID,
    }

    useEffect(() => {
        const getEventById = async () => {
            await axios(config)
                .then((response) => {
                    setCurrentEvent(response.data);
                })
                .catch(error => console.log(error));
        }
        getEventById();
    }, []);

    const RSVP = async () => {
        await axios.post(`http://${ip}:8080/api/test/addEvent`, (
            currentEvent.eventTitle
        ))
            .then((response) => Alert.alert(response.data))
            .catch((e) => {Alert.alert("Could not register you for the event"); console.log(e)});
    }

    const createMapLink = (addressStr, mapProvider) => {
        if (mapProvider === 'apple') {
            return `http://maps.apple.com/?q=${addressStr}`;
        }
        return `https://www.google.com/maps/search/?api=1&query=${addressStr}`;
    };

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
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={{fontSize: 25, color: "white", fontWeight: "bold", alignSelf: "center", textTransform: "uppercase", position: 'relative', paddingTop: 5}} numberOfLines={1}>{currentEvent.eventTitle}</Text>
            </View>
            <View style={styles.lowerHome}>
                <ScrollView style={{borderRadius: 10}}>
                    <View style={{flex: 1, height: 1500}}>

                        <Image source={{uri: currentEvent.eventPhotoUrl}} style={styles.image}/>

                        <TouchableOpacity style={styles.RSVPButton} onPress={() => RSVP()}>
                            <Text style={styles.RSVPText}>RSVP For the Event</Text>
                        </TouchableOpacity>

                        <View style={{margin: 10, padding: 10, backgroundColor: '#90ED65', borderRadius: 10}}>
                            <Text style={{fontSize: 20, fontFamily: 'ArialRoundedMTBold'}}>{currentEvent.eventStartDateTime}</Text>
                        </View>

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
                    </View>
                </ScrollView>
            </View>
            
        </View>
    );
}
 export default TheEvent;