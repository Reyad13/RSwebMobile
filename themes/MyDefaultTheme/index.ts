import { DefaultTheme } from '@react-navigation/native'

const MyDefaultTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#ffffff"
    }
}

export default MyDefaultTheme