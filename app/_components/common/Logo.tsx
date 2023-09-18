'use client'
import ImageSite from '../../_assets/logo2.jpeg'
import Image from 'next/image'
type Props = {

};

export const Logo: React.FC<Props> = (props) => {

  return (
    <Image className='rounded-2xl' src={ImageSite} alt='logo site'/>
  )
};
