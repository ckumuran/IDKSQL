import { askDatabase } from "../services/api";

import { useStore } from "../store/useStore";

export default function QueryInput() {

    const {
        userQuery,
        setUserQuery,
        setSQL,
        setResults,
        setLoading
    } = useStore();

    async function handleSubmit() {

        if (!userQuery) return;

        try {

            setLoading(true);

            const data = await askDatabase(
                "mysql",
                userQuery
            );

            setSQL(data.sql);

            setResults(data.result || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    return (

        <div
            className="
                border
                border-red-900
                bg-[#050505]
                p-4
                rounded-xl
            "
        >

            <textarea
                value={userQuery}
                onChange={(e) =>
                    setUserQuery(
                        e.target.value
                    )
                }

                placeholder="
Ask your database anything...
                "

                className="
                    w-full
                    h-[120px]
                    bg-transparent
                    outline-none
                    resize-none
                    text-gray-200
                "
            />

            <button
                onClick={handleSubmit}

                className="
                    mt-4
                    bg-red-900
                    hover:bg-red-800
                    px-6
                    py-2
                    rounded-lg
                "
            >
                EXECUTE
            </button>

        </div>
    );
}
