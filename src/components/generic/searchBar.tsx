import { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames";
import { Tooltip } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

const GenericSearchBar = ({ inputValue, setInputValue }: { inputValue: string; setInputValue: Dispatch<SetStateAction<string>> }) => {

const [searchToggle, setSearchToggle] = useState(false)

return (
        <div className="search-bar-container">
            <div
            className={classNames({ "search-bar-container--close-button": true, "search-bar-container--close-button-disabled": !searchToggle })}
            onClick={() => { 
                if (searchToggle) {
                setInputValue('')
                setSearchToggle(false)
                }
            }}
            >✖</div>
            <Tooltip title={!searchToggle && 'חיפוש בטבלה' || ''}>
            <div
                className={classNames({ "search-bar-container__active-button": true, "search-bar-container__active-button--active": !searchToggle })}
                onClick={() => !searchToggle && setSearchToggle(true)}
            >
                <AiOutlineSearch className="search-bar-container__icon" />
                <input
                className={classNames({ "search-bar-container__active-button--search-bar": true, "search-bar-container__active-button--search-bar-disabled": !searchToggle })}
                onChange={e => searchToggle && setInputValue(e.target.value)}
                value={inputValue}
                />
            </div>
            </Tooltip>
        </div>
    );
}

export default GenericSearchBar;