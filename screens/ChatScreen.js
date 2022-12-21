import React, {useLayoutEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform,  TextInput,Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { db, auth } from '../firebaseConfig';
import firebase from 'firebase/app';
import  "firebase/firestore";


const ChatScreen = ({navigation, route }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
                ><Avatar rounded source={{uri: messages[0]?.data.photoURL || "https://ampelou.s3.amazonaws.com/default.png",}}/>
                <Text style={{color:"white", fontWeight:"700", marginLeft:10, fontSize:15, textAlign:'center'}}>{route.params.chatName}</Text>
                <Text>{route.params.chatName}</Text>
                </View>

            ),
            headerLeft: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginRight: 20,
                    width:80,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white"/>
                    </TouchableOpacity>
                </View>
            )

            });
        }, [navigation, messages]);

        const sendMessage = () =>{
            Keyboard.dismiss();
            db.collection('chats').doc(route.params.id).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                photoURL: auth.currentUser.photoURL,
            });
            setInput('');
        };
    
        useLayoutEffect(() => {
            const unsubscribe = db
            .collection("chats")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot) => setMessages(
                    snapshot.docs.map(doc =>({
                      id: doc.id,
                      data: doc.data(),  
                    }))
            ));
            return unsubscribe;
        }, [route]);

    
    

    return (
        <SafeAreaView style={{flex:1, backgroundColor:"f9f9f9"}}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding":"height"} style={styles.container} keyboardVerticalOffset={90}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 

                <>
                <ScrollView>
                        {messages.map(({id,data}) =>(
                            data.email === auth.currentUser.email ? (
                              <View key={id} style={styles.reciever}>
                                  <Avatar position="absolute" right={-5} bottom={-15} rounded size={30} source={{uri: data.photoURL,}} containerStyle={styles.avatarReciever} />
                                  <Text style={styles.recieverText}>{data.message}</Text>
                                  <Text style={styles.recieverName}>{data.displayName}</Text>
                              </View>  
                            ):(
                                <View style={styles.sender}>
                                    <Avatar position="absolute" left={-5} bottom={-15} rounded size={30} source={{uri: data.photoURL,}} containerStyle={styles.avatarSender} />
                                  <Text style={styles.senderText}>{data.message}</Text>
                                  <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={(sendMessage)} placeholder="Type Message..." style={styles.textInput} />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#0b3c6e"/>
                        </TouchableOpacity>
                    </View>



                </>
                
                </TouchableWithoutFeedback>

                </KeyboardAvoidingView>

                </SafeAreaView>
    );
    
};

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:5,
    },
    reciever:{
        padding:15,
        backgroundColor:"#ababab",
        alignSelf:"flex-end",
        borderRadius:20, 
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20, 
        margin:15,
        maxWidth:"80%",
        position:"relative",
    },
    avatarReciever:{
        position:"absolute",
        bottom: -15,
        right:-5,
    },
    avatarSender:{
        position:"absolute",
        bottom: -15,
        left:-5,
    },
    recieverText:{
        color: "black",
        fontWeight:"400",
        marginRight:10,
        marginBottom:10,
    },
    senderText:{
        color: "white",
        fontWeight:"400",
        marginLeft:10,
        marginBottom:10,
    },
    recieverName:{
        position:"absolute",
        bottom:2,
        right:27,
        fontSize:10,
        color:"black",
    },
    senderName:{
        position:"absolute",
        bottom:2,
        left:27,
        fontSize:10,
        color:"white",
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:10,
    },
    textInput:{
        flex:1,
        bottom:0,
        height:40,
        marginRight:10,
        borderColor:"black",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:5,
        color:"black",
        borderRadius:30,
        width:"100%",
    },
}) 