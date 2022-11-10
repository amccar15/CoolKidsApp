import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { IconButton } from "react-native-paper";
import styles from './Styles.js';
import axios from "axios";

const CreateEvent = ({ navigation }) => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        location: "",
        capacity: "",
    });

    const TheEventButton = ({title}) => (
        <TouchableOpacity onPress={createEvent} style={styles.EventButton}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );

    const createEvent = async () => {
        try {
            await axios.post(
                "ADD END POINT LATER",
                {
                    "add data here": input.title,
                }
            )
        } catch(error) {
            console.log(error);
        }
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
                    <TextInput 
                        style={styles.inputBox}
                        value={input.title}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, title: value}})}
                        placeholder={"Enter Event Title"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={input.description}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, description: value}})}
                        placeholder={"Enter Event Description"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={input.location}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, location: value}})}
                        placeholder={"Enter Event Address"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={input.dateTime}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, capacity: value}})}
                        placeholder={"Enter Event Capacity"}
                    />
                    <TheEventButton title={"Create Event"} size="lg" />
                </ScrollView>
            </View>
        </View>
    );
}

export default CreateEvent;