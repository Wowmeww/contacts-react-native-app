import { avatarsSource } from "@/localstorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ContactItem({ contact, index, onToggleFavorite, onSelected }) {
    const handleToggleFavorite = () => {
        if (onToggleFavorite) onToggleFavorite(index);
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onLongPress={() => onSelected(index)}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 }}
        >

            <Image source={contact.avatar? contact.avatar.source : avatarsSource[4].source} style={{ width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', borderColor: '#007BFF', borderWidth: 2 }} />

            <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontWeight: "800", marginBottom: -5 }}>{contact.name}</Text>
                    <Text style={{ fontSize: 12 }}>{contact.number}</Text>
                </View>
                <TouchableOpacity onPress={handleToggleFavorite} style={{zIndex: 90}}>
                    {
                        contact.favorite ?
                            <MaterialIcons name="favorite" size={36} color="#007BFF" /> :
                            <MaterialIcons name="favorite-border" size={36} color="#007BFF" />
                    }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}