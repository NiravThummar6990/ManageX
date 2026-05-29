import { useNavigate } from "react-router-dom"

export function StatusCard({
  data,
}: {
  data: Array<{
    name: string
    grid?: string
    count: number
    color: string
    url?: string
    icon: React.ReactNode
  }>
}) {
  const navigate = useNavigate()
  return (
    <div
      className={`xs:grid-cols-${data.length} mx-4 my-6 grid grid-cols-1 gap-8 sm:mx-4 sm:my-8 sm:grid-cols-${data.length - 2} md:grid-cols-${data.length} lg:grid-cols-${data.length} xl:grid-cols-${data.length}`}
    >
      {data.map((card) => (
        <div
          key={card.name}
          className={`flex flex-col justify-center border-l-4 bg-card px-4 py-6 shadow-sm sm:py-8 ${card.color} transition-transform duration-200 hover:scale-[1.025]`}
        >
          <div className="flex items-center gap-4">
            <div
              onClick={() => navigate(`${card.url}`)}
              className="xs:h-12 xs:w-12 xs:text-2xl flex h-10 w-10 cursor-pointer items-center justify-center bg-primary/20 text-xl md:text-4xl"
            >
              {card.icon}
            </div>
            <div>
              <div className="xs:mt-1 xs:text-xs mt-0.5 text-[10px] font-medium text-muted-foreground uppercase md:text-sm">
                {card.name}
              </div>
              <div className="xs:text-2xl text-xl font-bold text-primary md:text-[28]">
                {card.count}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
