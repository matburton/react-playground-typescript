
import { useState, useEffect, useRef } from 'react';

import Button from 'components/button/Button';

import RadialProgress from 'components/progress/radial/RadialProgress';

export enum DisplayMode { Radial, Linear }

export enum State { Paused, Running }

interface CounterProps {
    startAt?: number;
    display?: DisplayMode;
    state?:   State;
}

export default function Counter(props: CounterProps) {

    const startAtValue: number = props.startAt ? props.startAt * 100 : 0;

    const [value, setValue] = useState(startAtValue);

    const [displayMode, setDisplayMode] = useState(
        props.display ?? DisplayMode.Radial);

    const [paused, setPaused] = useState(false);

    const timer = useRef<NodeJS.Timer | undefined>(undefined);

    useEffect(() => {

        if (!paused && timer.current === undefined) {

            timer.current = setInterval(() => setValue(v => v + 1), 100);
        }
        else if (paused && timer.current !== undefined) {

            clearInterval(timer.current);

            timer.current = undefined;
        }
    },
    [paused]);

    useEffect(() => () => {

        if (timer.current === undefined) return;

        clearInterval(timer.current);

        timer.current = undefined;
    },
    []);

    return <>

        { displayMode === DisplayMode.Radial &&
            <RadialProgress percentage={value % 100}>
                {Math.floor(value / 100)}
            </RadialProgress>
        }

        { displayMode === DisplayMode.Linear &&
            <>
                <p className="beta">{Math.floor(value / 100)}</p>
                <div className="progress--bar progress--bar--large"
                     style={{width: "20em"}}>
                    <span className="progress--bar__fill"
                          style={{width: `${value % 100}%`}}></span>
                </div>
            </>
        }

        <Button icon='arrow-circle' onClick={() => setValue(v => v + 100)} />

        <Button icon='pause' highlighted={paused}
                onClick={() => setPaused(p => !p)}
                extraClasses='spaced-left--tight' />

        <Button icon='show'
                highlighted={displayMode === DisplayMode.Linear}
                onClick={() => setDisplayMode(m => (m + 1) % 2)}
                extraClasses='spaced-left--tight' />

        <Button icon='reset' onClick={() => setValue(startAtValue)}
                extraClasses='spaced-left--tight' />
    </>;
}