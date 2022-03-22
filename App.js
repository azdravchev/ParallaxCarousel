import React from 'react';

import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const items = [
  {
    id: 1,
    image: require('./assets/1.jpg'),
    title: 'Image Title',
  },
  {
    id: 2,
    image: require('./assets/2.jpg'),
    title: 'Image Title',
  },
  {
    id: 3,
    image: require('./assets/3.jpg'),
    title: 'Image Title',
  },
  {
    id: 4,
    image: require('./assets/4.jpg'),
    title: 'Image Title',
  },
  {
    id: 5,
    image: require('./assets/5.jpg'),
    title: 'Image Title',
  },
];

const App = () => {
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.FlatList
        data={items}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimation}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            width * (index - 0.5),
            width * index,
            width * (index + 0.5),
          ];
          return (
            <View style={styles.item}>
              <Animated.Image
                source={item.image}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange: [
                            width * (index - 1),
                            width * index,
                            width * (index + 1),
                          ],
                          outputRange: [-width * 0.5, 0, width * 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.titleContainer,
                  {
                    opacity: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange,
                          outputRange: [250, 0, -250],
                        }),
                      },
                    ],
                  },
                ]}>
                <Text style={styles.title}>{item.title}</Text>
              </Animated.View>
              <Animated.View
                style={[StyleSheet.absoluteFillObject, styles.itemOverlay]}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width,
    height,
  },
  itemOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 60,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
});

export default App;
