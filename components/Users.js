import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const User = (props) => {

  const opacity = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.ValueXY({ x: 0, y: 50 })).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 5,
        bounciness: 20,
        useNativeDriver: true
      }),
      Animated.timing(opacity,{
        toValue:1,
        timing: 500,
        useNativeDriver: true
      })
    ]).start();
  })

  return (
    <Animated.View style={[{
      opacity: opacity,
      transform: [
       ...offset.getTranslateTransform() 
      ]
    }
    ]}>
      <TouchableWithoutFeedback onPress={props.onPress} >
        <View style={styles.userContainer}>
          <Image style={styles.thumbnail} source={{ uri: props.user.thumbnail }} />
          <View style={[styles.infoContainer, { backgroundColor: props.user.color }]}>
            <View styles={styles.bioContainer}>
              <Text style={styles.name}>{props.user.name.toUpperCase()}</Text>
              <Text style={styles.description}>{props.user.description.toUpperCase()}</Text>
            </View>
            <View style={styles.likesContainer}>
              <Icon name='heart' size={12} color='#fff' />
              <Text style={styles.likes}>{props.user.likes}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}


const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
    borderRadius: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    backgroundColor: '#57bcbc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  bioContainer: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 10,
  },
  description: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  likes: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  }
});

export default User;