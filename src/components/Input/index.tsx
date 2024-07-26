import { ChangeEventHandler } from "react";

export default function Input({
    content,
    onChange,
    onEnter,
    readOnly = false,
    loading = false,
    error = null,
}: {
    content?: string | null,
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    onEnter?: (() => void) | undefined,
    readOnly?: boolean,
    loading?: boolean,
    error?: string | null,
}) {
    return (
        <div className="w-full relative">
            <input
                readOnly={readOnly}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onEnter) {
                        onEnter();
                    }
                }}
                type="text"
                className={`${readOnly && "font-bold text-blush/100 tracking-wider"} px-8 py-4 rounded-full w-full border-4 
                 ${error ? "border-blush" : "border-ultra-violet/25"} border-blus text-ultra-violet transition-all border-solid
                focus:border-ultra-violet/75 outline-none focus:outline-none focus:ring-0 ${loading && "animate-shake-text"}`}
                onChange={onChange}
                value={content || ""}
            />
            {
                (readOnly && !loading) && <div className="absolute top-4 right-6 text-xl transition-all duration-50 hover:cursor-pointer active:scale-150"
                    onClick={() => { navigator.clipboard.writeText(content || "") }}
                >🗒️</div>
            }
        </div>
    );
}
