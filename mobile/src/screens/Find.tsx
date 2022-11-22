import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import { useState } from 'react';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { http } from '../services/http';

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const { navigate } = useNavigation()
  const toast = useToast()

  async function handleJoinPool() {
    if (!code.trim()) {
      return toast.show({
        title: 'Informe um código',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)

      await http.post(`/pools/${code}/join`)

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('pools')
    } catch (error) {
      console.log(error)
      setIsLoading(false)

      if (error.response?.data?.message === 'Pool not found') {
        toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'green.500'
        })
      } else if (error.response?.data?.message === 'You already joined this pool') {
        toast.show({
          title: 'Você já está dentro desse bolão!',
          placement: 'top',
          bgColor: 'green.500'
        })
      } else {
        toast.show({
          title: 'Erro desconhecido',
          placement: 'top',
          bgColor: 'green.500'
        })
      }
    }
  }

  return (
    <VStack
      flex={1}
      backgroundColor="gray.900"
    >
      <Header
        title="Buscar por código"
        showBackButton={true}
      />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          value={code}
        />

        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
          isLoading={isLoading}
          _loading={{
            _spinner: {
              color: 'black'
            }
          }}
        />

      </VStack>

    </VStack>
  )
}