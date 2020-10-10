import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Platform,
  Animated,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Text
} from 'react-native';
import User from './components/Users';
import usersData from './domain/userData';

const app = () => {

  const scrowOffset = useRef(new Animated.Value(0)).current;
  const [userSelected, SetUserSelected] = useState();
  const [userInfoVisible, SetUserInfoVisible] = useState();
  const [users] = useState([...usersData]);

  selectUser = (user) => {
    SetUserSelected(user);
    SetUserInfoVisible(true);
  }

  renderDetail = () => (
    <View style={styles.container}>
      <ScrollView>
        <User
          user={userSelected}
          onPress={() => {
            SetUserSelected(null);
            SetUserInfoVisible(false)
          }}
        />
      </ScrollView>
    </View>
  )

  renderList = () => (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: { y: scrowOffset }
          }
        }],
          {
            useNativeDriver: false,
            isInteraction: false
          })}
      >
        {users.map(user =>
          <User
            key={user.id}
            user={user}
            onPress={() => selectUser(user)}
          />
        )}
      </ScrollView>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent" />
      <Animated.View
        style={[
          styles.header,
          {
            height: scrowOffset.interpolate({
              inputRange: [0, 140],
              outputRange: [200, 70],
              extrapolate: 'clamp',
            })
          }
        ]}
      >
        <Image
          source={userSelected ? { uri: userSelected.thumbnail } : null}
          style={styles.headerImage}
        />
        <Animated.Text style={[styles.HeaderText,
         {
          fontSize: scrowOffset.interpolate({
            inputRange: [120, 140],
            outputRange: [24, 16],
            extrapolate: 'clamp',
          })
        }
      ]}>{userSelected ? userSelected.name : 'GoNative'}</Animated.Text>
      </Animated.View>

      {userInfoVisible ? renderDetail() : renderList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#2E93E5',
  },
  headerImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  HeaderText: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  }
});

export default app;