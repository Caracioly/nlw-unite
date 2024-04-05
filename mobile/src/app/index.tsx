import { View, Image, StatusBar, Alert } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Home() {
  const [code, setCode] = useState("");

  function handleAccessCredential() {
    if (!code.trim()) {
      return Alert.alert("Ingresso", "Informe o código do ingresso!");
    }
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
        <Button onPress={handleAccessCredential} title="Acessar credencial" />
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
