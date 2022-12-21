import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {db,auth} from "../firebaseConfig"
const CustomListItem = ({id, chatName, enterChat}) => {


    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
            <Avatar rounded source={{ uri: "https://cdn.vox-cdn.com/thumbor/X7QMW9SoyLJAa8GF66ebhDUdpQw=/0x0:1467x814/1200x800/filters:focal(617x290:851x524)/cdn.vox-cdn.com/uploads/chorus_image/image/66587845/Screen_Shot_2020_04_01_at_11.40.36_AM.0.png",}} containerStyle={styles.avatar} />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                   {chatName}
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );
}; 

export default CustomListItem

const styles = StyleSheet.create({
    avatar :{
        resizeMode: 'cover',
    }
})