
import { PropsWithChildren } from "react";

interface ButtonProps {
    onClick: () => void;
    icon?: string;
    extraClasses?: string;
    highlighted?: boolean;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {

    let classes = `button button--x-small ${props.extraClasses}`;

    if (props.highlighted === true) classes += " button--primary";

    if (props.icon) classes += ` icon--${props.icon}`;

    return (
        <button className={classes} onClick={props.onClick}>
            {props.children && props.icon && <>&nbsp;</>}
            {props.children}
        </button>
    );
}