import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Heading, useToast, VStack, Text, HStack } from 'native-base'
import { Share } from 'react-native'

import { http } from '../services/http'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { Guesses } from '../components/Guesses'
import { PoolCardProps } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { Option } from '../components/Option'

interface DetailsParams {
  id: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>()
  const [selectedOption, setSelectedOption] = useState<'guesses' | 'ranking'>('guesses')

  const route = useRoute()
  const toast = useToast()
  const { id } = route.params as DetailsParams

  async function handleShareCode() {
    Share.share({
      message: poolDetails.code
    })
  }

  async function fetchPoolDetails() {
    try {
      setIsLoading(true)

      const response = await http.get(`/pools/${id}`)
      setPoolDetails(response.data.pool)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Falha ao carregar os detalhes bolão',
        placement: 'top',
        bgColor: 'green.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPoolDetails()
  }, [id])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <VStack
      flex={1}
      backgroundColor="gray.900"
    >
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={() => handleShareCode()}
      />

      {
        poolDetails._count.participants > 0 ?
          <VStack px={5} flex={1}>
            <PoolHeader data={poolDetails} />

            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option
                title="Seus palpites"
                isSelected={selectedOption == 'guesses'}
                onPress={() => setSelectedOption('guesses')}
              />
              <Option
                title="Ranking do grupo"
                isSelected={selectedOption == 'ranking'}
                onPress={() => setSelectedOption('ranking')}
              />

            </HStack>

            <Guesses poolId={poolDetails.id} code={poolDetails.code} />
          </VStack>
          :
          <EmptyMyPoolList
            code={poolDetails.code}
          />
      }

    </VStack>
  )
}