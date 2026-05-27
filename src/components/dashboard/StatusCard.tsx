export function StatusCard({
  data,
}: {
  data: Array<{
    name: string
    count: number
    color: string
    icon: React.ReactNode
  }>
}) {
  return (
    <div className="xs:grid-cols-2 mx-2 my-6 grid grid-cols-1 gap-8 sm:mx-4 sm:my-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {data.map((card) => (
        <div
          key={card.name}
          className={`flex flex-col justify-center border-l-4 bg-card px-4 py-6 shadow-sm sm:py-8 ${card.color} transition-transform duration-200 hover:scale-[1.025]`}
        >
          <div className="flex items-center gap-4">
            <div className="xs:h-12 xs:w-12 xs:text-2xl flex h-10 w-10 items-center justify-center bg-primary/30 text-xl md:text-4xl">
              {card.icon}
            </div>
            <div>
              <div className="xs:mt-1 xs:text-xs mt-0.5 text-[10px] font-medium text-muted-foreground uppercase md:text-sm">
                {card.name}
              </div>
              <div className="xs:text-2xl text-xl font-bold text-primary-foreground md:text-[28]">
                {card.count}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
