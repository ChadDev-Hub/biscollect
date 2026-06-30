import Tools from "./components/tools"
import Header from "../common/components/header"
const Menu = () => {
  return (
    <div className="bg-base-300 flex flex-col items-center min-h-screen justify-center">
      <Header title="DATA COLLECTION TOOLS" />
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center justify-between py-15 px-4  ">
        <Tools />
      </main>
    </div>
  )
}

export default Menu