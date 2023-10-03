import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import ImageZoom from 'react-native-image-pan-zoom';
import {Text} from '../components';
import {APP_COLORS} from '../themes/colors';
import {
  HAS_SAFE_VIEW_INSET_TOP,
  HIT_SLOP,
  IS_ANDROID,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../utils/constants';
import LocalImage from './LocalImage';
import SafeAreaContainer from './SafeAreaContainer';

const ViewImage = () => {
  const route = useRoute();
  const {setOptions, goBack} = useNavigation();
  const {data, defaultIndex} = route?.params || {};
  const [medias] = useState(data || []);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const scaleValue = useRef(1);
  const slideRef = useRef(null);
  const onScroll = e => {
    const idx = Math.round(
      parseFloat(
        e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
      ),
    );

    setCurrentIndex(idx);
  };

  const onChangedOrientation = useCallback(() => {
    setTimeout(() => {
      slideRef?.current?.scrollTo({
        x: SCREEN_WIDTH * currentIndex,
        animated: false,
      });
    });
  }, [currentIndex]);

  useEffect(() => {
    onChangedOrientation();
  }, [onChangedOrientation]);

  const onScrollBeginDrag = () => {};

  useEffect(() => {
    setOptions({
      orientation: 'all',
    });
  }, [setOptions]);

  const onClose = () => {
    setOptions({
      orientation: 'portrait',
    });
    goBack();
  };

  const onScrollEndDrag = () => {
    setTimeout(() => {});
  };

  const onStartShouldSetPanResponder = e => {
    return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
  };

  const onMove = ({scale}) => {
    scaleValue.current = scale;
  };

  const onLayoutHandleChanged = _e => {};

  return (
    <SafeAreaContainer style={styles.container}>
      <ScrollView
        ref={slideRef}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onLayout={onLayoutHandleChanged}
        onMomentumScrollEnd={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}>
        {medias?.map((item, index) => (
          <Animated.View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
            }}
            key={`${index}`}>
            <ImageZoom
              minScale={1}
              maxScale={3}
              cropWidth={SCREEN_WIDTH}
              cropHeight={SCREEN_HEIGHT}
              imageWidth={SCREEN_WIDTH}
              imageHeight={SCREEN_HEIGHT}
              onStartShouldSetPanResponder={onStartShouldSetPanResponder}
              onMove={onMove}>
              <Image
                style={{
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT - (IS_ANDROID ? 24 : 0),
                }}
                source={{uri: `${Config.BASE_URL_API}/public/${item}`}}
                resizeMode="contain"
              />
            </ImageZoom>
          </Animated.View>
        ))}
      </ScrollView>
      <View style={[styles.header]}>
        <TouchableOpacity
          hitSlop={HIT_SLOP}
          onPress={onClose}
          style={[styles.btnCloseLandscape]}>
          <LocalImage
            imageKey="icCaretLeftx24"
            style={[styles.icBack, styles.icBackLandscape]}
            tintColor={APP_COLORS.black}
          />
        </TouchableOpacity>

        <View>
          <Text type={'bold-14'} color={APP_COLORS.white}>
            {currentIndex + 1 || 0}/{data?.length || 0}
          </Text>
        </View>
      </View>
    </SafeAreaContainer>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    top: HAS_SAFE_VIEW_INSET_TOP ? 50 : 30,
  },
  btnCloseLandscape: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: APP_COLORS.white,
  },
  icBack: {
    width: 24,
    height: 24,
  },
  icBackLandscape: {
    width: 16,
    height: 16,
  },
});
