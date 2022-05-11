
import { PropsWithChildren } from "react";

interface ButtonProps {
    extraClasses?: string;
    onClick: () => void;
    highlighted?: boolean;
}

export default function Button(props: PropsWithChildren<ButtonProps>) {

    let classes = `button button--x-small ${props.extraClasses}`;

    if (props.highlighted === true) classes += " button--primary";

    return (
        <button className={classes} onClick={props.onClick}>
            {props.children}
        </button>
    );
}