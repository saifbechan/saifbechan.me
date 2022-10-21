import { Box, Flex, HStack, Icon, VStack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';
import Image from 'next/image';
import rocketeer from './rocketeer.webp';

type LinkType = {
  icon: IconType;
  name: string;
  handle: string;
  href: string;
};

const Contact = () => {
  const links: LinkType[] = [
    {
      icon: FaGithub,
      name: 'github',
      handle: '@saifbechan',
      href: 'https://github.com/saifbechan',
    },
    {
      icon: FaLinkedin,
      name: 'linkedIn',
      handle: '/in/saifbechan',
      href: 'https://www.linkedin.com/in/saifbechan/',
    },
  ];

  return (
    <Flex bottom="20px" gap={6} pos="absolute" right="20px" role="contact">
      <VStack alignItems="flex-end">
        {links.map(({ icon, name, handle, href }: LinkType) => (
          <HStack key={name} justifyContent="flex-end">
            <a href={href} rel="noreferrer" target="_blank">
              {`${name}: ${handle}`}
            </a>
            <Icon as={icon} cursor="pointer" ml={2} />
          </HStack>
        ))}
      </VStack>
      <Box role="logo">
        <Image
          alt="Rocketeer"
          height="50"
          priority
          src={rocketeer}
          width="50"
        />
      </Box>
    </Flex>
  );
};

export default Contact;
