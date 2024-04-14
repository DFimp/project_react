import { View, Text, StyleSheet, Button, Alert } from "react-native";
import ButtonAuth from "./UI/ButtonAuth";
// import { useNavigation } from "@react-navigation/native";

export default function ProductPage({ navigation, router }) {    
    return( 
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.textProcent}>{router.data.textProcent}</Text>
                <Text style={styles.text}>от допустимой цены</Text>
                <Text style={styles.textProduct}>{router.data.textProduct}</Text>
            </View>
            <ButtonAuth title="На главную" onPress={() => navigation.navigate("Home")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between", // Изменено на 'space-between'
        padding: 20,
    },
    textContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", // Добавлено для выравнивания текста по центру
    },
    textProcent: {
        fontSize: 100,
        color: 'green',
        fontWeight: "bold",
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
        color: 'green',
    },
    textProduct: {
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
        color: 'black',
    }
});