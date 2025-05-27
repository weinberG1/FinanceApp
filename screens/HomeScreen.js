import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";
import { auth, signOut, db } from '../firebase.js';
import { DangerButton, PrimaryButton, SecondaryButton } from "../components/Buttons.js";
import { CustomTextInput } from "../components/CustomInputs.js";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen () {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(auth);
    }

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [data, setData] = useState(new Date());
    const [editingId, setEditingId] = useState(null);
    const [gastos, setGastos] = useState([]);

    const calcularTotal = () => {
        return gastos.reduce((total, gasto) => total + (gasto.valor || 0), 0).toFixed(2);
    };

    const carregarGastos = async () => {
        const snapshot = await getDocs(
            query(
                collection(db, "records"),
                where("user_id", "==", user.uid)
            )
        );
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setGastos(data);
    };

    useEffect(() => {
        if (!user) {
            return;
        }
        carregarGastos();
    }, [user]);

    const adicionarGasto = async () => {
        if (!descricao || !valor) {
            alert("Por favor, preencha todos os campos");
            return;
        }

        await addDoc(collection(db, "records"), {
            descricao,
            valor: parseFloat(valor),
            data: Timestamp.fromDate(new Date(data)),
            user_id: user.uid
        });

        carregarGastos();
        setDescricao("");
        setValor("");
    };

    const atualizarGasto = async () => {
        if (!editingId) return;

        await updateDoc(doc(db, "records", editingId), {
            descricao,
            valor: parseFloat(valor),
            data: Timestamp.fromDate(new Date(data))
        });

        carregarGastos();
        setEditingId(null);
        setDescricao("");
        setValor("");
    };

    const excluirGasto = async (id) => {
        await deleteDoc(doc(db, "records", id));
        carregarGastos();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Lista de Gastos</Text>
                    <SecondaryButton 
                        text="Minha Conta" 
                        action={() => navigation.navigate('Profile')} 
                    />
                </View>

                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total de Gastos:</Text>
                    <Text style={styles.totalValue}>R$ {calcularTotal()}</Text>
                </View>

                <View style={styles.formContainer}>
                    <CustomTextInput
                        placeholder="Descrição"
                        value={descricao}
                        setValue={setDescricao}
                    />

                    <CustomTextInput
                        placeholder="Valor (ex: 14.50)"
                        value={valor}
                        setValue={setValor}
                    />

                    <PrimaryButton
                        text={editingId ? "Atualizar Gasto" : "Adicionar Gasto"}
                        action={editingId ? atualizarGasto : adicionarGasto}
                    />
                </View>

                {gastos.length === 0 ? (
                    <Text style={styles.emptyText}>Nenhum gasto registrado</Text>
                ) : (
                    gastos.map((gasto) => (
                        <View key={gasto.id} style={styles.expenseItem}>
                            <Text style={styles.expenseText}>{gasto.descricao}</Text>
                            <Text style={styles.expenseText}>R$ {gasto.valor}</Text>
                            <Text style={styles.expenseText}>
                                {gasto.data?.toDate().toLocaleDateString()}
                            </Text>

                            <View style={styles.buttonContainer}>
                                <PrimaryButton
                                    text="Editar"
                                    action={() => {
                                        setEditingId(gasto.id);
                                        setDescricao(gasto.descricao);
                                        setValor(gasto.valor.toString());
                                        setData(gasto.data?.toDate());
                                    }}
                                />

                                <DangerButton
                                    text="Excluir"
                                    action={() => excluirGasto(gasto.id)}
                                />
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scrollView: {
        flex: 1
    },
    scrollViewContent: {
        paddingBottom: 40
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        color: '#27428f',
        fontWeight: 'bold'
    },
    totalContainer: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formContainer: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27428f'
    },
    expenseItem: {
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    expenseText: {
        fontSize: 16,
        marginVertical: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
        marginHorizontal: 20
    }
});
