import ReturnMenu from '@/app/common/components/buttons/return-menu';



export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="bg-base-300 min-h-screen  flex flex-col items-center">
            <header className="w-full p-4">
                <ReturnMenu />
            </header>
            <main className="flex flex-col gap-2 w-full max-w-lg place-content-center place-items-center justify-between py-15 px-4">
                {children}
            </main>
        </div>
    )
}