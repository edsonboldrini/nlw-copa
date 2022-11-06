import Image from 'next/image'
import logoImg from '../assets/logo.svg'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import usersAvatarExampleImage from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'
import { http } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface CountersModel {
  poolsCount: number;
  usersCount: number;
  guessesCount: number;
}

export default function Home(props: CountersModel) {
  const [poolTitle, setPoolTitle] = useState('')
  const [counters, setCounters] = useState<CountersModel>(props)

  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await http.post('/pools', {
        title: poolTitle
      })

      const counters = await fetchData()
      if (counters) {
        setCounters(counters)
      }

      const { code } = response.data
      await navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado para a área de transferência')
      setPoolTitle('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão, tente novamente!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2 ">
          <Image src={usersAvatarExampleImage} alt="" />
          <strong className="text-grey-100 text-xl">
            <span className="text-ignite-500">+{counters.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-grey-800 border border-grey-600 text-sm text-grey-100"
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-grey-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-grey-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-grey-600 flex items-center justify-between text-grey-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{counters.poolsCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-grey-600" />
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{counters.guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>
      <Image src={appPreviewImg} alt="Dois celulares exibindo prévida da aplicação móvel do NLW Copa" />
    </div>
  )
}

async function fetchData(): Promise<CountersModel | null> {
  try {
    const [poolsCountResponse, guessesCountResponse, usersCountResponse] = await Promise.all([
      http.get('/pools/count'),
      http.get('/users/count'),
      http.get('/guesses/count'),
    ])

    return {
      poolsCount: poolsCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getStaticProps = async () => {
  const props: CountersModel = {
    poolsCount: 0,
    usersCount: 0,
    guessesCount: 0
  }

  const counters = await fetchData()
  if (counters) {
    props.poolsCount = counters.poolsCount
    props.usersCount = counters.usersCount
    props.guessesCount = counters.guessesCount
  }

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 600 seconds
    revalidate: 600,
  }
}
