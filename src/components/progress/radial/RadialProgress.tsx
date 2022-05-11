
import { PropsWithChildren } from "react";

interface RadialProgressProps {
    percentage: number;
}

export default function RadialProgress(
    props: PropsWithChildren<RadialProgressProps>) {

    return <div className="progress--radial" data-progress={props.percentage}>

        <div className="progress--radial__mask progress--radial__mask--left">
            <div className="progress--radial__fill"></div>
        </div>

        <div className="progress--radial__mask">
            <div className="progress--radial__fill"></div>
            <div className="progress--radial__fill-fix"></div>
        </div>

        <div className="progress--radial__center">
            <span className="progress--radial__content">
                {props.children}
            </span>
        </div>
    </div>;
}