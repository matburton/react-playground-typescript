
import { Key, Fragment, useState } from 'react';

import { v4 as uuid } from 'uuid';

import Counter, { DisplayMode } from 'components/counter/Counter'

import Button from 'components/button/Button';

// TODO: Save entire state of app to local storage or IndexDB?
//       - Would I need something like redux for that?

export default function App() {

    const [counters, setCounters] = useState([
        withRemove(<Counter display={DisplayMode.Linear} />),
        withRemove(<Counter startAt={13} />)
    ]);

    function withRemove(element: JSX.Element) {

        const key = uuid();

        return <Fragment key={key}>
            {element}
            <Button icon='delete' onClick={() => removeCounter(key)}
                    extraClasses='spaced-left--tight' />
        </Fragment>;
    }

    const removeCounter = (key: Key | null) =>
        setCounters(c => c.filter(e => e.key !== key));

    const addCounter = () => setCounters(c => [...c, withRemove(<Counter />)]);

    return <>

        {counters}

        <div className="spaced-top--tight">
            <Button icon='plus' onClick={addCounter} highlighted={true}>
                Add Counter
            </Button>
        </div>
    </>;
}