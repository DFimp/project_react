import { View, Text, StyleSheet, Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";
import ButtonAuth from "./UI/ButtonAuth";

export default function HomeScreen({ navigation }) {    
    return( 
        <View style={styles.container}>
            <ButtonAuth title="Регистрация" onPress={() => navigation.navigate("Registration")}/>
            <ButtonAuth title="Войти" onPress={() => navigation.navigate("Login")}/>
            <ButtonAuth title="Сделать фото" onPress={() => navigation.navigate("PageMakePhoto")}/>
            <ButtonAuth title="Статистика по товару" onPress={() => navigation.navigate("ProductPage")}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    }
});