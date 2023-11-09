import {
  Dimensions,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppInfo from './app.json';

const {height} = Dimensions.get('window');
const {ConnectNativeModule} = NativeModules;
const App = props => {
  return (
    <SafeAreaView>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          zoomControlEnabled={true}
          zoomEnabled={true}
          style={{
            height: height - 200,
          }}
          region={{
            latitude: 16.069560532577032,
            longitude: 108.23408695899637,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: 16.069560532577032,
              longitude: 108.23408695899637,
            }}>
            <Callout>
              <Text>Address</Text>
            </Callout>
          </Marker>
        </MapView>
      </View>
      <View>
        <Text style={styles.title}>App One</Text>
        <Text style={styles.content}>
          Here props from super app: {JSON.stringify(props)}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            ConnectNativeModule?.closeApp(AppInfo.name);
          }}>
          <Text style={styles.content}>Close App</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 10,
  //   paddingVertical: 10,z
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   paddingHorizontal: 15,
  //   justifyContent: 'center',
  // },

  title: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    borderRadius: 4,
    backgroundColor: 'green',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
