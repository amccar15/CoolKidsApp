import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity, Button, Image} from 'react-native';
import { IconButton } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import styles from './components/Styles.js';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";

const CreateEvent = ({ route, navigation }) => {

    //creating hooks for user input
    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        capacity: 0,
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonPhone: ""
    });

    //creating hooks for image picker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    //set mode and show for date picker
    const openModalDate = () => {
        setShow(true);
        setMode('date');
    }

    //setting mode and show for time picker
    const openModalTime = () => {
        setShow(true);
        setMode('time');
    }

    //when the date or time is selected, set the hook to the current date choosen and close picker
    const onChange = (selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    }

    const [image, setImage] = useState([]);

    const pickImage = async () => {
        try {
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,3],
                quality: 1
            });

            console.log(result);

            if(!result.cancelled) {
                setImage(result.uri);
            }
        } catch(e) {
            console.log(e);
        }
    };

    //gets the user info for who is creating the event
    const getEventCreator = () => {
        axios.get('http://172.16.254.143:8080/api/v1/users/id/' + route.params.userID)
        .then((response) => {
            setInput(prevState => {return {...prevState, contactPersonName: response.data.firstName + " " + response.data.lastName}});
            setInput(prevState => {return {...prevState, contactPersonPhone: response.data.phoneNumber}});
            setInput(prevState => {return {...prevState, contactPersonEmail: response.data.email}});
        })
        .catch((e) => console.log(e));
    }

    //styling and creating the create event button
    const TheEventButton = ({title}) => (
        <TouchableOpacity onPress={() => {createEvent(); navigation.navigate("HomePage");}} style={styles.EventButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    //sending event to the database
    const createEvent = async () => {
        getEventCreator();
        axios.post(
            "http://172.16.254.143:8080/api/v1/events/new",
            {
                "maxAttendance": input.capacity,
                "eventType": input.title,
                "eventDescription": input.description,
                "eventAddress": input.location,
                "contactPersonName": input.contactPersonName,
                "contactPersonPhoneNumber": input.contactPersonPhone,
                "contactPersonEmail": input.contactPersonEmail
            })
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    }

    return (
        <View>
            <View style={styles.UpperHome}>
                <IconButton icon="bell" iconColor="#FFFFFF" style={styles.notifcationBell} onPress={() => navigation.navigate("NotificationTab")}></IconButton>
                <IconButton icon="account" style={styles.userPhoto}></IconButton>
                <Text style={styles.UpperHomeText}>Create Event</Text>
            </View>
            <View style={styles.lowerHome}>
                <ScrollView>
                    <Button title="Add an Event Cover Photo" onPress={pickImage} />
                    {image && <Image source={{uri: image}} style={{ width: 200, height: 200, alignSelf: 'center' }} />}
                    <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Title:</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={input.title}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, title: value}})}
                        placeholder={"Enter Event Title"}
                    />
                    <Text style={{position: 'relative', marginLeft: 10, marginTop: 20, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Description:</Text>
                    <TextInput 
                        style={styles.descBox}
                        value={input.description}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, description: value}})}
                        placeholder={"Enter Event Description"}
                    />
                    <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Address:</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={input.location}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, location: value}})}
                        placeholder={"Enter Event Address"}
                    />
                    <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 20, fontFamily:"ArialRoundedMTBold"}}>Event Capacity:</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={input.capacity}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, capacity: value}})}
                        placeholder={"Enter Event Capacity"}
                    />
                    <TouchableOpacity></TouchableOpacity>
                    <Button onPress={() => openModalDate()} title="Event Date" />
                    <Button onPress={() => openModalTime()} title="Event Time" />
                    {show === true && (<RNDateTimePicker
                        style={{ backgroundColor: 'white', height: 50, width: "65%"}}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={(event, selectedDate) => onChange(selectedDate)}
                    />)}
                    {show === false && (
                        <Text style={{position: 'relative', marginLeft: 10, marginTop: 10, fontSize: 15, fontFamily:"ArialRoundedMTBold"}}>Time Selected: {String(date)}</Text>
                    )}
                    <TheEventButton title={"Create Event"} size="lg" />
                </ScrollView>
            </View>
        </View>
    );
}

export default CreateEvent;