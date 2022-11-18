import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { IconButton } from "react-native-paper";
import styles from './components/Styles.js';
import axios from "axios";

const EventsPage = ({navigation}) => {

    const [eventData, setEventData] = useState([]);

    useEffect(() => {
        const GetEvents = async () => {
            try{
                axios
                    .get("http://192.168.1.129:8080/api/v1/events")
                    .then((response) => {
                        setEventData(response.data.events);
                    })
                    .catch((e) => console.log(e));
            } catch(error) {
                console.log(error);
            }
        }
        GetEvents();
    }, []);

    return (
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={styles.UpperHomeText}>Events</Text>
            </View>
            <View style={styles.lowerHome}>
                <View style={styles.eventContainer}>
                    <FlatList
                        data={eventData}
                        renderItem={({ item }) => {return ( 
                            <View style={styles.eventDisplay}>
                                <TouchableOpacity onPress={() => navigation.navigate("TheEvent", {eventID: item.id})}>
                                    <Image source={require('./CoolKidsLogo.png')} style={{height: "50%", width: "95%", margin: 10, position: 'relative'}}/>
                                    <Text style={{fontSize: 32, color: "black", marginLeft: 10, position: "relative", justifyContent: "space-between"}}>{item.eventType}</Text>
                                    <Text style={{fontSize: 14, color: "black", marginLeft: 10, position: "relative"}} numberOfLines={2}>{item.eventDescription}</Text>
                                    <TouchableOpacity style={{backgroundColor: "#3B48AF", borderRadius: 10, height: 30, width: 75, marginLeft: 10, top: "12%"}}>
                                        <Text style={{fontSize: 20,color: "white", alignSelf: "center", margin: 3}}>RSVP</Text>
                                    </TouchableOpacity>
                                    <IconButton icon="map-marker" iconColor="#FFFFFF" style={{backgroundColor: "#3B48AF", borderRadius: 10, height: 30, width: 75, marginRight: 10, alignSelf: 'flex-end'}}></IconButton>
                                </TouchableOpacity>
                            </View>
                        )}}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </View>
    );
}

export default EventsPage;