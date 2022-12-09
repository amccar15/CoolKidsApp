import { StyleSheet, Dimensions, StatusBar } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

export default StyleSheet.create({
    UpperHome: {
        height: 200,
        width: deviceWidth,
        backgroundColor: "#000f9f",
    },
    userPhoto: {
        width: 70,
        height: 70,
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        position: 'relative',
    },
    UpperHomeText: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        position: 'relative'
    },
    notifcationBell: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
        margin: 5,
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
    upcomingEventIcon: {
        width: deviceWidth - 10,
        height: 125,
        margin: 5,
        padding: 10,
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#90ED65'
    },
    eventContainer: {
        flex: 1,
        marginBottom: 100,
        paddingBottom: 175
    },
    eventDisplay: {
        width: deviceWidth - 10,
        height: 300,
        top: 15,
        margin: 5,
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#90ED65',
        flex: 1
    },
    inputText: {
        marginTop: StatusBar.currentHeight || 20,
        margin: 10,
    },
    inputBox: {
        marginTop: StatusBar.currentHeight || 10,
        height: 30,
        width: deviceWidth - 25,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
    descBox: {
        marginTop: StatusBar.currentHeight || 10,
        height: 150,
        width: deviceWidth - 25,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    }, 
    EventButton: {
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor:"#90ED65",
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    },
    RSVPButton: {
        position: 'relative',
        margin: 10,
        borderRadius: 10,
        backgroundColor:"#90ED65",
    },
    RSVPText: {
        color: "black",
        fontSize: 30,
        alignSelf: 'center',
        position: 'relative',
        fontFamily: 'ArialRoundedMTBold'
    },
    image: {
        alignContent: 'center',
        width: deviceWidth,
        height: 300,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        position: 'relative'
    }
})