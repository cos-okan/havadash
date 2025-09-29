export default function DroneCard({ image, type, model, code, status }: { image: string; type: string; model: string; code: string; status: string }) {
  return (
    <div className="rounded-lg p-4 border border-[#00ace0] text-sm cursor-pointer bg-gray-800 transition-all duration-300">
      <div className="flex justify-start items-center">
        <img src={image} alt="Drone" className="w-48 h-32 rounded-lg" />
        <div className="flex flex-col ml-4 gap-2 flex-1">
          <h1 className="text-white">{type}</h1>
          <p className="text-gray-400">{model}</p>
          <p className="text-gray-400">{code}</p>
          {status === 'Hazır' ? (
            <p className="border border-green-500 rounded-md px-2 py-1 text-green-500 w-fit">{status}</p>
          ) : status === 'Uçuş Atandı' ? (
            <div className="flex justify-between items-center w-full">
              <p className="border border-yellow-500 rounded-md px-2 py-1 text-yellow-500 w-fit">{status}</p>
              <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md">Uçuşu Görüntüle</button>
            </div>
          ) : status === 'Havada' ? (
            <div className="flex justify-between items-center w-full">
              <p className="border border-blue-500 rounded-md px-2 py-1 text-blue-500 w-fit">{status}</p>
              <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md">Uçuşu Görüntüle</button>
            </div>
          ) : status === 'Bakımda' ? (
            <p className="border border-red-500 rounded-md px-2 py-1 text-red-500 w-fit">{status}</p>
          ) : (
            <p className="border border-red-500 rounded-md px-2 py-1 text-red-500 w-fit">{status}</p>
          )}
        </div>
      </div>
    </div>
  );
}
