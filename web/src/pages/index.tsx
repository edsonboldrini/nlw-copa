interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1 className="text-violet-500 font-bold text-xl">Contagem: {props.count}</h1>
    </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://0.0.0.0:3333/pools/count')

  const data = await response.json()
  console.log(data)

  return {
    props: {
      count: data.count
    }
  }
}
