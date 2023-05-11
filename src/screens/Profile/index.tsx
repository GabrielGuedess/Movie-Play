import { useState } from 'react';

import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native';

import Toast from 'react-native-toast-message';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

import { zodResolver } from '@hookform/resolvers/zod';
import { delay } from 'helpers/delay';
import { Camera, Envelope, Lock, User } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

const profileSchema = z
  .object({
    name: z
      .string({ required_error: 'Nome é obrigatório' })
      .max(15, 'O nome só pode ter no máximo 15 caracteres'),
    password: z
      .string({ required_error: 'Nova senha é obrigatório' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    oldPassword: z
      .string({ required_error: 'Senha antiga é obrigatório' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string({
      required_error: 'Confirmação de senha é obrigatório',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type ProfileSchema = { email: string } & z.infer<typeof profileSchema>;

export const Profile = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { colors } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'Gabriel Guedes',
      email: 'gabrielrguedess@gmail.com',
    },
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { size } = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        );

        if (size && size / 1024 / 1024 > 5) {
          return Toast.show({
            text1: 'Imagem muito grande!',
            text2: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            type: 'error',
          });
        }

        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Foto de perfil atualizado com sucesso!',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleProfileUpdate = async () => {
    try {
      setIsUpdating(true);
      await delay(3000).then(() =>
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: 'Perfil atualizado com sucesso!',
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container
        colors={[
          colors.backgroundGradient,
          colors.background,
          colors.background,
        ]}
      >
        <StatusBar backgroundColor="transparent" style="light" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <S.WrapperContent>
            <S.WrapperUserPhoto>
              <S.WrapperPhoto>
                <S.UserPhotoBorder>
                  <S.UserPhoto
                    resizeMode="cover"
                    source={{ uri: 'https://github.com/GabrielGuedess.png' }}
                  />
                </S.UserPhotoBorder>

                <S.ButtonPhoto onPress={handleUserPhotoSelect}>
                  <Camera size={32} color={colors.textDetail} />
                </S.ButtonPhoto>
              </S.WrapperPhoto>
            </S.WrapperUserPhoto>

            <S.WrapperInputs>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Nome"
                    autoCapitalize="words"
                    onChangeText={onChange}
                    value={value}
                    isInvalid={!!errors.name?.message}
                    messageError={errors.name?.message}
                    icon={<User size={22} color={colors.textDetail} />}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    disabled
                    onChangeText={onChange}
                    value={value}
                    icon={<Envelope size={22} color={colors.textDetail} />}
                  />
                )}
              />
            </S.WrapperInputs>

            <View>
              <S.Title>Alterar senha</S.Title>

              <S.WrapperInputs>
                <Controller
                  control={control}
                  name="oldPassword"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Senha antiga"
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={onChange}
                      value={value}
                      isInvalid={!!errors.oldPassword?.message}
                      messageError={errors.oldPassword?.message}
                      icon={<Lock size={22} color={colors.textDetail} />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Nova senha"
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={onChange}
                      value={value}
                      isInvalid={!!errors.password?.message}
                      messageError={errors.password?.message}
                      icon={<Lock size={22} color={colors.textDetail} />}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder="Confirmar senha"
                      secureTextEntry
                      autoCapitalize="none"
                      onChangeText={onChange}
                      value={value}
                      isInvalid={!!errors.confirmPassword?.message}
                      messageError={errors.confirmPassword?.message}
                      icon={<Lock size={22} color={colors.textDetail} />}
                    />
                  )}
                />
              </S.WrapperInputs>
            </View>

            <Button
              title="Atualizar"
              isLoading={isUpdating}
              disabled={isUpdating}
              onPress={handleSubmit(handleProfileUpdate)}
            />
          </S.WrapperContent>
        </ScrollView>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};
