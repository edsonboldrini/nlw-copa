import { Heading, VStack, Text } from 'native-base';

import Logo from '../assets/logo.svg'
import { CustomButton } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function New() {
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
          Crie seu próprio bolão da copa{'\n'}e compartilhe com os amigos
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão"
        />

        <CustomButton
          title="CRIAR MEU BOLÃO"
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