import React from 'react';

import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pagination from './Pagination';

const {width, height} = Dimensions.get('window');

const items = [
  {
    id: 1,
    image: require('./assets/1.jpg'),
    title: 'Title',
  },
  {
    id: 2,
    image: require('./assets/2.jpg'),
    title: 'Title',
  },
  {
    id: 3,
    image: require('./assets/3.jpg'),
    title: 'Title',
  },
  {
    id: 4,
    image: require('./assets/4.jpg'),
    title: 'Title',
  },
  {
    id: 5,
    image: require('./assets/5.jpg'),
    title: 'Title',
  },
];

const ParallaxCarousel = () => {
  const scrollRef = React.useRef();
  const scrollAnimation = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={scrollRef}
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
                          inputRange: inputRange,
                          outputRange: [250, 0, -250],
                        }),
                      },
                    ],
                  },
                ]}>
                <Text style={styles.title}>{item.title}</Text>
              </Animated.View>
            </View>
          );
        }}
      />
      <Pagination
        items={items}
        scrollAnimation={scrollAnimation}
        scrollRef={scrollRef}
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
    bottom: 140,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
});

export default ParallaxCarousel;
