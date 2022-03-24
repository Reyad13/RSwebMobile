import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, Text, View, Image } from "react-native"
import { useIsFocused, useTheme } from "@react-navigation/native"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../providers/UserProvider"
import { getFirestore, collectionGroup, collection, getDocs } from "firebase/firestore"

type PostType = {
    id: string | null,
    caption: string,
    image: string | null
}
interface PostProps {
    post: PostType
}

const Home = ({ navigation }: any) => {

    const [posts, setPosts] = useState<PostType[] | null>(null)
    const isFocused = useIsFocused()

    useEffect(() => {
        const db = getFirestore()
        const postsRef = collectionGroup(db, 'posts')
        getDocs(postsRef)
            .then(docSnap => {
                if (!docSnap.empty) {
                    var datas = []
                    docSnap.forEach((doc) => {
                        if (doc !== null) {
                            const data = {
                                id: doc.id,
                                caption: doc.get("caption"),
                                image: doc.get("image"),
                            }
                            datas.push(data)
                        }
                        else {
                            console.log("Ce doc n'existe pas")
                        }
                    })
                    setPosts(datas)
                }
            })
    }, [isFocused])

    console.log(posts)

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView style={styles.scrollview}>
                    {posts && posts.map((post, n) =>
                        <>
                            <PostHeader post={post} />
                            <PostImage post={post} />
                        </>
                    )}
                </ScrollView>
            </View>
            <StatusBar style={"auto"} />
        </View>
    )
}

/**
 * --------------------------
 * ------ POST HEADER ------
 * --------------------------
 */
const PostHeader = ({ post }: PostProps) => {

    const { colors } = useTheme()
    const { userInfo } = useContext(UserContext)

    return (
        <View style={styles.postHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: userInfo?.avatar }} style={styles.story} />
                <Text style={[{ color: colors.text, marginLeft: 5, fontWeight: '700' }]}>{userInfo?.username}</Text>
            </View>
            <Text style={{ color: colors.text, fontWeight: '900', marginRight: 5 }}>...</Text>
        </View>
    )
}

/**
 * --------------------------
 * ------ POST IMAGE ------
 * --------------------------
 */
const PostImage = ({ post }: PostProps) => {
    return (
        <View style={{ width: '100%', height: 450 }}>
            <Image source={{ uri: post.image?.toString() }} style={{ height: '100%', resizeMode: 'cover' }} />
        </View>
    )
}

/*const PostFooter = () => {
    return (

    )
}*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    body: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 100,
    },
    scrollview: {
        width: '100%',
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        alignItems: 'center',
    },
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    brand: {
        fontSize: 35,
        fontWeight: "bold",
        fontFamily: 'Pacifico_400Regular',
        marginBottom: 10,
    },
    btnText: {
        fontSize: 14,
        color: "#ffffff",
        fontWeight: "bold",
    },
})

export default Home