import { Brain } from "lucide-react";

import { explainSQL }
from "../services/api";

import { useStore }
from "../store/useStore";

export default function ExplanationPanel() {

    const {

        sql,

        explanation,

        setExplanation

    } = useStore();

    async function handleExplain() {

        if (!sql) return;

        try {

            const data =
                await explainSQL(sql);

            setExplanation(
                data.explanation
            );

        } catch (error) {

            console.log(error);
        }
    }

    return (

        <div
            className="
                cyber-panel
                rounded-2xl
                p-6
                mt-6
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-2
                    mb-5
                    text-red-400
                    tracking-widest
                "
            >

                <Brain size={18} />

                AI EXPLANATION

            </div>

            <button

                onClick={handleExplain}

                className="
                    bg-red-950
                    hover:bg-red-900
                    border
                    border-red-700
                    px-5
                    py-2
                    rounded-lg
                    mb-5
                "
            >
                EXPLAIN SQL
            </button>

            <div
                className="
                    text-gray-300
                    leading-relaxed
                    whitespace-pre-wrap
                "
            >
                {
                    explanation ||

                    "No explanation generated yet."
                }
            </div>

        </div>
    );
}
