import React, {useState, useEffect, useRef} from 'react';
import { Text, View, Platform, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Camera, CameraType, CameraView, FlashMode } from 'expo-camera';
import Button from '@/components/Button';

export default function Scan() {

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('on');
    const cameraRef = useRef(null);
    const [type, setType] = useState('face');

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []) 

    const toggleFlash = () => {
      setFlash((prev) => (prev === "on" ? "off" : "on"));
    }

    const toggleType = () => {
      setType((prev) => (prev === "face" ? "id" : "face"));
    }

    const takePicture = async () => {
      if(cameraRef) {
        try{
          const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        } catch(e){
          console.log(e);
        }
      }
    }

    if(hasCameraPermission === false){
      return <Text>No camera access.</Text>
    }

  return (
    <View style={styles.container}>
      <View style= {{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 20,
          width: '100%'
        }}>
          {/* <Button icon={'flash'} onPress={() => { */}
            {/* // setFlash((current) => (current === "on" ? "off" : "on")); */}
            {/* // setTorch((prev) => (prev === false ? true : false)); */}
            
          {/* }}/> */}
          <Button icon={'flash'} onPress={toggleFlash} />
          <Button icon={'retweet'} onPress={toggleType} />
        </View>
      <CameraView 
        style={styles.camera}
        facing = {facing}
        flash = {flash}    
        ref = {cameraRef}
        >
        
        </CameraView>
        <View>
          <Button title={'Scan'} icon='camera' onPress={takePicture}/>
        </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const aspectRatio = 3 / 4; // 3:4 aspect ratio
const height = (width - 25) / aspectRatio; // Calculate height based on width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  camera: {
    width: width - 25, // Full width
    height: height,
    borderRadius: 20,
  }
});