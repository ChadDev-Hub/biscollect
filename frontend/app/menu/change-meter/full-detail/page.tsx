import DetailForm from "./components/detail-form";
import ReturnMenu from "@/app/common/components/return-menu";
type Props = {
  searchParams: Promise<{ uuid: string }>;
};

const FullDetail = async ({ searchParams }: Props) => {
  const { uuid } = await searchParams;

  return (
    <div className="bg-base-300 min-h-screen  flex flex-col items-center">
        <header className="w-full p-4">
            <ReturnMenu />
        </header>
      <main className="flex flex-col gap-2 w-full max-w-lg place-content-center place-items-center justify-between py-15 px-2">
        <h1>{uuid}</h1>
        <DetailForm uuid={uuid} />
      </main>
    </div>
  );
};

export default FullDetail;
