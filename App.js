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
      <ScrollView>
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
      <View style={styles.header}>
        <Image
          source={userSelected ? { uri: userSelected.thumbnail } : null}
          style={styles.headerImage}
        />
        <Text style={styles.HeaderText}>{userSelected ? userSelected.name : 'GoNative'}</Text>
      </View>

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
    height: 200
  },
  headerImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  HeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    bottom: 20,
  }
});

export default app;