  import { Button } from "../ui/button"

export default function PageHeader({
  btnIcon,
  btnname,
  description,
  icon,
  title,
  onButtonClick,
}: {
  icon: React.ReactNode
  title: string
  description: string
  btnIcon?: React.ReactNode
  btnname?: string
  onButtonClick?: () => void
}) {
  return (
    <>
      {/* Mobile view */}
      <div className="m-4 flex flex-col gap-4 md:hidden">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <div className="flex items-center justify-center bg-[#00598A] px-2.5 py-2.5 text-white">
              {icon}
            </div>
            <h2 className="text-md ml-2">{title}</h2>
          </div>
          <span className="mt-1 max-w-xs text-sm text-gray-500">
            {description}
          </span>
        </div>
        {btnname && (
          <div className="flex w-full justify-end">
            <Button
              className="text-md flex w-full items-center justify-center px-1 py-3"
              onClick={onButtonClick}
            >
              {btnIcon}
              {btnname}
            </Button>
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="m-4 hidden flex-col gap-4 md:flex md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-center">
          <div className="flex items-center justify-center bg-[#00598A] px-2.5 py-2.5 text-white">
            {icon}
          </div>
          <div className="flex flex-col">
            <h2 className="md:text-xl">{title}</h2>
            <span className="max-w-xs text-sm text-gray-500 md:max-w-180">
              {description}
            </span>
          </div>
        </div>
        {btnname && (
          <div className="flex md:w-auto md:justify-end">
            <Button
              className="text-md flex w-full items-center justify-center px-1 py-3 md:w-auto md:px-3 md:py-5"
              onClick={onButtonClick}
            >
              {btnIcon}
              {btnname}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
