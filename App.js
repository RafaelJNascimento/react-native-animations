import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import User from './components/Users';
import usersData from './domain/userData';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const App = () => {

  const [userSelected, SetUserSelected] = useState();
  const [userInfoVisible, SetUserInfoVisible] = useState();
  const [users] = useState([...usersData]);

  selectUser = (user) => {
    SetUserSelected(user);
    SetUserInfoVisible(true);
  }

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const scale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  renderDetail = () => (
    <Animated.ScrollView
      contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
      scrollEventThrottle={16}
      onScroll={Animated.event([{
        nativeEvent: { contentOffset: { y: scrollY } }
      }],
        { useNativeDriver: true, }
      )}
    >
      <User
        user={userSelected}
        onPress={() => {
          SetUserSelected(null);
          SetUserInfoVisible(false)
        }}
      />
    </Animated.ScrollView>
  )

  renderList = () => (

    <Animated.ScrollView
      contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
      scrollEventThrottle={16}
      onScroll={Animated.event([{
        nativeEvent: { contentOffset: { y: scrollY } }
      }],
        { useNativeDriver: true, }
      )}
    >
      {users.map(user =>
        <User
          key={user.id}
          user={user}
          onPress={() => selectUser(user)}
        />
      )}
    </Animated.ScrollView>

  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent" />
      {userInfoVisible ? renderDetail() : renderList()}
      <Animated.View
        style={[
          styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.Image
          source={userSelected ? { uri: userSelected.thumbnail } : null}
          style={[styles.headerImage, { transform: [{ translateY: imageTranslateY }], }]}
        />
        <Animated.Text style={[styles.HeaderText, {
          transform: [{
            scale: scale
          }]
        }]}>
          {userSelected ? userSelected.name : 'GoNative'}</Animated.Text>
      </Animated.View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    backgroundColor: '#2E93E5',
  },
  headerImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  HeaderText: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    fontSize: 25,
    bottom: 8,
  }
});

export default App;