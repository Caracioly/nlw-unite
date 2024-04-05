import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { Credential } from "@/components/credential";

import { colors } from "@/styles/colors";

import * as ImagePicker from "expo-image-picker";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
  const [image, setImage] = useState("");
  const [expandQRCode, setexpandQRCode] = useState(false);

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Foto", "Não foi possivel selecionar a imagem.");
    }
  };

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title={"Minha Credencial"} />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
      >
        <Credential
          image={image}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setexpandQRCode(true)}
        />

        <FontAwesome
          name="angle-double-down"
          color={colors.gray[300]}
          size={24}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4 ">
          Compartilhar Credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do Unite Summit.
        </Text>

        <Button title="Compartilhar"></Button>

        <TouchableOpacity activeOpacity={0.7}>
          <View className="mt-3">
            <Text className="text-base text-orange-600 font-bolt text-center">
              Remover Ingresso
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={expandQRCode}
        statusBarTranslucent
        animationType="slide"
        transparent

      >
        <View className="flex-1 items-center justify-center bg-green-500/90">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setexpandQRCode(false)}
          >
            <View className="border-4 bg-black">
              <QRCode value="teste" size={250} />
            </View>
              <Text className="bg-orange-400 w-[50] self-center text-base text-green-500 font-bold text-center rounded-b-md border">
                Fechar
              </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
