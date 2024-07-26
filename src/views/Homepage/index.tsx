import Button from "@/components/Button";
import Input from "@/components/Input";
import TitleGlowy from "@/components/TitleGlow";
import { postShort } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const getRandomArbitrary = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function App() {
    const [redirectTo, setRedirectTo] = useState<string>("");
    const [result, setResult] = useState<string | null>();

    const [error, setError] = useState<string | null>();

    // const getOcc = (letter: string, source: string, target: string) => {
    //     const countSource = source.split('').reduce((acc, current) => {
    //         if (current === letter) acc++;
    //         return acc;
    //     }, 0);

    //     const countTarget = target.split('').reduce((acc, current) => {
    //         if (current === letter) acc++;
    //         return acc;
    //     }, 0);

    //     return { countSource, countTarget };
    // }

    const { refetch, isFetching } = useQuery({
        queryFn: async () => {
            setResult("");

            let curatedStr = redirectTo;

            const pattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;


            if (!pattern.test(curatedStr)) {
                setError("The URL has to be an URL");
                return false;
            }

            setError(null);

            if (curatedStr.indexOf('http://') === -1 && curatedStr.indexOf('https://') === -1) {
                curatedStr = `http://${curatedStr}`;
            }


            const result = await postShort(curatedStr);

            if (!result) {
                return false;
            }

            let str = curatedStr;

            const speed = curatedStr.length > 500 ? 2 : 0;

            do {
                const index = getRandomArbitrary(0, str.length - 1);

                if (str.length > result.length) {
                    str = str.substring(0, index) + str.substring(index + 1,)
                } else if (str.length < result.length) {
                    str = str.substring(0, index) + (Math.random() + 1).toString(36).substring(1) + str.substring(index + 1,)

                }

                if (str.length === result.length) {
                    const promises = Array.from({ length: result.length }, (_, i) => i);
                    for await (const promise of promises) {
                        await new Promise(r => setTimeout(r, speed));
                        str = str.substring(0, promise) + result[promise] + str.substring(promise + 1,)
                        setResult(str);
                    }
                }

                setResult(str);
                await new Promise(r => setTimeout(r, speed));

            } while (result !== str);

            return str;
        },
        queryKey: ["short"],
        refetchOnWindowFocus: false,
        enabled: false
    });

    return (
        <main className="flex flex-col gap-10 w-full min-h-screen items-center justify-center">
            <div className="hover:cursor-pointer">
                <TitleGlowy />
                <div className="tracking-widest font-bold text-slate-800">just shorten urls</div>
            </div>
            <div className={`${isFetching && "animate-shake-text"} shadow-lg flex flex-col rounded-lg gap-14 px-12 py-16 w-2/3 lg:w-[682px] items-center justify-center bg-white`}>
                <div className="flex flex-col 
    items-center justify-start gap-10 w-full">
                    <div className="w-full flex flex-col gap-2">
                        <div className="ml-4 font-bold text-russian-violet">url to shorten</div>
                        <div className="flex flex-row gap-4 items-center  w-full">
                            <div className="grow w-full">
                                <Input onChange={(e) => {
                                    setRedirectTo(e.target.value);
                                    setResult("")
                                }} onEnter={() => refetch()} content={redirectTo} error={error} />
                            </div>
                            <Button
                                onClick={() => refetch()}
                                loading={isFetching}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="ml-4 font-bold text-russian-violet">shortened URL</div>
                        <Input readOnly content={result} loading={isFetching} />
                    </div>
                </div>
            </div>
        </main>
    );
}
