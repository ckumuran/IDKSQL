import { useEffect, useState } from "react";

import { ChevronRight } from "lucide-react";

import { getSchema } from "../services/api";

export default function Sidebar() {

    const [schema, setSchema] = useState<any[]>([]);

    const [expandedTable, setExpandedTable] =
        useState<string | null>(null);

    useEffect(() => {

        async function loadSchema() {

            try {

                const data = await getSchema(
                    "mysql"
                );

                setSchema(data);

            } catch (error) {

                console.log(error);
            }
        }

        loadSchema();

    }, []);

    return (

        <div
            className="
                w-[320px]
                border-r
                border-red-950
                bg-black
                overflow-auto
                p-5
            "
        >

            <div
                className="
                    text-red-600
                    text-3xl
                    tracking-[0.3em]
                    mb-8
                "
            >
                IDKSQL
            </div>

            <div
                className="
                    text-gray-500
                    text-xs
                    tracking-widest
                    mb-5
                "
            >
                DATABASE EXPLORER
            </div>

            <div className="space-y-3">

                {schema.map((table) => (

                    <div
                        key={table.table}
                    >

                        <button
                            onClick={() => {

                                if (
                                    expandedTable ===
                                    table.table
                                ) {

                                    setExpandedTable(
                                        null
                                    );

                                } else {

                                    setExpandedTable(
                                        table.table
                                    );
                                }
                            }}

                            className="
                                flex
                                items-center
                                gap-2
                                text-red-400
                                hover:text-red-300
                            "
                        >

                            <ChevronRight
                                size={16}
                            />

                            {table.table}

                        </button>

                        {expandedTable ===
                            table.table && (

                            <div
                                className="
                                    ml-6
                                    mt-2
                                    space-y-1
                                "
                            >

                                {table.columns.map(
                                    (
                                        column: any,
                                        index: number
                                    ) => (

                                        <div
                                            key={index}

                                            className="
                                                text-sm
                                                text-gray-500
                                            "
                                        >

                                            {
                                                column
                                                    .column_name ||

                                                column
                                                    .Field ||

                                                column
                                                    .name
                                            }

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}
