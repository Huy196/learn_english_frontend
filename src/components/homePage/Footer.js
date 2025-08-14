import anh1 from '../../assets/image/anh1.avif';
import anh2 from '../../assets/image/anh2.avif';
import anh3 from '../../assets/image/anh3.avif';
import anh4 from '../../assets/image/anh4.avif';

import '../../assets/css/Silder.css';

import ImageTextCard from './ImageTextCard'; 

export default function Footer() {
    const cardData = [
        {
            id: 1,
            imageUrl: anh1,
            text: 'Text cho ảnh thứ nhất.',
            backgroundColor: '#94edc6ff' 
        },
        {
            id: 2,
            imageUrl: anh2,
            text: 'Text cho ảnh thứ hai.',
            backgroundColor: '#8ceaf9ff' 
        },
        {
            id: 3,
            imageUrl: anh3,
            text: 'Text cho ảnh thứ ba.',
            backgroundColor: '#e99cf7ff' 
        },
         {
            id: 4,
            imageUrl: anh4,
            text: 'Text cho ảnh thứ ba.',
            backgroundColor: '#7e63f6ff'
        }
    ];

    return (
        <div className="footer-container">
            {cardData.map(card => (
                <ImageTextCard
                    key={card.id}
                    imageUrl={card.imageUrl}
                    text={card.text}
                    backgroundColor={card.backgroundColor}
                />
            ))}
        </div>
    );
}
