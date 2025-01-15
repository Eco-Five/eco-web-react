import 'react';
import { useEffect, useState } from 'react';

const Test = 0

const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',  
});

console.log(user);

Test = 1;

useEffect(() => {
    setUser({id: 3, name: 'dohoon'})
}, [Test])

Test = 2;

Test = 2;

console.log(user);