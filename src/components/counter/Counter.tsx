
import { useState, useEffect } from 'react';

import Button from 'components/button/Button';

import RadialProgress from 'components/progress/radial/RadialProgress';

export enum DisplayMode { Radial, Linear }

export enum State { Paused, Running }

interface CounterProps {
    startAt?: number;
    display?: DisplayMode;
    state?:   State;
}

// TODO: Is this timing really that accurate, how can setInterval be used?

export default function Counter(props: CounterProps) {

    const startAt: number = props.startAt ? props.startAt * 100 : 0;

    const [count, setCount] = useState(startAt);

    const [displayMode, setDisplayMode] =
        useState(props.display ?? DisplayMode.Radial);

    const [paused, setPaused] = useState(false);

    useEffect(() =>
    {
        if (paused) return;

        const id = setTimeout(() => setCount(c => c + 1), 100);
  
        return () => clearTimeout(id);
    },
    [count, paused]);

    return <>

        { displayMode === DisplayMode.Radial &&
            <RadialProgress percentage={count % 100}>
                {Math.floor(count / 100)}
            </RadialProgress>
        }

        { displayMode === DisplayMode.Linear &&
            <>
                <p className="beta">{Math.floor(count / 100)}</p>
                <div className="progress--bar progress--bar--large"
                     style={{width: "20em"}}>
                    <span className="progress--bar__fill"
                          style={{width: `${count % 100}%`}}></span>
                </div>
            </>
        }

        <Button icon='arrow-circle' onClick={() => setCount(c => c + 100)} />

        <Button icon='pause' highlighted={paused}
                onClick={() => setPaused(p => !p)}
                extraClasses='spaced-left--tight' />

        <Button icon='show'
                highlighted={displayMode === DisplayMode.Linear}
                onClick={() => setDisplayMode(m => (m + 1) % 2)}
                extraClasses='spaced-left--tight' />

        <Button icon='reset' onClick={() => setCount(startAt)}
                extraClasses='spaced-left--tight' />
    </>;
}