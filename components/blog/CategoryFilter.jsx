import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const CategoryFilter = ({ categories, selected, onSelect }) => {
    return (
        <div className="flex justify-center mb-12">
            <Tabs defaultValue={selected} className="w-auto" onValueChange={onSelect}>
                <TabsList className="h-12 rounded-full bg-muted/50 p-1 backdrop-blur-md">
                    <TabsTrigger
                        value="All"
                        className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                        All
                    </TabsTrigger>
                    {categories.map((cat) => (
                        <TabsTrigger
                            key={cat}
                            value={cat}
                            className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm"
                        >
                            {cat}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    )
}

export default CategoryFilter
