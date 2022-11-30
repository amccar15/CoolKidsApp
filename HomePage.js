import React, {useState, useEffect} from "react";
import { Text, View, ScrollView, Image, Alert,TouchableOpacity, FlatList } from "react-native";
import { IconButton } from "react-native-paper";
import styles from './components/Styles.js';
import axios from "axios";

const HomePage = ({route, navigation}) => {

    const config = {
        method: 'get',
        url: 'http://192.168.1.117:8080/api/v1/events',
        headers: {
            Authorization: "Bearer " + route.params.userToken
        }
    }

    useEffect(() => {
        const getUpcomingEvents = async () => {
            await axios(config)
                .then((response) => setUpcomingEvents(response.data.events))
                .catch((e) => console.log(e));
        }
        getUpcomingEvents();
    })

    const [UpcomingEvents, setUpcomingEvents] = useState([]);

    return (
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto} onPress={() => navigation.navigate("Settings")}></IconButton>
                <Text style={styles.UpperHomeText}>Home</Text>
            </View>
            <View style={styles.lowerHome}>
                <IconButton icon="calendar" containerColor="#3B48AF" iconColor="#FFFFFF" size={60} style={styles.calendar} 
                onPress={() => {
                    Alert.alert('Open Calendar?','"CoolKidsApp" Would Like to Open Your Calendar App',
                    [
                        {
                            text:"Cancel",
                            onPress: () => console.log("cancled"),
                            style: "cancel"
                        },

                        {
                            text:"OK",
                            onPress: () => {if(Platform.OS === 'ios') {
                                Linking.openURL('calshow:');
                              } else if(Platform.OS === 'android') { 
                                Linking.openURL('content://com.android.calendar/time/');
                              }}
                            
                        }
                    ]
                    )}
            }>

                </IconButton>
                <Text style={{position: 'relative', left: 68, top: 20}}>Calendar</Text>
                <IconButton icon="account-group" containerColor="#3B48AF" iconColor="#FFFFFF" size={60} style={styles.eventsPageButton} onPress={() => navigation.navigate("Events")}></IconButton>
                <Text style={{position: 'relative', alignSelf: 'flex-end', right: 75, top: 2}}>Events</Text>
                <Text style={{position: 'relative', padding: 20, fontSize: 40, alignSelf: 'center', color: "#640D7A"}}>Upcoming</Text>
                <FlatList
                    contentContainerStyle={{height: 2000}}
                    data={UpcomingEvents}
                    renderItem={({ item }) => {return ( 
                        <View style={styles.upcomingEventIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate("TheEvent", {eventID: item.id})}>
                                <Image source={require('./CoolKidsLogo.png')} style={{height: "50%", width: "95%", marginBottom: 10, marginLeft: 10, position: 'relative'}}/>
                                <Text style={{fontSize: 20, color: "black", marginLeft: 10, position: "relative", justifyContent: "space-between"}}>{item.eventType}</Text>
                                <Text style={{fontSize: 14, color: "black", marginLeft: 10, position: "relative"}} numberOfLines={2}>{item.eventDescription}</Text>
                            </TouchableOpacity>
                        </View>                        
                    )}}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
}

export default HomePage;