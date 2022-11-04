import React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, Alert } from "react-native";
import { IconButton } from "react-native-paper";

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

const HomePage = ({navigation}) => {
    return (
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={styles.homePageText}>Home</Text>
            </View>
            <View style={styles.lowerHome}>
                <IconButton icon="calendar" containerColor="#3B48AF" iconColor="#FFFFFF" size={60} style={styles.calendar} onPress={() => {Alert.alert('"CoolKidsApp" Would Like to Open Your Calendar App')}}></IconButton>
                <Text style={{position: 'relative', left: 68, top: 20}}>Calendar</Text>
                <IconButton icon="account-group" containerColor="#3B48AF" iconColor="#FFFFFF" size={60} style={styles.eventsPageButton} onPress={() => navigation.navigate("StackEvent")}></IconButton>
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

const styles = StyleSheet.create({
    homePageText: {
        fontSize: 30,
        top: 80,
        color: "#FFFFFF",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    UpperHome: {
        height: 200,
        width: deviceWidth,
        backgroundColor: "#3B48AF",
    },
    userPhoto: {
        width: 70,
        height: 70,
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        top: 50,
    },
    notifcationBell: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
        margin: 5,
    },
    hamburgerMenu: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
        top: 5,
        position: "absolute"
    },
    lowerHome: {
        position: "absolute",
        top: 170,
        width: deviceWidth,
        height: deviceHieght,
        borderRadius: 30,
        backgroundColor: "#FFFFFF",
    },
    calendar: {
        width: 85,
        height: 85,
        position: 'relative',
        alignSelf: 'flex-start',
        left: 50,
        top: 25,
    },
    eventsPageButton: {
        width: 85,
        height: 85,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 50,
        top: 25,
    },
    upcomingEventIcon1: {
        width: deviceWidth - 10,
        height: 125,
        margin: 5,
        padding: 10,
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#90ED65'
    },
    upcomingEventIcon2: {
        width: deviceWidth - 10,
        height: 125,
        margin: 5,
        padding: 10,
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#90ED65'
    },
    upcomingEventIcon3: {
        width: deviceWidth - 10,
        height: 125,
        margin: 5,
        padding: 10,
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#90ED65'
    }
})

export default HomePage;