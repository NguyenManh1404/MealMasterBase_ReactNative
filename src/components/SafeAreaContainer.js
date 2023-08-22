import React, {useMemo} from 'react';
import {Modal, Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {LoadingIndicator} from '.';
import {useAppMode} from '../hooks/useAppMode';
import {APP_COLORS} from '../themes/colors';
import {HAS_SAFE_VIEW_INSET_TOP} from '../utils/constants';

const styleByProperties = ({
  useRow,
  verticalCenter,
  horizontalCenter,
  useBottomPadding,
}) => {
  let initialStyle = [styles.fill];

  if (useRow) {
    initialStyle.push(styles.row);
  }
  if (verticalCenter) {
    initialStyle.push(styles.verticalCenter);
  }
  if (horizontalCenter) {
    initialStyle.push(styles.horizontalCenter);
  }
  if (useBottomPadding) {
    initialStyle.push(
      Platform.select({
        ios: {
          marginBottom: HAS_SAFE_VIEW_INSET_TOP ? 0 : 10,
        },
        android: {
          paddingBottom: HAS_SAFE_VIEW_INSET_TOP ? 0 : 10,
        },
      }),
    );
  }
  return initialStyle;
};

const SafeAreaContainer = ({
  useSafe = true,
  style,
  children,
  verticalCenter = false,
  horizontalCenter = false,
  useRow = false,
  loading = false,
  loadingColor,
  useBottomPadding = false,
}) => {
  const {appModeColor} = useAppMode();

  const defaultStyle = useMemo(() => {
    return styleByProperties({
      useRow,
      verticalCenter,
      horizontalCenter,
      useBottomPadding,
    });
  }, [horizontalCenter, useBottomPadding, useRow, verticalCenter]);

  const Container = useSafe ? SafeAreaView : View;

  return (
    <Container
      style={[
        ...defaultStyle,
        style,
        {backgroundColor: appModeColor.mainBackgroundColor},
      ]}>
      {children}
      {loading && (
        <Modal visible={loading} transparent statusBarTranslucent>
          <View style={styles.loadingView}>
            <LoadingIndicator
              size="large"
              loadingColor={loadingColor || APP_COLORS.primary}
            />
          </View>
        </Modal>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: APP_COLORS.modalFade,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  horizontalCenter: {
    alignItems: 'center',
  },
});

export default SafeAreaContainer;

// import React from 'react';
// import {SafeAreaView as RNSafeAreaView, StyleSheet} from 'react-native';
// import {useAppMode} from '../hooks/useAppMode';

// const SafeAreaContainer = viewProps => {
//   const {bgColor, style, children, ...props} = viewProps;
//   const {appModeColor} = useAppMode();
//   return (
//     <RNSafeAreaView
//       style={[
//         style,
//         styles.container,
//         {backgroundColor: bgColor || appModeColor.mainBackgroundColor},
//       ]}
//       {...props}>
//       {children}
//     </RNSafeAreaView>
//   );
// };

// export default SafeAreaContainer;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
