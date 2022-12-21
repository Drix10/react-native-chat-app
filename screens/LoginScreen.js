import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import { auth } from "../firebaseConfig";

const LoginScreen = ({ navigation }) => {

const { email, setEmail } = useState('')
const { password , setPassword } = useState('')

useLayoutEffect(() => {
    navigation.setOptions({
        title: "Login",
        headerStyle:{backgroundColor:"#0b3c6e"},
        headerTitleStyle:{color:"white", textAlign:'center'},
        headerTintColor: "white",
    });
});

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
        console.log(authUser)
        if(authUser) {
            navigation.replace("Home");
        }
    });
    return unsubscribe;
   },[])
   const signIn = () => {
         auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error))
   }

return (

<KeyboardAvoidingView behavior='padding' style={styles.container}>
<StatusBar style="dark" />
<Image source={{
    uri: "https://imgur.com/uj8z52h",
}} style={{ width: 200, height: 200 }} />
<View style={styles.inputContainter}>

<Input placeholder='Email' 
autoFocus 
type="email" 
value={email}
onChangeText={text => setEmail(text)} />

<Input placeholder='Password' 
secureTextEntry 
type="password" 
value={password}
onChangeText={text => setPassword(text)} onSubmitEditing={signIn}/>
</View>

<Button containerStyle={styles.button} onPress={signIn} title="Login" />
<Button containerStyle={styles.button} type="outline" title="Register" />
<View style={{ height: 100 }} />
</KeyboardAvoidingView>

    );
};

export default LoginScreen;

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