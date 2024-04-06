import {
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { BadgeStore } from "@/store/badge-store";

import { QRCode } from "@/components/qrcode";

import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { MotiView } from "moti";

type CredentialProps = {
  data: BadgeStore;
  image?: string;
  onExpandQRCode?: () => void;
  onChangeAvatar: () => void;
};

export function Credential({
  data,
  onChangeAvatar,
  onExpandQRCode,
}: CredentialProps) {
  const { height } = useWindowDimensions();

  return (
    <MotiView
      from={{
        opacity: 1,
        translateY: -height,
        rotateZ: "50deg",
        rotateY: "30deg",
        rotateX: "30deg",
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: "0deg",
        rotateY: "0deg",
        rotateX: "0deg",
      }}
      transition={{
        duration: 3000,
        type: "spring",
        rotateZ: {
          damping: 15,
          mass: 13,
        },
      }}
      className="w-full self-stretch items-center"
    >
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          className="px-6 py-8  h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
          source={require("@/assets/ticket/header.png")}
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#{data.id}</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <Image
              source={{ uri: data.image }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.9} onPress={onChangeAvatar}>
            <View className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center">
              <Feather name="camera" color={colors.green[400]} size={32} />
            </View>
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {data.name}
        </Text>

        <Text className="font-regular text-base text-zinc-300 ">
          {data.email}
        </Text>

        <View className="mt-2">
          <QRCode value={data.checkInURL} size={120} />
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={onExpandQRCode}>
          <View className="mt-6">
            <Text className="font-body text-orange-500 text-sm">
              Apliar QRcode
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
