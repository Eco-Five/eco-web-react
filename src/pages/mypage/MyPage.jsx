import 'react'
import Profile from './Profile';
import ActivityHistory from './ActivityHistory';

const MyPage = () => {
    const userId = window.memberId;

    return (
        <>
        <Profile userId={userId} />
        <ActivityHistory userId={userId} />
        </>
    )
}

export default MyPage