import React from "react";
import {View, Text, StyleSheet, Image ,Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHieght = Dimensions.get('window').height;


const ImageLogo = ({imageScore,imageSource,title}) => {
    

    return <View>
        <Image source={imageSource} 
        style = {styles.imageContainer}/>

    </View>
   
};


const styles = StyleSheet.create({
    imageContainer: {
        width: deviceWidth,
        height: deviceHieght/3
    }
});

export default ImageLogo;