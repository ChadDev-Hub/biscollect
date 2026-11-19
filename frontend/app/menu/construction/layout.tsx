

type Props = {
    children: React.ReactNode
}

const ConstruciontLayout = ({children}: Props) => {
  return (
    <div className="bg-base-300 flex flex-col items-center min-h-screen justify-center">
        {children}
    </div>
  )
}

export default ConstruciontLayout;