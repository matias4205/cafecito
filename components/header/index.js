import React from "react";
import PropTypes from "prop-types";

import style from "./style.scss";
import { Follow } from "react-twitter-widgets";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as moonSolid } from "@fortawesome/free-solid-svg-icons";
import { faMoon as moonRegular } from "@fortawesome/free-regular-svg-icons";

const Header = ({ countCoffees, prefersDark, ...props }) => {
    const { setTheme } = props;

    return (
        <header className={style.headerContainer}>
            <div className={style.header}>
                <div className={style.profileImg}></div>
                <div className={style.informationContainer}>
                    <div className={style.name}>@DamianCatanzaro</div>
                    <div className={style.countCoffees}>
                        {countCoffees} cafecitos ☕️
                    </div>
                </div>

                <FontAwesomeIcon
                    key={Math.random()}
                    icon={prefersDark === "dark" ? moonSolid : moonRegular}
                    className={style.darkMode}
                    onClick={() => {
                        setTheme(prefersDark === "dark" ? "light" : "dark");
                    }}
                    width="22"
                />
            </div>

            <div className={style.twitter}>
                <Follow username="DamianCatanzaro" />
            </div>
        </header>
    );
};

Header.propTypes = {
    countCoffees: PropTypes.number,
    prefersDark: PropTypes.string,
    setTheme: PropTypes.func,
};

export default Header;
