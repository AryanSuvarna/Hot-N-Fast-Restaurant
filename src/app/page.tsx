import Featured from '@/components/Featured'
import Promo from '@/components/Promo'
import Slider from '@/components/Slider'

// HOMEPAGE 
export default function Home() {
    return (
        <main className=' font-montserrat'>
            <Slider/>
            <Featured/>
            <Promo/>
        </main>
    )
}
