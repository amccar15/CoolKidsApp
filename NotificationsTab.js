import React from "react";
import {Text, View, ScrollView, Image, Alert,TouchableOpacity, FlatList,SafeAreaView } from 'react-native';
import { RollInRight } from "react-native-reanimated";

const NotificationTab = () => {
    useEffect(() => {
        const getUpcomingEvents = async () => {
            axios.get("http://172.16.254.143:8080/api/v1/events")
                .then((response) => setUpcomingEvents(response.data.events))
                .catch((e) => console.log(e));
        }
        getUpcomingEvents();
    })

    const [UpcomingEvents, setUpcomingEvents] = useState([]);

    const TESTDATA = [
        {
            id:1,
            title: 'Upcoming Event!',
            description: "Don't miss out on the Birkdale Reimagine event happening on October 13th!",
            time: '9:01pm',
        },
        {
            id:2,
            title: 'Notification Title',
            description: "Notification Description",
            time: 'Time',
        }
    ]

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text>description</Text>
          <Text style={styles.time}>time</Text>
        </View>
      );
      
      
        const renderItem = ({ item }) => (
          <Item title={item.title} />
        )


    return (
        <View>
            <Text>Notification TAB</Text>
            <SafeAreaView>
            <FlatList
            data={TESTDATA}
            renderItem={renderItem}
            keyExtractor= {item=> item.id}
            />
            </SafeAreaView>
            
        </View>
        


        // <FlatList
        //             contentContainerStyle={{height: 2000}}
        //             data={UpcomingEvents}
        //             renderItem={({ item }) => {return ( 
        //                 <View style={styles.upcomingEventIcon}>
        //                     <TouchableOpacity onPress={() => navigation.navigate("TheEvent", {eventID: item.id})}>
        //                         <Image source={require('./CoolKidsLogo.png')} style={{height: "50%", width: "95%", marginBottom: 10, marginLeft: 10, position: 'relative'}}/>
        //                         <Text style={{fontSize: 20, color: "black", marginLeft: 10, position: "relative", justifyContent: "space-between"}}>{item.eventType}</Text>
        //                         <Text style={{fontSize: 14, color: "black", marginLeft: 10, position: "relative"}} numberOfLines={2}>{item.eventDescription}</Text>
        //                     </TouchableOpacity>
        //                 </View>                        
        //             )}}
        //             keyExtractor={(item) => item.id}
        //         />
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#90ED65',
      padding: 5,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
    },
    title: {
      fontSize: 20,
    },
    time: {
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute',
    }
  });

export default NotificationTab;