import { useState } from "react";
import {
  Text,
  View,
  Modal,
  Alert,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";

import { MotiView } from "moti";

import { FontAwesome } from "@expo/vector-icons";

import { Redirect } from "expo-router";

import { Header } from "@/components/header";
import { Button } from "@/components/button";
import { Credential } from "@/components/credential";

import { useBadgeStore } from "@/store/badge-store";

import { colors } from "@/styles/colors";

import * as ImagePicker from "expo-image-picker";
import { QRCode } from "@/components/qrcode";

export default function Ticket() {
  const [expandQRCode, setexpandQRCode] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Compartilhar", "Não foi possivel compartilhar.");
    }
  }

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });
      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Foto", "Não foi possivel selecionar a imagem.");
    }
  };

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title={"Minha Credencial"} />
      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
      >
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setexpandQRCode(true)}
        />

        <MotiView
          from={{ translateY: 0 }}
          animate={{ translateY: 20 }}
          transition={{ loop: true, type: "timing", duration: 700, }}
        >
          <FontAwesome
            name="angle-double-down"
            color={colors.gray[300]}
            size={24}
            className="self-center my-4"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4 ">
          Compartilhar Credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do{" "}
          {badgeStore.data.eventTitle}!
        </Text>

        <Button onPress={handleShare} title="Compartilhar"></Button>

        <TouchableOpacity
          onPress={() => badgeStore.remove()}
          activeOpacity={0.7}
        >
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
              <QRCode value={badgeStore.data.checkInURL} size={250} />
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
