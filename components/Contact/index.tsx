import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ComponentType } from 'react';
import { IconBaseProps } from 'react-icons';
import rocketeer from './rocketeer.webp';

type LinkType = {
  Icon: ComponentType<IconBaseProps>;
  name: string;
  handle: string;
  href: string;
};

const Contact = () => {
  const links: LinkType[] = [
    {
      Icon: dynamic(async () => (await import('react-icons/fa')).FaGithub),
      name: 'github',
      handle: '@saifbechan',
      href: 'https://github.com/saifbechan',
    },
    {
      Icon: dynamic(async () => (await import('react-icons/fa')).FaLinkedin),
      name: 'linkedIn',
      handle: '/in/saifbechan',
      href: 'https://www.linkedin.com/in/saifbechan/',
    },
  ];

  return (
    <div className="flex bottom-5 gap-6 absolute right-5" role="contact">
      <div className="flex flex-col justify-between">
        {links.map(({ Icon, name, handle, href }: LinkType) => (
          <div key={name} className="flex items-center gap-1 justify-end">
            <a href={href} rel="noreferrer" target="_blank">
              {`${name}: ${handle}`}
            </a>
            <Icon className="cursor-pointer ml-0.5" />
          </div>
        ))}
      </div>
      <div role="logo">
        <Image
          alt="Rocketeer"
          height="50"
          priority
          src={rocketeer}
          width="50"
        />
      </div>
    </div>
  );
};

export default Contact;
