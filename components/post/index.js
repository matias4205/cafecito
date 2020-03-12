import React from "react";
import PropTypes from 'prop-types';

import style from "./style.scss";


const LinkNewTab = ({ children, to }) => (
    <a
        href={to}
        target="_blank"
        rel="noreferrer noopener"
    >
        { children }
    </a>
)

LinkNewTab.propTypes = {
    children: PropTypes.string,
    to: PropTypes.string,
}

const Post = () => (
    <div className={style.postContainer}>
        <div className={style.post}>
            <p>
                Hola! Soy <strong>Matias Perez</strong>.
            </p>

            <p>
                📖 Terminé el secundario técnico en 2019 y planeo estudiar <strong>&quot;Ciencias
                de la computación&quot;</strong> en la <strong>UBA</strong>.
            </p>

            <p>
                Este año tengo como meta comenzar mi blog, en el cual planeo hacer tutoriales de todo lo que voy 
                aprendiendo en el mundo de sistemas (en este momento esta 
                en construccion 🔨).
            </p>

            <p>
                <strong>Blog:</strong> <LinkNewTab to="https://mtprz.dev/blog/">https://mtprz.dev/blog/</LinkNewTab>
            </p>

            <p>
                Me gusta pasar mi tiempo libre en <LinkNewTab to="https://platzi.com/">Platzi </LinkNewTab>
                o ayudando en algun que otro proyecto OpenSource, actualmente me encuentro dando
                una mano en <LinkNewTab to="https://github.com/dcatanzaro/cafecito">Cafecito</LinkNewTab> ☕,
                el resto del tiempo lo pierdo en Twitter... seguime 😉 
                <LinkNewTab to="https://twitter.com/matiasperz_">@matiasperz_</LinkNewTab>.
            </p>

            <p>
                Si tenes ganas de ver o clonarte algunos de los proyectos que tengo subidos te dejo mi Github que es donde suelto toda mi magia.
            </p>
            
            <p>
                <strong>Github:</strong> ✨<LinkNewTab to="https://github.com/matias4205">https://github.com/matias4205</LinkNewTab>✨.
            </p>
            
            <p>
                Queres darme una mano? Podés regalarme un café ☕️ y
                te lo super voy a agradecer! ❤️
            </p>
            <p>
               También podés dejar tu nombre o twitter y un mensaje asi se quien sos 😃.
            </p>
        </div>
    </div>
);

export default Post;
