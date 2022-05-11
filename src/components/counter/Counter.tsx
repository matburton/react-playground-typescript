
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

    const toggleDisplayMode = () => setDisplayMode
        (m => m === DisplayMode.Linear ? DisplayMode.Radial : DisplayMode.Linear);

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

        <Button extraClasses='icon--arrow-circle'
                onClick={() => setCount(c => c + 100)} />

        <Button extraClasses='icon--pause spaced-left--tight'
                onClick={() => setPaused(p => !p)}
                highlighted={paused}/>

        <Button extraClasses='icon--show spaced-left--tight'
                onClick={toggleDisplayMode}
                highlighted={displayMode === DisplayMode.Linear} />

        <Button extraClasses='icon--reset spaced-left--tight'
                onClick={() => setCount(startAt)} />
    </>;
}