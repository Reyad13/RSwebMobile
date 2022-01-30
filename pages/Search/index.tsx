import { useTheme } from "@react-navigation/native"
import { StyleSheet, Text } from "react-native"

const Search = () => {

    const { colors } = useTheme()

    return (
        <Text style={[styles.brand, { color: colors.text }]}>Recherche</Text>
    )
}


const styles = StyleSheet.create({
    brand: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: 'Pacifico_400Regular',
        flex: 0,
        alignItems: 'flex-start',
        width: '100%'
    },
})

export default Search