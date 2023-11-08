import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
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
    <Container style={[...defaultStyle, style]}>
      {children}
      {loading && (
        <Modal visible={loading} transparent statusBarTranslucent>
          <View style={styles.loadingView}>
            <ActivityIndicator color={loadingColor || APP_COLORS.primary} />
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