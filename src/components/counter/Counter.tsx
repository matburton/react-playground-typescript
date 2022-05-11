
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

interface CounterState {
    value:       number;
    paused:      boolean;
    displayMode: DisplayMode;
}

// TODO: Is this timing really that accurate, how can setInterval be used?

export default function Counter(props: CounterProps) {

    const initialState: CounterState = {
        value:       props.startAt ? props.startAt * 100 : 0,
        paused:      false,
        displayMode: props.display ?? DisplayMode.Radial };

    const [state, setState] = useState(initialState);

    const timer = useRef<NodeJS.Timer | undefined>(undefined);

    useEffect(() => {

        if (!state.paused && timer.current === undefined) {

            timer.current = setInterval
                (() => setState(s => ({ ...s, value: s.value + 1 })), 100);
        }

        if (state.paused && timer.current !== undefined) {

            clearInterval(timer.current);

            timer.current = undefined;
        }
    },
    [state]);

    useEffect(() => () => {

        if (timer.current === undefined) return;

        clearInterval(timer.current);

        timer.current = undefined;
    },
    []);

    return <>

        { state.displayMode === DisplayMode.Radial &&
            <RadialProgress percentage={state.value % 100}>
                {Math.floor(state.value / 100)}
            </RadialProgress>
        }

        { state.displayMode === DisplayMode.Linear &&
            <>
                <p className="beta">{Math.floor(state.value / 100)}</p>
                <div className="progress--bar progress--bar--large"
                     style={{width: "20em"}}>
                    <span className="progress--bar__fill"
                          style={{width: `${state.value % 100}%`}}></span>
                </div>
            </>
        }

        <Button icon='arrow-circle'
                onClick={() => setState(s => ({ ...s, value: s.value + 100 }))} />

        <Button icon='pause' highlighted={state.paused}
                onClick={() => setState(s => ({ ...s, paused: !s.paused }))}
                extraClasses='spaced-left--tight' />

        <Button icon='show'
                highlighted={state.displayMode === DisplayMode.Linear}
                onClick={() => setState(s => ({ ...s, displayMode: (s.displayMode + 1) % 2 }))}
                extraClasses='spaced-left--tight' />

        <Button icon='reset'
                onClick={() => setState(s => ({ ...s, value: initialState.value }))}
                extraClasses='spaced-left--tight' />
    </>;
}