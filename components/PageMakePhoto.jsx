import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";


export default function PageMakePhoto({ navigation }) {
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [address, setAddress] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');

    let result = null;

    const takePhoto = async () => {
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };
    const imageToBase64 = async (imageUri) => {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            setImageBase64(base64data);
        }
    };
    
    if (result) {
        imageToBase64(result.assets[0].uri);
    }

    const sendPhotoToBase64 = async () => {
        const param = {
            base64Img: imageBase64,
            address: address
        }
        axios.get('http://89.111.172.224/api/PriceDifference', { params })
        .then(response => {
            navigation.navigate("Home", {data: response.data});
        })
        .catch(error => {
            Alert.alert('Ошибка на стороне сервера');
        });
    };

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://89.111.172.224/api/Shop');
            setAddress(response.data);
          } catch (error) {
            console.error("Ошибка при выполнении GET-запроса:", error);
          }
        };
    
        fetchData();
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', paddingTop: 20 }}>
            {image && <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />}
            <View style={{ flex: 1, flexDirection: 'colomn', alignItems: 'center', justifyContent: 'flex-end', width: '100%', padding: 20, gap: 20 }}>
                {image && 
                    <RNPickerSelect
                    onValueChange={value => setSelectedAddress(value)}
                    items={address.map(e => {
                        return {
                            label: e.address,
                            value: e.address,
                        }
                    })}
                    placeholder={{}}
                    />
                }
                <Pressable style={styles.button} onPress={takePhoto}>
                    <Text style={styles.text}>{image ? "Переснять" : "Сделать фото" }</Text>
                </Pressable>
                {image &&   
                    <Pressable style={styles.button} onPress={sendPhotoToBase64}>
                        <Text style={styles.text}>Отправить фото</Text>
                    </Pressable>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    select: {
        backgroundColor: '#8AC0FF',
        borderRadius: 100,
    },
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 100,
        elevation: 3,
        width: '100%',
        height: 51,
        backgroundColor: '#8AC0FF',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});