import { Text, View } from "react-native";

function Loader() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, opacity: 0.8 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#fff" }}>Loading...</Text>
            <Text style={{ fontSize: 14, color: "#fff" }}>Please wait while we load your data.</Text>
            <Text style={{ fontSize: 14, color: "#fff" }}>This may take a few seconds.</Text>
        </View>
    );
}
  


export default Loader;