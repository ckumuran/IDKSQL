import { Database } from "lucide-react";

import { useStore }
from "../store/useStore";

export default function ConnectionList() {

    const {

        connections,

        selectedConnection,

        setSelectedConnection

    } = useStore();

    return (

        <div
            className="
                cyber-panel
                rounded-2xl
                p-5
                mt-6
            "
        >

            <div
                className="
                    text-red-400
                    tracking-widest
                    mb-5
                "
            >
                SAVED CONNECTIONS
            </div>

            <div
                className="
                    space-y-3
                "
            >

                {connections.map(
                    (connection) => (

                    <button

                        key={connection.id}

                        onClick={() =>
                            setSelectedConnection(
                                connection
                            )
                        }

                        className={`
                            w-full
                            rounded-xl
                            p-4
                            border
                            transition-all
                            text-left

                            ${
                                selectedConnection?.id ===
                                connection.id

                                ? "border-red-500 bg-red-950/30"

                                : "border-red-950 hover:border-red-700"
                            }
                        `}
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <Database
                                size={18}
                            />

                            <div>

                                <div
                                    className="
                                        text-red-300
                                    "
                                >
                                    {connection.name}
                                </div>

                                <div
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    {connection.type}
                                </div>

                            </div>

                            <div
                                className="
                                    ml-auto
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-green-500
                                "
                            />

                        </div>

                    </button>
                ))}

            </div>

        </div>
    );
}
