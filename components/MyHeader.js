import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements'

import db from '../Config'
import firebase from 'firebase'

export default class MyHeader extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      userId: firebase.auth().currentUser.email
    }
  }
  getValue = () => {
    db.collection("Notifications").where("status","==","unread").where("target_id","==",this.state.userId)
    .onSnapshot(snapshot => {
      var count = snapshot.docs.map(doc => doc.data())
      this.setState({
        value: count.length
      })
    })
  }
  componentDidMount() {
    this.getValue()
  }
  render() {
    return (
      <Header 
        centerComponent={{
            text: this.props.title,
            style: {fontSize: 28, fontFamily: "Fantasy"}
        }}
        backgroundColor="#c1e0b4"
        leftComponent={<Icon name="bars" type="font-awesome" onPress={() => {
          this.props.navigation.toggleDrawer()
        }}/>}
        rightComponent={<View><Icon name="bell" type="font-awesome" size={25} color={"black"} onPress={() => {
          this.props.navigation.navigate("Notification")
        }}/>
      <Badge value={this.state.value} containerStyle={{position: "absolute", top:-4, right:-4}}/></View>}
    />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
