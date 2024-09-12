import React, { useState } from 'react';

const FilterComponent = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        onFilterChange({ category: e.target.value, date });
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        onFilterChange({ category, date: e.target.value });
    };

    return (
        <div className="filter-component">
            <select onChange={handleCategoryChange} value={category}>
                <option value="">Toutes les catégories</option>
                <option value="Gestion immobilière">Gestion immobilière</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Informatique">Informatique</option>
                {/* Ajoutez d'autres options de catégories ici */}
            </select>

            <input 
                type="date" 
                onChange={handleDateChange} 
                value={date}
            />
        </div>
    );
};

export default FilterComponent;
