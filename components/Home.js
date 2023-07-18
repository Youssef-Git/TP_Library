import { CATEGORIES, LIVRES } from "../models/data";
import { Pressable, Image, TextInput, StyleSheet, View, ScrollView, TouchableOpacity, Text, Modal } from 'react-native';
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

    const [modalVisible, setModalVisible] = useState(false);
    const [dataBook, setDataBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredLivres, setFilteredLivres] = useState([]);

    const handleLivrePress = (livre) => {
        setDataBook(livre);
        setSearchQuery('');

    };

    const getCategoriesByIds = (ids) => {
        return CATEGORIES.filter((categorie) => ids?.includes(categorie.id));

    };

    const handleSearch = () => {
        const filteredLivres = LIVRES.filter((livre) =>
            livre.titre.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredLivres(filteredLivres);

    };

    return (

        <View style={{marginTop:50, padding:50}}>

                <Text style={{fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    padding: 5}}>Un peu de Lecture</Text>

            <ScrollView>
                <View style={styles.searchContainer}>

                <TextInput
                style={styles.searchInput}
                placeholder="Search Books"
                value={searchQuery}
                onChangeText={setSearchQuery}/>

                    <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => handleSearch()}>
                    <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.rowContainer}>
                    {filteredLivres.length > 0 ? (
                        filteredLivres.map((livre, index) => (
                            <Pressable key={index} style={styles.card} onPress={() => { setModalVisible(true); handleLivrePress(livre) }}>
                                <Image source={{ uri: livre.imageUrl }} style={styles.image} />
                                <Text style={styles.titleCard}>{livre.titre}</Text>
                            </Pressable>

                        ))

                    ) : (

                        LIVRES.map((livre, index) => (
                            <Pressable key={index} style={styles.card} onPress={() => { setModalVisible(true); handleLivrePress(livre) }}>
                                <Image source={{ uri: livre.imageUrl }} style={styles.image} />
                                <Text style={styles.titleCard}>{livre.titre}</Text>
                            </Pressable>

                        ))

                    )}

                </View>

                <Modal visible={modalVisible} animationType="fade" style={styles.modalView} transparent={true}>
                    <View style={styles.modalView}>
                        <View style={styles.containerIcons}>
                            <Ionicons style={styles.iconClose} name="close-outline" onPress={() => setModalVisible(false)} color={'black'} size={45} />
                        </View>
                        <View style={styles.modalContent}>
                            <Text style={styles.titleModal}>{dataBook?.titre}</Text>
                            <Text>tome : {dataBook?.tomes}</Text>
                            <Text>{dataBook?.description} </Text>
                            <Text>{dataBook?.categorieId}</Text>
                            <Text style={styles.modalSubtitle}>Catégories:</Text>
                            {getCategoriesByIds(dataBook?.categoriesId).map((categorie) => (
                                <Text key={categorie.id}>{categorie.genre}</Text>

                            ))}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>

    )

}

const styles = StyleSheet.create({

    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },

    card: {
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
        marginTop: 10,
        backgroundColor: '#fffacd',
        borderRadius: 15,
        paddingBottom: 15,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'

    },

    image: {
        width: 180,
        height: 280,
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

    },

    titleCard: {
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 12,
        padding: 4

    },

    modalView: {
        margin: 50,
        marginTop: 100,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 2,
        
        shadowOffset: {
            width: 0,
            height: 2,

        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },

    containerIcons: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 0

    },

    modalContent: {
        padding: 25,
        alignItems: 'center',

    },

    titleModal: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 4,
        marginBottom: 18

    },


    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        padding: 10

    },

    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,

    },

    searchButton: {
        backgroundColor: '#add8e6',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    
    },

    searchButtonText: {
        color: 'grey',
        fontWeight: 'bold',
        textAlign: 'center',

    }

})