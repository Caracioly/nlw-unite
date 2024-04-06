import { View, Image, StatusBar, Alert } from "react-native";
import { useState } from "react";
import { Link, Redirect } from "expo-router";

import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert("Ingresso", "Informe o código do ingresso!");
      }

      setIsLoading(true);

      const { data } = await api.get(`/attendees/${code}/badge`);
      badgeStore.save(data.badge);
    } catch (error) {
      console.error(error);
      Alert.alert("Ingresso", "Ingresso encontrado!");
      setIsLoading(false);
    }
  }

  if(badgeStore.data?.checkInURL){
    return <Redirect href="/ticket"/>
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="mt-12 gap-3 w-full">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            onChangeText={setCode}
            placeholder="Código do Ingresso"
          />
        </Input>
        <Button
          onPress={handleAccessCredential}
          title="Acessar credencial"
          isLoading={isLoading}
        />
        <Link
          className="text-gray-100 text-base font-bold text-center mt-8"
          href="/register"
        >
          Ainda não tem ingresso ?
        </Link>
        <Link
          className="text-gray-100 text-base font-bold text-center mt-8"
          href="/ticket"
        >
          Ticket Debug
        </Link>
      </View>
    </View>
  );
}
