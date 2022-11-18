import React from "react";
import {View, Text, StyleSheet, Image ,Dimensions, ScrollView} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;

const LoginComponent = ({imageScore,imageSource,title}) => {
    

    return <View>
        <ScrollView>
            <View>
                <Text>Welcome!</Text>
            </View>

        </ScrollView>

    </View>
   
};


const styles = StyleSheet.create({
    
});

export default LoginComponent;