'use client'

type Props = {

};

export const Logo: React.FC<Props> = (props) => {

  return (
    <div 
    className="fixed square-image">
        <div className="absolute inset-0 bg-gradient-to-tr via-transparent from-transparent to-background"></div>
        <img src='https://res.cloudinary.com/db7vikkkf/image/upload/v1694617706/logo1_edp5uf.jpg'
        className=""/>
    </div>
  );
};
