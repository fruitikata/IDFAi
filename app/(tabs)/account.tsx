import { Text, View, Platform, StatusBar, StyleSheet } from 'react-native';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.sectName}>Account</Text>
              </View>
      <Text style={styles.text}>Account settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
      color: '#000000',
    },
    header: {
      position: 'absolute',
      top: Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 50,
      left: 0,
      width: '100%',
      paddingLeft: 20,
      paddingVertical: 10,
    },
    sectName: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#F4B133',
    },
});
