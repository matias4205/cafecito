import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import HeadCustom from "../../components/headCustom/index";
import Header from "../../components/header/index";
import InputText from "../../components/inputText/index";
import Coffee from "../../components/coffee/index";
import Post from "../../components/post/index";
import Modal from "../../components/modal/index";

import { useTheme } from "../../hooks/useTheme";

import { fetchCoffees, fetchCoffee } from "../../utils/api";
import queryConvert from "../../utils/queryConvert";
import { cafeConfig } from "../../config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import style from "./style.scss";

const API = { fetchCoffees, fetchCoffee };
const { SHOW_DATE_COFFEE, PROFILE_PHOTO, TWITTER } = cafeConfig;

const Home = props => {
    const { coffees: preFetchedCoffees, showThankYou, query } = props;

    const [coffees, setCoffees] = useState(preFetchedCoffees);
    const [theme, setTheme] = useTheme();
    const [state, setState] = useState(() => {
        let coffeeShare = "";

        if (query.coffee === "coffee" && query.id) {
            coffeeShare = coffees.coffees.find(coffee => {
                if (coffee._id == query.id) {
                    return coffee;
                }
            });
        }

        return {
            isAdmin: false,
            password: "",
            openModal: showThankYou,
            openModalShare: coffeeShare && coffeeShare._id ? true : false,
            share: coffeeShare || {},
        };
    });

    useEffect(() => {
        const arQueries = queryConvert();

        setState({
            ...state,
            isAdmin: arQueries.isAdmin,
            password: arQueries.password,
        });
    }, []);

    const loadNewCoffees = async () => {
        const coffees = await API.fetchCoffees();
        setCoffees(coffees);
    };

    const openModalCreateEvent = (status, type) => {
        setState({
            ...state,
            [type]: status,
        });
    };

    const shareTwitter = () => {
        const { share } = state;
        const linkToGo = `${process.env.URL}/coffee/${share._id}`;

        window.open(
            `https://twitter.com/intent/tweet?text=${linkToGo}`,
            "targetWindow",
            "toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250"
        );
        return false;
    };

    const copyLink = () => {
        const { share } = state;
        const linkToGo = `${process.env.URL}/coffee/${share._id}`;

        if (typeof navigator.clipboard == "undefined") {
            const textArea = document.createElement("textarea");
            textArea.value = linkToGo;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            document.execCommand("copy");

            document.body.removeChild(textArea);
            return;
        }

        navigator.clipboard.writeText(linkToGo);
    };

    const setShare = coffee => {
        setState({
            ...state,
            share: coffee,
            openModalShare: true,
        });
    };

    const { isAdmin, password, openModal, openModalShare, share } = state;

    return (
        <>
            <HeadCustom share={share} />

            <Header
                countCoffees={coffees.countCoffees}
                prefersDark={theme}
                setTheme={setTheme}
            />
            <InputText />

            <h3 className={style.titleDescription}>Descripción</h3>

            <Post />

            <h3 className={style.title}>Cafés</h3>
            {coffees.coffees.map((coffee, key) => (
                <Coffee
                    setShare={setShare}
                    isAdmin={isAdmin}
                    password={password}
                    key={key}
                    coffee={coffee}
                    loadNewCoffees={loadNewCoffees}
                />
            ))}

            {!coffees.countCoffees && (
                <div className={style.waitingCoffee}>
                    <span>En espera ☕️</span>
                </div>
            )}

            <Modal
                title="¡Gracias!"
                openModal={openModal}
                nameModal="openModal"
                openModalCreateEvent={openModalCreateEvent}
            >
                OMG! What!? Gracias por haberme ayudado! Lo valoro muchisimo!
                ❤️. Happy coding ✨.
                <img
                    width="100%"
                    src="https://media2.giphy.com/media/vFKqnCdLPNOKc/giphy.gif"
                    alt=""
                />
            </Modal>

            <Modal
                title="Compartir"
                openModal={openModalShare}
                nameModal="openModalShare"
                openModalCreateEvent={openModalCreateEvent}
            >
                <div className={style.q}>
                    <div className={style.name}>
                        {share.name ? share.name : "Anónimo"}
                        <span>
                            {` regaló ${share.countCoffees} ${
                                share.countCoffees > 1 ? "cafés" : "café"
                            }`}
                            {SHOW_DATE_COFFEE &&
                                ` el ${dayjs(share.createdAt).format(
                                    "DD-MM-YYYY"
                                )}`}
                        </span>
                    </div>
                    {share.message && (
                        <span className={style.text}>{share.message}</span>
                    )}
                </div>
                <div className={style.profile}>
                    <div className={style.profileImg}>
                        <img src={PROFILE_PHOTO} alt="profile"/>
                    </div>
                    <span>{`@${TWITTER}`}</span>
                </div>

                <div className={style.buttonShare}>
                    <button
                        className={style.buttonTwitter}
                        onClick={() => shareTwitter()}
                    >
                        <FontAwesomeIcon icon={faTwitter} width="14" /> Twitter
                    </button>
                    <button
                        className={style.buttonCopy}
                        onClick={() => copyLink()}
                    >
                        <FontAwesomeIcon icon={faCopy} width="14" /> Copiar Link
                    </button>
                </div>
            </Modal>
        </>
    );
};

Home.getInitialProps = async ({ query }) => {
    const externalReference = query.external_reference;

    const coffees = await fetchCoffees(query);

    if (externalReference) {
        const { coffeeId } = JSON.parse(externalReference);

        const result = fetchCoffee(coffeeId);

        return {
            coffees,
            showThankYou: result.data.showThankYou,
            query,
        };
    }

    return { coffees, showThankYou: false, query };
};

Home.propTypes = {
    coffees: PropTypes.object,
    showThankYou: PropTypes.bool,
    query: PropTypes.object,
};

export default Home;
