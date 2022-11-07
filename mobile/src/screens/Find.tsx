import { Heading, VStack } from 'native-base';

import { CustomButton } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Find() {
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
          Encontre um bolão através{'\n'}de seu código único
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
        />

        <CustomButton
          title="BUSCAR BOLÃO"
        />

      </VStack>

    </VStack>
  )
}