import '../globals.css';
import './profile.css';
import ProfileStats from '../../components/profile/stats';
import ProfileHeader from '../../components/profile/header';
import {HomeButton} from '../../components/ui/tmpButton';

interface InitialData {
    avgWPM: number;
    highestWPM: number;
    timesPlayed: number;
    avgAccuracy: number;
}

export default async function Page() {
    const initialData: InitialData = {
        avgWPM: 0,
        highestWPM: 0,
        timesPlayed: 0,
        avgAccuracy: 0,
    };

    return (
        <main>
            <div className='backgroundPicture'>
            <div className='home-button'>
                    <HomeButton
                        disabled={false}
                        imgSrc="https://i.postimg.cc/BnbJtyFJ/SignLogo.png"
                        style={{}} //Must set size to be visible
                    >
                    </HomeButton>
                </div>
                <div className='characterContainer'>
                    <ProfileHeader />
                </div>
                <div className='profileInfoContainer'>
                    <div className='profileInfoHeader'>
                        <h1>Your Profile</h1>
                    </div>
                    <ProfileStats initialData={initialData} />
                </div>
            </div>
        </main>
    );
}
