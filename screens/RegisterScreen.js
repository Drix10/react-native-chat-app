import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import {auth} from "../firebaseConfig";

const RegisterScreen = ({ navigation }) => {

const { email, setEmail } = useState('')
const { password , setPassword } = useState('')
const { name, setName } = useState('')
const { imageUrl, setImageUrl } = useState('')

useLayoutEffect(() => {
    navigation.setOptions({
        headerBackTitle:"Login",
    });
},[navigation]);

useLayoutEffect(() => {
    navigation.setOptions({
        title: "Register",
        headerStyle:{backgroundColor:"dodgerblue"},
        headerTitleStyle:{color:"white", textAlign:'center', marginLeft: -30},
        headerTintColor: "white",
    });
});

const signUp = () => {
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(authUser => {
        authUser.user.updateProfile({
            displayName:name,
            photoURL:imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
    })
}).catch((error) => alert(error.message));
};

return (

<KeyboardAvoidingView behavior='padding' style={styles.container}>
<StatusBar style="dark" />

<Text h3 style={{ marginBottom: 50 }}>
    Create a 1on1 account
</Text>
<View style={styles.inputContainter}>

<Input placeholder='Full Name' 
autoFocus 
type="text" 
value={name}
onChangeText={text => setName(text)} />

<Input placeholder='Email' 
type="email" 
value={email}
onChangeText={text => setEmail(text)} />

<Input placeholder='Password' 
secureTextEntry 
type="password" 
value={password}
onChangeText={text => setPassword(text)} />

<Input placeholder='Profile Picture URL (optional)' 
type="text" 
value={imageUrl}
onChangeText={text => setImageUrl(text)} 
    onSubmitEditing={register}
/>

</View>

<Button raised
onPress={register} 
containerStyle={styles.button} 
type="outline" 
title="Register" />

<View style={{ height: 100 }} />
</KeyboardAvoidingView>

    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center", 
      justifyContent: "center",
      padding: 10,
      backgroundColor: "black", 
    },
    inputContainter: {
     width: 300
    },
    button: {
     width: 200,
     marginTop: 10,
    }
});