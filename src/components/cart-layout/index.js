import React from "react";
import PropTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";

import './style.css';

function CartLayout({ children }) {
    const cn = bem('CartLayout');

    return (
        <div className={cn()}>
            {children}
        </div>
    );
};

CartLayout.propTypes = {
    children: PropTypes.node
};

export default React.memo(CartLayout);