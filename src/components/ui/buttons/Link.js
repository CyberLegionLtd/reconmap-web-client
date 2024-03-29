import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Link.css';

const LinkButton = ({ children, external = false, ...props }) => {
    const history = useHistory();

    const onAnchorClick = ev => {
        ev.stopPropagation();

        if (!external) {
            ev.preventDefault();

            history.push({
                pathname: ev.target.pathname,
                search: ev.target.search
            });
        }
    }

    return (
        <a onClick={onAnchorClick} target={external ? "_blank" : ""} className="link-button" {...props}>
            {children}
        </a>
    )
}

LinkButton.propTypes = {
    href: PropTypes.string.isRequired
};

export default LinkButton;
