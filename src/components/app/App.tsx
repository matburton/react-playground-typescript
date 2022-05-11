
import { Key, Fragment, useState } from 'react';

import { v4 as uuid } from 'uuid';

import Counter, { DisplayMode } from 'components/counter/Counter'

import Button from 'components/button/Button';

// TODO: Save entire state of app to local storage or IndexDB?
//       - Would I need something like redux for that?

export default function App() {

    const [counters, setCounters] = useState([
        <Counter display={DisplayMode.Linear} key={uuid()} />,
        <Counter startAt={13} key={uuid()} />
    ]);

    function renderWithRemove(element: JSX.Element) {

        // Key hoisted to avoid warnings from React
        //
        return <Fragment key={element.key}>
            {element}
            <Button extraClasses='icon--delete spaced-left--tight'
                    onClick={() => removeCounter(element.key)} />
        </Fragment>;
    }

    const removeCounter = (key: Key | null) =>
        setCounters(c => c.filter(e => e.key !== key));

    const addCounter = () =>
        setCounters(c => [...c, <Counter key={uuid()} />]);

    return <>

        {counters.map(renderWithRemove)}

        <div className="spaced-top--tight">
            <Button extraClasses='button--primary icon--plus'
                    onClick={addCounter}>
                &nbsp;Add Counter
            </Button>
        </div>
    </>;
}