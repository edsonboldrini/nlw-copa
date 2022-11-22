import { VStack, Icon, useToast, FlatList } from 'native-base'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

import { Octicons } from '@expo/vector-icons'
import { Header } from '../components/Header'
import { http } from '../services/http'
import { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { PoolCard, PoolPros as PoolCardProps } from '../components/PoolCard'
import { EmptyPoolList } from '../components/EmptyPoolList'

export function Pools() {
  const [isLoading, setIsLoading] = useState(false)
  const [poolsList, setPoolsList] = useState<PoolCardProps[]>([])

  const { navigate } = useNavigation()
  const toast = useToast()

  async function fetchPools() {
    try {
      setIsLoading(true)
      const response = await http.get('/pools')
      setPoolsList(response.data.pools)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Falha ao carregar bolões',
        placement: 'top',
        bgColor: 'green.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPools()
  }, [])

  return (
    <VStack
      flex={1}
      backgroundColor="gray.900"
    >
      <Header
        title="Meus bolões"
      />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>

      {isLoading ?
        <Loading /> :
        <FlatList
          data={poolsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      }



    </VStack>
  )
}