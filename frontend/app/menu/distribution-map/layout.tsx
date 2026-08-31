

import BiselcoMap from "./components/map";



type Props = {
    children: React.ReactNode
}
const DistributionMapLayout = ({
children
}:Props) => {
  return (
    <div className="min-h-full flex flex-col">
        <BiselcoMap>{children}</BiselcoMap>
    </div>
    
  )
}

export default DistributionMapLayout