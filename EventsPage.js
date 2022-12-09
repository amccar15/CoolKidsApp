import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { IconButton } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { ip } from './global.js';
import styles from './components/Styles.js';
import axios from "axios";

const EventsPage = ({route, navigation}) => {

    const [eventData, setEventData] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const config = {
        method: 'get',
        url: `http://${ip}:8080/api/v1/events`
    }

    useFocusEffect(
        React.useCallback(() => {
            const GetEvents = async () => {
                await axios(config)
                    .then((response) => {
                        setEventData(response.data.events);
                    })
                    .catch((e) => console.log(e));
            }
            const getUser = async () => {
                await axios.get(`http://${ip}:8080/api/test/user`)
                            .then((response) => setUserInfo(response.data))
                            .catch((e) => console.log(e));
            }
            GetEvents();
            getUser();
        }, [eventData])
    )

    const RSVP = async (title) => {
        await axios.post('http://172.16.254.136:8080/api/test/addEvent', (
            `${title}`
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
                {userInfo.profilePic === null || userInfo.profilePic === "" && (
                        <IconButton icon="account" style={styles.userPhoto}></IconButton>
                    )}
                {userInfo.profilePic != null &&(
                        <Image source={{uri: userInfo.profilePic}} style={{width: 70, height: 70, borderRadius: 20, alignSelf: 'center'}} />
                )}
                <Text style={styles.UpperHomeText}>Events</Text>
            </View>
            <View style={styles.lowerHome}>
                <View style={styles.eventContainer}>
                    <FlatList
                        style={{height: "100%", width: '100%', display: "flex", flexDirection: 'column', flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30}}
                        data={eventData}
                        renderItem={({ item }) => {return ( 
                            <View style={styles.eventDisplay}>
                                <TouchableOpacity onPress={() => navigation.navigate("TheEvent", {eventID: item.event_url, role: route.params.accountRole})}>
                                    <Image source={{uri: item.eventPhotoUrl}} style={{height: "50%", width: "95%", margin: 10, position: 'relative'}}/>

                                    <Text style={{fontSize: 19, color: "black", marginLeft: 10, position: "relative", justifyContent: "space-between"}}>{item.eventTitle}</Text>

                                    <Text style={{fontSize: 14, color: "black", marginLeft: 10, position: "relative"}} numberOfLines={2}>{item.eventDescription}</Text>

                                    <View style={{display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>

                                    <TouchableOpacity style={{backgroundColor: "#3B48AF", borderRadius: 10, height: 30, width: 75}} onPress={() => RSVP(item.eventTitle)}>
                                        <Text style={{fontSize: 20,color: "white", alignSelf: "center", margin: 3}}>RSVP</Text>
                                    </TouchableOpacity>
                                    <IconButton icon="map-marker" iconColor="#FFFFFF" style={{
                                        backgroundColor: "#3B48AF", 
                                        borderRadius: 10, 
                                        height: 30, 
                                        width: 75,
                                        top: -6.5, 
                                        }}
                                        onPress={() => openNavigationApp(item.eventAddress)}
                                    ></IconButton>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}}
                        keyExtractor={(item) => item.event_url}
                    />
                </View>
            </View>
        </View>
    );
}

export default EventsPage;