import { useRef, useState } from "react";

export default function TitleGlowy() {
    const intervalId = useRef<NodeJS.Timeout | null>();
    let repetitions = useRef<number>(2);

    const [rep, setRep] = useState<number>(repetitions.current);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const clearIntervalId = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
    }

    const handleIsHovered = async () => {
        clearIntervalId();
        setIsHovered(true);
        intervalId.current = setInterval(addRepetitions, 20);
    }

    const handleIsNotHovered = async () => {
        clearIntervalId();
        setIsHovered(false);
        intervalId.current = setInterval(removeRepetitions, 20);
    }


    const addRepetitions = async () => {
        if (repetitions.current < 8) {
            setRep(++repetitions.current)
        } else {
            clearIntervalId();
        }
    }

    const removeRepetitions = async () => {
        console.log("remove")
        if (repetitions.current > 2) {
            setRep(--repetitions.current)
        } else {
            clearIntervalId();
        }
    }


    return (
        <div
            className={`relative text-8xl ${isHovered && "animate-shake-text"}`}
            onMouseEnter={handleIsHovered}
            onMouseLeave={handleIsNotHovered}>
            <div className="text-ultra-violet transition-all font-bold">
                zw{"e".repeat(rep)}p
            </div>
        </div>
    );
}
