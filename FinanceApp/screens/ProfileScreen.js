import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { auth } from '../firebase.js';
import { DangerButton } from "../components/Buttons.js";

export default function ProfileScreen() {
    const user = auth.currentUser;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Minha Conta</Text>
            
            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{user?.email}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>ID do Usuário:</Text>
                    <Text style={styles.value}>{user?.uid}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Conta criada em:</Text>
                    <Text style={styles.value}>
                        {user?.metadata.creationTime ? 
                            new Date(user.metadata.creationTime).toLocaleDateString('pt-BR') : 
                            'Data não disponível'}
                    </Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.label}>Último login:</Text>
                    <Text style={styles.value}>
                        {user?.metadata.lastSignInTime ? 
                            new Date(user.metadata.lastSignInTime).toLocaleDateString('pt-BR') : 
                            'Data não disponível'}
                    </Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <DangerButton 
                    text="Desconectar" 
                    action={() => auth.signOut()} 
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 40,
        color: '#27428f',
        fontWeight: 'bold'
    },
    infoContainer: {
        backgroundColor: '#f8f8f8',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    infoItem: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5
    },
    value: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500'
    },
    buttonContainer: {
        marginTop: 20
    }
}); 