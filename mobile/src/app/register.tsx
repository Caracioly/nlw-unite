import { View, Image, StatusBar, Alert } from "react-native";
import { Link, router } from "expo-router";

import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { api } from "@/server/api";
import { useBadgeStore } from "@/store/badge-store";
import axios from "axios";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";

const EVENT_ID = "9e9bd979-9d10-4915-b339-3786b1634f33";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const badgeStore = useBadgeStore();

  async function HandleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Inscrição", "Preencha todos os campos!");
      }

      setIsLoading(true);

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(
          `/attendees/${registerResponse.data.attendeeId}/badge`
        );

        badgeStore.save(badgeResponse.data.badge);

        Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
          {
            text: "Ok",
            onPress: () => router.push("/ticket"),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Alert.alert("Inscrição", "Este e-mail já está cadastrado!");
        }
      }

      Alert.alert("Inscrição", "Não foi possivel fazer a inscrição.");
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field onChangeText={setName} placeholder="Nome Completo" />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            onChangeText={setEmail}
            placeholder="E-mail"
            keyboardType="email-address"
          />
        </Input>

        <Button
          isLoading={isLoading}
          onPress={HandleRegister}
          title="Realizar inscrição"
        />
        <Link
          className="text-gray-100 text-base font-bold text-center mt-8"
          href="/"
        >
          Já possui o ingresso ?
        </Link>
      </View>
    </View>
  );
}
