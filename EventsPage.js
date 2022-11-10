import React, { useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import { IconButton } from "react-native-paper";
import styles from './Styles.js';
import axios from "axios";

const eventData = [
    {
        id: 1,
        title: "test1"
    },
    {
        id: 2,
        title: "test2"
    },
];

const EventsPage = ({navigation}) => {

    useEffect(() => {
        const GetEvents = async () => {
            try{
                axios.get("http://localhost:80/api/v1/events").then((response) => console.log(response)).catch((e) => console.log(e));
            } catch(error) {
                console.log(error);
            }
        }
        GetEvents();
    });

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
                                <Text style={{fontSize: 32, color: "black"}}>{item.title}</Text>
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