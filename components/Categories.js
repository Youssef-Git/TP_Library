import { CATEGORIES, LIVRES as books} from "../models/data";
import { Pressable, View, Text, Modal, ScrollView } from 'react-native';
import { useState } from "react";

const Categories = () => {

    const [selectedCategory, setSelectedCategory] = useState('');

    console.log(selectedCategory)
    console.log(books.filter((book) => book.categorieId === selectedCategory))

    return (

    <View>
        {CATEGORIES.map((categorie, index) =>

            <Pressable key={index} onPress={() => { setSelectedCategory(categorie.id);}}>
                <Text style={{fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: categorie.couleur,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 5}}>{categorie.genre}
                </Text>
            </Pressable>
        )}

        <ScrollView>{books.filter((book) => book.categorieId.includes(selectedCategory)).map((book) => {
            console.log(book)

            return <Text>{book.titre}</Text>
        })}</ScrollView>

    </View>

    );
};

export default Categories;