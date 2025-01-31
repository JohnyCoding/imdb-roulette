"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const Wheel = dynamic(
    () => import("react-custom-roulette").then((mod) => mod.Wheel),
    { ssr: false },
);

type Props = {
    onWheelStopSpinning: (index: number) => void;
};

export default function RouletteWheel({ onWheelStopSpinning }: Props) {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const data = [
        { option: "0", style: { backgroundColor: "green" } },
        { option: "32", style: { backgroundColor: "red" } },
        { option: "15", style: { backgroundColor: "black" } },
        { option: "19", style: { backgroundColor: "red" } },
        { option: "4", style: { backgroundColor: "black" } },
        { option: "21", style: { backgroundColor: "red" } },
        { option: "2", style: { backgroundColor: "black" } },
        { option: "25", style: { backgroundColor: "red" } },
        { option: "17", style: { backgroundColor: "black" } },
        { option: "34", style: { backgroundColor: "red" } },
        { option: "6", style: { backgroundColor: "black" } },
        { option: "27", style: { backgroundColor: "red" } },
        { option: "13", style: { backgroundColor: "black" } },
        { option: "36", style: { backgroundColor: "red" } },
        { option: "11", style: { backgroundColor: "black" } },
        { option: "30", style: { backgroundColor: "red" } },
        { option: "8", style: { backgroundColor: "black" } },
        { option: "23", style: { backgroundColor: "red" } },
        { option: "10", style: { backgroundColor: "black" } },
        { option: "5", style: { backgroundColor: "red" } },
        { option: "24", style: { backgroundColor: "black" } },
        { option: "16", style: { backgroundColor: "red" } },
        { option: "33", style: { backgroundColor: "black" } },
        { option: "1", style: { backgroundColor: "red" } },
        { option: "20", style: { backgroundColor: "black" } },
        { option: "14", style: { backgroundColor: "red" } },
        { option: "31", style: { backgroundColor: "black" } },
        { option: "9", style: { backgroundColor: "red" } },
        { option: "22", style: { backgroundColor: "black" } },
        { option: "18", style: { backgroundColor: "red" } },
        { option: "29", style: { backgroundColor: "black" } },
        { option: "7", style: { backgroundColor: "red" } },
        { option: "28", style: { backgroundColor: "black" } },
        { option: "12", style: { backgroundColor: "red" } },
        { option: "35", style: { backgroundColor: "black" } },
        { option: "3", style: { backgroundColor: "red" } },
        { option: "26", style: { backgroundColor: "black" } },
    ];

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center gap-y-12">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={() => {
                    // setMustSpin(false);
                    onWheelStopSpinning(+data[prizeNumber].option);
                }}
                perpendicularText
                textDistance={80}
                radiusLineColor={"gold"}
                innerBorderWidth={32}
                innerRadius={32}
                outerBorderWidth={16}
                textColors={["white"]}
            />
            <button
                onClick={handleSpinClick}
                className="rounded-lg bg-slate-700 px-10 py-2 text-slate-100 transition hover:scale-110 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-red-800"
                disabled={mustSpin}
            >
                {!mustSpin ? "SPIN" : "Please wait"}
            </button>
        </div>
    );
}
