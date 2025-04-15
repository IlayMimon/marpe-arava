import React, { useState } from 'react';

interface TravelItem {
    id: number;
    location: string;
    type: string;
    startTime: string;
    endTime: string;
    code: string;
    colorType: 'purple' | 'teal' | 'yellow';
}

interface TravelBarProps {
    title?: string;
    initialItems?: TravelItem[];
}

const TravelBar: React.FC<TravelBarProps> = ({
    initialItems = defaultTravelItems
}) => {
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [travelItems] = useState<TravelItem[]>(initialItems);

    // Separating logic into functions
    const filterItems = (color: string | null): void => {
        setActiveFilter(activeFilter === color ? null : color);
    };

    const getFilteredItems = (): TravelItem[] => {
        return activeFilter
            ? travelItems.filter(item => item.colorType === activeFilter)
            : travelItems;
    };

    const filteredItems = getFilteredItems();

    return (
        <div className="travel-bar" dir="rtl">
            <header className="travel-bar__header">
                <div className="travel-bar__header__back-button">
                    <span className="travel-bar__header__back-icon">&#10094;</span>
                    <span className="travel-bar__header__back-text">נסיעות</span>
                </div>
                <h1 className="travel-bar__header__title">הצג סידור יומי</h1>
            </header>

            <div className="travel-bar__filters">
                <div className="travel-bar__filters__driver">
                    <button
                        className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--purple ${activeFilter === 'purple' ? 'travel-bar__filters__driver__button--active' : ''}`}
                        onClick={() => filterItems('purple')}>
                        שמואל
                    </button>
                    <div>
                        251ק"מ
                    </div>
                </div>
                <div className="travel-bar__filters__driver">
                    <button
                        className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--teal ${activeFilter === 'teal' ? 'travel-bar__filters__driver__button--active' : ''}`}
                        onClick={() => filterItems('teal')}>
                        באסם
                    </button>
                    <div>
                        281ק"מ
                    </div>
                </div>
                <div className="travel-bar__filters__driver">
                    <button
                        className={`travel-bar__filters__driver__button travel-bar__filters__driver__button--yellow ${activeFilter === 'yellow' ? 'travel-bar__filters__driver__button--active' : ''}`}
                        onClick={() => filterItems('yellow')}>
                        אלכס
                    </button>
                    <div>
                        244ק"מ
                    </div>
                </div>
            </div>

            <div className="travel-bar__info">סה"כ: {filteredItems.length}</div>

            <ul className="travel-bar__list">
                {filteredItems.map((item, index) => (
                    <li className="travel-bar__list__item" key={`${item.id}-${index}`}>
                        <div className="travel-bar__list__item__details">
                            <h3 className="travel-bar__list__item__details__location">{item.location}</h3>
                            <p className="travel-bar__list__item__details__type">{item.type}</p>
                        </div>
                        <div className="travel-bar__list__item__time">
                            <span className="travel-bar__list__item__time__start">{item.startTime}</span>
                            <span className="travel-bar__list__item__time__arrow">→</span>
                            <span className="travel-bar__list__item__time__end">{item.endTime}</span>
                        </div>
                        <div className="travel-bar__list__item__code">{item.code}</div>
                        <div className={`travel-bar__list__item__indicator travel-bar__list__item__indicator--${item.colorType}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Default data for bus drives
const defaultTravelItems: TravelItem[] = [
    { id: 1121, location: 'תל אביב', type: 'קו 480', startTime: '07:30', endTime: '08:20', code: 'שמואל', colorType: 'purple' },
    { id: 1122, location: 'ירושלים', type: 'קו 405', startTime: '09:35', endTime: '10:25', code: 'שמואל', colorType: 'purple' },
    { id: 1125, location: 'חיפה', type: 'קו 910', startTime: '09:35', endTime: '10:50', code: 'באסם', colorType: 'teal' },
    { id: 1126, location: 'באר שבע', type: 'קו 370', startTime: '10:05', endTime: '10:55', code: 'באסם', colorType: 'teal' },
    { id: 1127, location: 'נתניה', type: 'קו 601', startTime: '12:00', endTime: '12:30', code: 'אלכס', colorType: 'yellow' },
    { id: 1129, location: 'אשדוד', type: 'קו 350', startTime: '13:15', endTime: '13:20', code: 'אלכס', colorType: 'yellow' },
    { id: 1153, location: 'אילת', type: 'קו 390', startTime: '16:00', endTime: '19:55', code: 'אלכס', colorType: 'yellow' },
];

export default TravelBar;