import { StyleSheet, Dimensions, StatusBar } from "react-native";

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

export default StyleSheet.create({
    UpperHomeText: {
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
    },
    eventContainer: {
        marginTop: StatusBar.currentHeight || 0,
    },
    eventDisplay: {
        width: deviceWidth - 10,
        height: 300,
        top: 15,
        margin: 5,
        borderRadius: 15,
        position: 'relative',
        backgroundColor: '#90ED65',
    },
    inputText: {
        marginTop: StatusBar.currentHeight || 20,
        margin: 10,
        flex: 1,
    },
    inputBox: {
        marginTop: StatusBar.currentHeight || 40,
        height: 30,
        width: deviceWidth - 25,
        margin: 10,
        borderWidth: 1,
        borderColor: "black",
        flex: 1,
    },
    descBox: {
        marginTop: StatusBar.currentHeight || 40,
        height: 150,
        width: deviceWidth - 25,
        margin: 10,
        borderWidth: 1,
        borderColor: "black",
        flex: 1,
    }, 
    EventButton: {
        margin: 10,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor:"#90ED65",
        flex: 1,
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        flex: 1,
    },
    EventTitle: {
        fontSize: 40,
        alignSelf: 'center',
        fontWeight: "bold",
        flex: 1,

    },
    EventDetailsText:{
        fontSize: 20,
        flex: 1,
    },
    EventText: {
        fontSize: 24,
        flex: 1,

    },
    eventScrollView:{
        flex: 1,
        paddingTop:10,
        paddingBottom:10,
        paddingHorizontal:10
    }
})