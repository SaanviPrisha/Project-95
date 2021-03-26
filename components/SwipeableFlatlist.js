import React from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Dimensions, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view'
import { ListItem, Icon } from 'react-native-elements'
import db from '../Config'
import firebase from 'firebase'

export default class SwipeableFlatlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allNotifications: this.props.allNotifications
        }
    }
    renderItem = ({item}) => (
        <Animated.View>
            <ListItem 
                leftElement={<Image source={ 
                    require("../assets/Dress.png")
                }
                style={styles.image}
                />}
                title={item.type}
                titleStyle={{fontWeight: "bold",fontSize: 20}}
                subtitle={item.message}
                bottomDivider
            />
        </Animated.View>
    )
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn,styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Mark as read</Text>
            </View>
        </View>
    )
    onSwipeValueChange = (swipeData) => {
        var notification = this.state.allNotifications
        const {key, value} = swipeData
        if(value < -Dimensions.get("window").width) {
            var newData = [...notification]
            this.markAsRead(notification[key])
            newData.splice(key,1)
            this.setState({
                allNotifications: newData
            })
        }
    }
    markAsRead = (notif) => {
        db.collection("Notifications").doc(notif["doc_id"]).update({
            status: "read"
        })
    }
    render() {
        return (
        <View style={styles.container}>
            <SwipeListView 
                data={this.state.allNotifications}
                disableRightSwipe
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={"0"}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                keyExtractor={(item,index) => index.toString()}
                onSwipeValueChange={this.onSwipeValueChange}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: "white", 
        flex: 1 
    }, 
    backTextWhite: { 
        color: "#FFF", 
        fontWeight: "bold", 
        fontSize: 15, 
        textAlign: "center", 
        alignSelf: "flex-start" 
    }, 
    rowBack: { 
        alignItems: "center", 
        backgroundColor: "#f2817c", 
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingLeft: 15 
    }, 
    backRightBtn: { 
        alignItems: "center", 
        bottom: 0, 
        justifyContent: "center", 
        position: "absolute", 
        top: 0, 
        width: 100 }, 
    backRightBtnRight: { 
        backgroundColor: "#f2817c", 
        right: 0 
    }, 
    image: {
        width: 50, 
        height: 60, 
        marginLeft: 10,
        borderRadius: 10
    }
});