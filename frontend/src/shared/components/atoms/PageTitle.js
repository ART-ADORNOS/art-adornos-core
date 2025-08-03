import React from "react";


export default function PageTitle({title}) {
    return (
        <div className="container mx-auto px-6 sm:px-12 py-12">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="text-center sm:text-left">
                    <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    )
}

