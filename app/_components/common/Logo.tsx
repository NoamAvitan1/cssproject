'use client'

import Link from 'next/link';
import ImageSite from '../../_assets/logo2.jpeg'
import Image from 'next/image'
type Props = {

};

export const Logo: React.FC<Props> = (props) => {
  return (
    <Link href={'/'}><Image className='rounded cursor-pointer' src={ImageSite} alt='site logo'/></Link>
  )
};
