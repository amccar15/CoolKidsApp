import React, {useState, useEffect} from "react";
import { Text, View, ScrollView, Image, Alert,TouchableOpacity, FlatList, Linking} from "react-native";
import { IconButton } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import { ip } from './global.js';
import styles from './components/Styles.js';
import axios from "axios";

const HomePage = ({route, navigation}) => {

    const config = {
        method: 'get',
        url: `http://${ip}:8080/api/v1/events`,
    }

    useFocusEffect(
        React.useCallback(() => {
            const getUpcomingEvents = async () => {
                await axios(config)
                    .then((response) => setUpcomingEvents(response.data.events))
                    .catch((e) => console.log(e));
            }
            const getUser = async () => {
                await axios.get(`http://${ip}:8080/api/test/user`)
                            .then((response) => setUserInfo(response.data))
                            .catch((e) => console.log(e));
            }
            getUpcomingEvents();
            getUser();
        }, [userInfo])
    )

    const [UpcomingEvents, setUpcomingEvents] = useState([]);

    const [userInfo, setUserInfo] = useState([]);

    const upcoming = UpcomingEvents.slice(-3);

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
                <Text style={styles.UpperHomeText}>Home</Text>
            </View>
            <View style={styles.lowerHome}>
                <IconButton icon="calendar" containerColor="#000f9f" iconColor="#FFFFFF" size={60} style={styles.calendar} 
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
                <IconButton icon="account-group" containerColor="#000f9f" iconColor="#FFFFFF" size={60} style={styles.eventsPageButton} onPress={() => navigation.navigate("Events")}></IconButton>
                <Text style={{position: 'relative', alignSelf: 'flex-end', right: 75, top: 2}}>Events</Text>
                <Text style={{position: 'relative', padding: 20, fontSize: 40, alignSelf: 'center', color: "#640D7A"}}>Upcoming</Text>
                <FlatList
                    contentContainerStyle={{height: "100%", borderTopLeftRadius: 30, borderTopRightRadius: 30}}
                    data={upcoming}
                    renderItem={({ item }) => {return ( 
                        <View style={styles.upcomingEventIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate("TheEvent", {eventID: item.event_url, role: route.params.accountRole})}>
                                <Image source={{uri: item.eventPhotoUrl}} style={{height: "60%", width: "95%", marginBottom: 10, marginLeft: 10, position: 'relative', borderRadius: 5}}/>
                                <Text style={{fontSize: 17, color: "black", marginLeft: 10, position: "relative", justifyContent: "space-between"}}>{item.eventTitle}</Text>
                                <Text style={{fontSize: 14, color: "black", marginLeft: 10, position: "relative"}} numberOfLines={1}>{item.eventDescription}</Text>
                            </TouchableOpacity>
                        </View>                        
                    )}}
                    keyExtractor={(item) => item.event_url}
                />
            </View>
        </View>
    );
}

export default HomePage;