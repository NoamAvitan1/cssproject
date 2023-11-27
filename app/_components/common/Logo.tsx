'use client'

import Link from 'next/link';
import ImageSite from '../../_assets/logo2.jpeg'
import Image from 'next/image'
type Props = {

};

export const Logo: React.FC<Props> = (props) => {
  return (
    <Link href={'/'}><Image className='rounded-md cursor-pointer max-w-[2rem]' src={ImageSite} alt='site logo'/></Link>
  )
};
