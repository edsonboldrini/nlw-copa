import { Heading, VStack, Text, useToast } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { http } from '../services/http';

export function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handleCreatePool() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)

      await http.post('/pools', {
        title: title
      })

      toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'green.500'
      })

      setTitle('')
    } catch (error) {
      console.log(error)

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack
      flex={1}
      backgroundColor="gray.900"
    >
      <Header
        title="Criar novo bolão"
      />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa e compartilhe com os amigos
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handleCreatePool}
          isLoading={isLoading}
          _loading={{
            _spinner: {
              color: 'black'
            }
          }}
        />

        <Text
          color="gray.200"
          fontSize="sm"
          textAlign="center"
          px={10}
          mt={4}
        >
          Não utilizamos nenhuma informação além do seu e-mail para criação de sua conta.
        </Text>

      </VStack>

    </VStack>
  )
}