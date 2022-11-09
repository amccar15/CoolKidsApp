import React, { useState } from "react";
import { Text, View, TextInput, ScrollView } from 'react-native';
import { IconButton } from "react-native-paper";
import styles from './Styles.js';

const CreateEvent = ({ navigation }) => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        image: "",
        location: "",
        dateTime: "",
        capacity: "",
    })

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
                        onChangeText={(value) => setInput(prevState => {return{...prevState, dateTime: value}})}
                        placeholder={"Enter Event Time"}
                    />
                    <TextInput 
                        style={styles.inputBox}
                        value={input.dateTime}
                        onChangeText={(value) => setInput(prevState => {return{...prevState, capacity: value}})}
                        placeholder={"Enter Event Capacity"}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

export default CreateEvent;