import { Box, useToast, FlatList } from 'native-base';
import { useEffect, useState } from 'react';

import { http } from '../services/http'
import { Game, GameProps } from '../components/Game'
import { Loading } from '../components/Loading'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [games, setGames] = useState<GameProps[]>([])

  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function handleGuessConfirm(gameId: string) {
    if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
      return toast.show({
        title: 'Informe o placar do palpite jogo',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)

      await http.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: 'Palpite realizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      await fetchGames()
    } catch (error) {
      toast.show({
        title: 'Erro ao fazer palpite',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await http.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Falha ao carregar os jogos do bolão',
        placement: 'top',
        bgColor: 'green.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [poolId])

  if (isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <Game
          data={item}
          onGuessConfirm={() => { handleGuessConfirm(item.id) }}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
        />
      }
      px={5}
      showsVerticalScrollIndicator={false}
      _contentContainerStyle={{ pb: 100 }}
      ListEmptyComponent={() =>
        <EmptyMyPoolList
          code={code}
        />
      }
    />
  );
}
