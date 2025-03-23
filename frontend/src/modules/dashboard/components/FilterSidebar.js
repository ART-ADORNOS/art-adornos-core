import React from 'react';
import {INDUSTRY_ICONS} from '../../../core/constants/industry/industryIcons';
import {INDUSTRY_COLORS} from '../../../core/constants/industry/industryColors';


const FilterSidebar = ({industry = [], activeFilters = [], toggleFilter}) => {

    return (
        <div className="flex items-center gap-4 roudend-lg bg-zinc-100 p-4 rounded-lg dark:bg-gray-900">
            {industry.map((ind) => {
                const Icon = INDUSTRY_ICONS[ind] || INDUSTRY_ICONS.GENERAL;
                const color = INDUSTRY_COLORS[ind] || INDUSTRY_COLORS.GENERAL;
                const isActive = activeFilters?.includes(ind) || false;
                return (
                    <button
                        key={ind}
                        onClick={() => toggleFilter(ind)}
                        className={`cursor-pointer h-12 rounded-md px-4 text-sm font-medium flex items-center gap-3 transition-all ${
                            isActive
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                        }`}>
                        <Icon className="text-blue-500" style={{color, fontSize: '1.5rem'}}/>
                        <span>{ind}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default FilterSidebar;
