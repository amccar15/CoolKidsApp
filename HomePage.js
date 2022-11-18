import React from "react";
import { Text, View, ScrollView, Image, Alert,TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import styles from './components/Styles.js';

const HomePage = ({navigation}) => {
    return (
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto} onPress={() => navigation.navigate("Settings")}></IconButton>
                <Text style={styles.UpperHomeText}>Home</Text>
            </View>
            <View style={styles.lowerHome}>
                <IconButton icon="calendar" containerColor="#3B48AF" iconColor="#FFFFFF" size={60} style={styles.calendar} onPress={() => {Alert.alert('"CoolKidsApp" Would Like to Open Your Calendar App')}}></IconButton>
                <Text style={{position: 'relative', left: 68, top: 20}}>Calendar</Text>
                <IconButton icon="account-group" containerColor="#3B48AF" iconColor="#FFFFFF" size={60} style={styles.eventsPageButton} onPress={() => navigation.navigate("Events")}></IconButton>
                <Text style={{position: 'relative', alignSelf: 'flex-end', right: 75, top: 2}}>Events</Text>
                <Text style={{position: 'relative', padding: 20, fontSize: 40, alignSelf: 'center', color: "#640D7A"}}>Upcoming</Text>
                <ScrollView>
                    <View style={styles.upcomingEventIcon1}>
                        <Image source={require('./CoolKidsLogo.png')} style={{alignItems: 'center', width: "100%", height: "75%"}}/>
                        <Text>Event INFO</Text>
                        <Text>Event Time</Text>
                    </View>
                    <View style={styles.upcomingEventIcon2}>
                        <Image source={require('./CoolKidsLogo.png')} style={{alignItems: 'center', width: "100%", height: "75%"}}/>
                        <Text>Event INFO</Text>
                        <Text>Event Time</Text>
                    </View>
                    <View style={styles.upcomingEventIcon3}>
                        <Image source={require('./CoolKidsLogo.png')} style={{alignItems: 'center', width: "100%", height: "75%"}}/>
                        <Text>Event INFO</Text>
                        <Text>Event Time</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default HomePage;