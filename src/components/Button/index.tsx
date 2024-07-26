import { MouseEventHandler } from "react";
import { Loader2 } from "lucide-react"

export default function Button({
    loading = false,
    onClick
}: {
    loading?: boolean
    onClick: MouseEventHandler<HTMLDivElement>
}) {

    return (
        <div onClick={onClick}>
            <div className="p-4 rounded-full 
            bg-ultra-violet/75 text-light-background transition-all border-solid
            hover:bg-ultra-violet/100 hover:cursor-pointer outline-none ring-0 w-16 flex items-center justify-center">
                <div className="text-2xl text-white">
                    {loading ? <Loader2 className="animate-spin" /> : "⬇"}
                </div>
            </div>

        </div>
    );
}
