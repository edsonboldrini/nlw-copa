import { Center, Icon, Text } from 'native-base';
import { Fontisto } from '@expo/vector-icons'
import { useAuth } from '../hooks/useAuth';

import Logo from '../assets/logo.svg'
import { CustomButton } from '../components/Button';

export function SignIn() {
  const { signIn, user } = useAuth()

  return (
    <Center flex={1} backgroundColor="gray.900">
      <Logo />
      <CustomButton
        title="ENTRAR COM O GOOGLE"
        type="SECONDARY"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={signIn}
      />
      <Text
        color="white"
        textAlign="center"
        mt={4}
      >
        Não utilizamos nenhuma informação além{'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}