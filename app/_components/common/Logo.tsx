'use client'

import { useRouter } from 'next/navigation';
import ImageSite from '../../_assets/logo2.jpeg'
import Image from 'next/image'
type Props = {

};

export const Logo: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <Image onClick={()=>router.push('/') } className='rounded cursor-pointer' src={ImageSite} alt='site logo'/>
  )
};
