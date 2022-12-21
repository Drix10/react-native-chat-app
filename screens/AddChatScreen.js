import React, {useLayoutEffect,useState} from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Button, Input, Icon} from "react-native-elements";
import { db } from '../firebaseConfig';

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add New Chat",
            headerStyle:{backgroundColor:"#0b3c6e"},
            headerTitleStyle:{color:"white", textAlign:'center', marginLeft: -40},
            headerTintColor: "white",
            headerBackTitle:"Chats",
        });
    },[]);

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error));
    }

    return (
       
        <View style={styles.container}>
              <Image source={{uri: "https://www.logolynx.com/images/logolynx/bc/bc9990c8f56711192cc0adbbd0ccc81e.png"}} style={styles.imageContainer}/>
            <Input 
            placeholder="Enter A Chat Name" 
            value={input} 
            onChangeText={(text) => setInput(text)}
            onSubmitEditing = {createChat} 
            leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black"/>}/>
            <Button disabled={!input} onPress={createChat} title="Create New Chat"/>
        </View>
    );
};

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"white",
        padding:30,
        height:"100%",
    },
    imageContainer:{
        width:300,
        height:300,
        marginTop:-50,
    },
});