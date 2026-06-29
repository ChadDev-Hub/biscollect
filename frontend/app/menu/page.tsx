import Tools from "./components/tools"
import Header from "../common/components/header"
const Menu = () => {
  return (
    <div className="bg-base-300 flex flex-col items-center justify-center">
      <Header title="DATA COLLECTION TOOLS" />
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-15 px-4  min-h-screen">
        <Tools />
      </main>
    </div>
  )
}

export default Menu